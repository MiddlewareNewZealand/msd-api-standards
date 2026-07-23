# RFC 2119 Tagging Gaps — Action List

Audited 2026-07-23: `docs/**/*.md` for normative MUST/SHOULD/MAY language that exists as
plain lowercase/sentence-case text instead of the `<Standard>` component, and is therefore
invisible to the Checklist (`scripts/extractStandards.js` only scrapes `data-standard-type`
attributes emitted by `<Standard>` — it never parses raw markdown text).

## Mechanism (read before editing)

- Component: `src/components/Standard.jsx`. Block form = two-column box; `inline` prop keeps
  the keyword in the sentence (used mid-paragraph or inside table cells).
- Required props: `id="MSDAS_<CANONICAL>_<SLUG>"` (unique repo-wide — build fails on
  duplicate or malformed ids, checked by `idFormatRegex` in extractStandards.js) and
  `type="<DISPLAYED WORD>"` (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY, REQUIRED, RECOMMENDED,
  OPTIONAL — synonyms canonicalise to MUST/SHOULD/MAY family for id prefix + Checklist
  grouping, e.g. `type="RECOMMENDED"` → id must start `MSDAS_SHOULD_`).
- Inline form needs `toolTip="<full standalone rule sentence>"` since children are just the
  keyword.
- Before adding an id, run `grep -r "MSDAS_" docs/ | grep -o 'MSDAS_[A-Z_]*'` to confirm it
  doesn't already exist.

## Fix pattern

- **Table cell** (e.g. `| Must not be used by MSD APIs. |`): capitalise the keyword and wrap
  it with `<Standard inline>`, leave the rest of the cell text as-is, e.g.:
  `<Standard inline id="MSDAS_MUST_NOT_..." type="MUST NOT" toolTip="<full cell sentence>">MUST NOT</Standard> be used by MSD APIs.`
  Markdown tables accept inline JSX in cells — this pattern is unproven in this codebase yet
  (no existing table cell currently uses it), so render and visually check one row before
  doing the rest of a table.
- **Standalone prose sentence**: wrap the whole sentence in block `<Standard id=... type=...>`
  on its own line, matching the existing pattern used throughout `03-api-authentication-and-authorisation-basics.md`
  and `07-using-oauth2-and-oidc.md`.
- Every quote below is given verbatim so it can be matched with grep/search even if line
  numbers have drifted since this audit — re-locate by quote, don't trust the line number
  blindly.

## Triage heuristic used

A finding only qualifies as a genuine gap if it's a standalone, testable rule (pass/fail
checkable), not prose that explains rationale/consequence of a rule stated elsewhere, or
vague scene-setting/aspirational text. Items below are already filtered through this test.
Items filtered OUT are not relisted here — do not re-derive them, this list is final.

---

## 1. Table rows (highest confidence — same structural pattern across whole codebase)

### `docs/api-security/03-api-authentication-and-authorisation-basics.md:25-30` — "Authentication mechanisms" table, "Recommended usage" column
- L25 Anonymous: "Not recommended, except for genuinely low-risk, publicly available information."
- L26 Username/password: "Not recommended for production; may be used for testing and development only."
- L27 API Key: "Recommended for all APIs, particularly system-to-system integration."
- L29 OAuth 2.0: "Recommended for public and internal APIs."
- L30 OAuth 2.0 + OIDC: "Recommended wherever an OpenID Connect Provider is available, and required for any API exposing personal or sensitive client information."
(L28 mTLS row is descriptive only, not a rule — skip.)

### `docs/api-security/04-building-secure-apis.md:12,13,17` — OWASP principles table
- L12 Establish secure defaults: "the experience should be secure; it should be up to the user to reduce their security, if they're allowed to at all."
- L13 Principle of least privilege: "Accounts should have the minimum privileges required to perform their business processes."
- L17 Separation of duties: "Administrators should not be users of the application, and vice versa."

### `docs/api-security/04-building-secure-apis.md:28-37` — "General technical security requirements" table (whole file has zero `<Standard>` tags — biggest single gap in the doc set)
- L28 TLS: "All communication between API Consumers and API Providers must be over TLS, to address eavesdropping and man-in-the-middle attacks."
- L29 Validate input: "All content of all incoming messages must be validated by the API implementation and/or its supporting infrastructure."
- L30 Forbidden grant types: "APIs must not allow use of the OAuth 2.0 Implicit or Resource Owner Password Credential grant types."
- L31 Validate redirects: "OAuth 2.0-protected API servers must check that the redirect_uri of received authorisation requests is identical to the redirection URI registered for the client..."
- L32 Validate OIDC ID tokens: "Consumers of OIDC-secured APIs must validate ID tokens obtained from an authorisation server."
- L33 Validate access tokens: "Consumers of OAuth-protected APIs must validate the issuer, signature, claims and scopes of an access token before use."
- L34 Short-lived tokens: "APIs requiring OAuth 2.0 tokens must issue each token with a short lifetime (in the order of 30 minutes)... Where longer access is required, the API must require the use of refresh tokens." (two separate MUST clauses — consider two ids)
- L35 Minimal scopes: "OAuth 2.0 API Consumers should request only the scopes needed for a particular solution domain and context of use."
- L36 Encrypted token storage: "Where an OAuth-protected API Consumer needs to store a token, this must only be done in encrypted local storage."
- L37 PKCE: "OAuth 2.0 API Consumers must use PKCE to prevent cross-site request forgery and authorisation-code injection attacks, where the API Client is a Public Client..."

### `docs/api-security/07-using-oauth2-and-oidc.md` — five tables, all rows genuine
- L11-15 "Token types" table, Requirement column (Authorisation Code, Access Token, Refresh Token, ID Token, API Key rows) — each cell has 2-3 distinct MUST/SHOULD clauses; consider splitting per clause.
- L21-23 "Token formats" table, Recommendation column (Opaque, JWT, JWE rows).
- L33-41 Endpoints table, "Key requirements" column (/authorize, /token, Redirect endpoint, /revoke, /introspect, /userinfo, /jwks, /par, /bc-authorize rows). `/register` and `/.well-known/...` rows have no requirement text — skip.
- L89-98 "Grant / response type" table, Recommendation column — all 9 rows (Authorisation Code OAuth2, Authorisation Code OIDC+PKCE, Hybrid x3, Implicit x3, Resource Owner Password Credential, Client Credentials).

### `docs/api-security/08-alternative-oauth2-grant-flows.md:15-16` — "JWT creation" table, Recommendation column
- L15 API Consumer-created JWT: "May be used for server-to-server flows, for UNCLASSIFIED APIs."
- L16 Identity-Provider-created JWT: "May be used for UNCLASSIFIED APIs where consent isn't required."

### `docs/api-security/09-client-authentication-and-token-protection.md:19-20,28-29`
- L19-20 "Shared Client Secret method" table (client_secret_basic, client_secret_post rows): "May be used for UNCLASSIFIED APIs; should not be used for IN-CONFIDENCE APIs or with Public Clients. Confidential clients must securely store these credentials."
- L28-29 "JWT-based authentication methods" table (client_secret_jwt, private_key_jwt rows).

### `docs/api-security/10-level-of-assurance.md:19` — acr claim table row
- "may be applied to UNCLASSIFIED information, must not be applied to IN-CONFIDENCE information... must be applied to IN-CONFIDENCE information." (multiple clauses — consider splitting)

### `docs/api-development/synchronous-apis/16-industry-standards.md:17`
- "the Government Enterprise Architecture Governance group has determined SOAP should not be used for new work, though it may remain in use for existing APIs."

### `docs/api-development/synchronous-apis/05-http-verbs.md:16`
- PATCH row: "Not recommended, due to complexity."

### `docs/api-publishing/03-openapi-specifications.md:13`
- Property descriptions row: "Should be verbose enough for a reader to understand the property's purpose." (Note: the "MUST" in the same row is already capitalised but also unwrapped — same file, same row, worth fixing together.)

---

## 2. Standalone prose sentences (genuine, not table-based)

- `docs/api-security/01-introduction-to-api-security.md:37` — "Access to APIs that handle non-public information should not be provided to all comers"
- `docs/api-security/03-api-authentication-and-authorisation-basics.md:88` — "All communications must therefore be over TLS to protect the key in transit"
- `docs/api-security/03-...:134` — "The developer must ensure the minimum privileges are granted to API Consumers needed to complete the requests the user wants carried out."
- `docs/api-security/03-...:168` — "Developer authentication should take place at an API Portal" and "once logged in, a developer should be able to browse and discover the APIs available." (two clauses, same line region)
- `docs/api-security/03-...:170` — "The Portal should provide registration services for the client application to use, including: API Keys for basic authentication and monitoring; OAuth 2.0 client registration..."
- `docs/api-security/04-building-secure-apis.md:7` — "API designers and developers must consider the OWASP Security By Design Principles, and document how these are implemented by their API."
- `docs/api-security/06-mapping-standards-to-security-framework.md:27` — "OpenID Connect is the recommended security profile for OAuth 2.0 when an API requires stronger authentication"
- `docs/api-security/07-using-oauth2-and-oidc.md:63` — ID Token claims, compound sentence: "It may be used to enforce finer-grained access controls via additional claims; must be signed by an approved algorithm; should include claims that hash the code, state and access token...; may carry additional non-identity metadata...; must have its issuer, audience, nonce and expiry validated by the API Consumer; and may be encrypted." (six clauses — split into separate ids)
- `docs/api-security/07-...:85` — "they must be used to secure IN-CONFIDENCE APIs" (Confidential clients) and "may only be used for UNCLASSIFIED APIs" (Public clients)
- `docs/api-security/07-...:116` — "For public clients (native or mobile applications), MSD should not use the refresh token flow, since the refresh token would otherwise have to be managed in the browser."
- `docs/api-security/07-...:120` — "The Client Credentials flow should be used for server-to-server integration..." and "It's recommended for the Authorised Consuming Application pattern (device to API) and for server-to-server (B2B) integration using signed tokens without user interaction."
- `docs/api-security/09-client-authentication-and-token-protection.md:15` — "Both parties must store the shared secret."
- `docs/api-development/synchronous-apis/06-uris.md:33` — "Header-based versioning is recommended (see Versioning APIs)"
- `docs/api-development/synchronous-apis/06-uris.md:49` — "It's recommended that namespaces be used to avoid ambiguity."
- `docs/api-development/synchronous-apis/01-api-design.md:109` — "there should be only one API operation for one business outcome (e.g. change an address)" (only this clause of the sentence — the earlier clause about "supporting a process" is scene-setting, skip it)
- `docs/api-development/synchronous-apis/01-api-design.md:125` — "using APIs as an orchestration tool isn't recommended, due to the architectural complexity this can introduce" and "the mashup should be performed by the consuming application instead."
- `docs/api-development/synchronous-apis/01-api-design.md:133` — "[an SDK]... should include sample code demonstrating the API's functionality."
- `docs/api-development/synchronous-apis/11-versioning-apis.md:43` — "pessimistic concurrency should be reserved for cases where data consistency is paramount and conflicts are frequent."
- `docs/api-development/synchronous-apis/15-api-governance.md:19` — "development using a branch strategy with at least one peer review required before merge and deployment."
- `docs/api-development/mcp-apis/01-core-concepts.md:21` — "should design tool and resource naming so it can accommodate new primitive types without rework."
- `docs/api-publishing/02-publishing-components.md:34` — "UML sequence diagrams are recommended."
- `docs/api-publishing/02-publishing-components.md:45` — "an API supporting field-level encryption of sensitive client data should clearly document both the mechanism and the effect of that encryption."

---

## 3. Borderline — decide case-by-case before wrapping, don't bulk-apply

- `docs/api-security/01-introduction-to-api-security.md:9` — "must be understood and followed jointly by API Providers and API Consumers" / "The API security framework must be defined at the organisation and business level" — testable in spirit but organisation-level, not API-level; may be out of scope for this Checklist.
- `docs/api-security/01-...:33` — "Security design must take into account the full context..." — vague, hard to pass/fail.
- `docs/api-security/06-mapping-standards-to-security-framework.md:7` — "The two standards MSD should use... are OAuth 2.0 and OpenID Connect." — possibly duplicates the already-tagged OAuth-2.0-versions table (same file, lines 21-23).
- `docs/api-security/13-security-controls.md:26` — "so should be used only where needed" (rationale precedes rule, same substance as other findings, otherwise fine).
- `docs/api-security/15-related-standards.md:13` — "required for APIs exposing client identity information" — sits inside a "related standards" reference table describing an external RFC, not an MSD rule per se.
- `docs/api-development/synchronous-apis/10-bulk-apis.md:32` — inside `<Standard id="MSDAS_SHOULD_SUB_REQUEST_IDENTIFIER_TEMPORARY_CLIENT" type="SHOULD">`, second sentence smuggles a distinct MUST-level rule for the batch case: "In a batch call, by contrast, cross-references must use identifiers already known ahead of time, since sub-requests aren't guaranteed to succeed or process together." This one is *inside* a `<Standard>` block already (so it IS captured by extractStandards.js) but mis-scoped: the block's `type="SHOULD"` and its id name (`..._TEMPORARY_CLIENT`) only describe the transaction-case rule, not this batch-case MUST. Needs its own id/block, split out of the existing one.
- `docs/api-development/synchronous-apis/10-bulk-apis.md:37` — "the consumer must fix and resubmit the entire request" — describes consequence of rollback vs. a new design rule.
- `docs/api-development/asynchronous-apis/03-message-types.md:52` — "a consumer must account for the possibility it isn't using the very latest data due to processing delay" — consumer-facing guidance, arguably rationale-adjacent.
- `docs/api-development/mcp-apis/02-message-format-transport-state.md:9` — "MSD API Developers should treat both as implementation details to confirm against the current specification" — mild, reads as guidance more than a hard rule.

---

## Out of scope for this pass

Casual/non-normative "must/should/may" usage (e.g. "this may include...", "it's the door through which consumers access API resources, and should be intuitive"), scene-setting sentences that introduce a table/list rather than stating a rule themselves, and reference-table descriptions of external standards were reviewed and intentionally excluded — do not re-flag them without new reasoning.

`docs/api-concepts/` has no genuine gaps (only 2 lowercase hits total, both casual English).
