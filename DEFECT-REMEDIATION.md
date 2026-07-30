# Defect remediation plan

Working plan for resolving the defects in
`../api-standards-conformance/STANDARDS-DEFECTS.md`.

This file is the **handoff state** between sessions. Each agent reads it, does one
batch, updates the status table, and stops. Do not carry work across batches.

**Baseline verified 2026-07-29 at `3f19cea`:** 198 clauses (92 MUST, 65 SHOULD, 19 MAY,
14 SHOULD NOT, 8 MUST NOT). Matches the reviewed snapshot exactly — every defect in the
report is live against the current tree.

---

## Why ID stability is deferred, not first

The report ranks defect 11 (stable, wording-independent clause IDs) as its highest-value
change, on the grounds that a rename breaks downstream consumers *silently*. Checked
against this repo, that premise does not hold yet:

- `versions.json` is `[]` and `build/assets/api-standards.json` does not exist. Nothing
  is published outside `/draft/`.
- The only consumer is `../api-standards-conformance` (31 tags). Its
  `scripts/check-standards.js` fetches the live catalog and **fails the build** when a
  tag is no longer present. The failure is loud, and it is already in place.

The report acknowledges this and discounts it as "a downstream workaround… every consumer
has to build their own." That is correct for a catalog with many independent consumers.
There is currently one, under the same ownership.

**Independent reason to defer:** phases 4 and 5 rename or split roughly 60 clauses.
Building rename infrastructure first means maintaining a map across all that churn and
still not knowing the final ID set until the end. Fix the wording first, let the IDs
settle, then decide ID policy once.

So defect 11 becomes **Phase 6, a pre-publication gate** — do it before the catalog
leaves `/draft/` or acquires a second consumer, not before the first edit.

---

## Phases

Each phase is one agent unless marked otherwise. Sizes are files-to-edit, not clauses.

| # | Phase | Defects | Files | Agents | Needs a decision from you |
|---|---|---|---|---|---|
| 1 | Factual corrections | 4, 8, 9, 10 | 4 | 1 | No |
| 2 | Redundancy & duplication | 5, 6a, 6b, 6c | ~5 | 1 | No |
| 3 | Anaphora & bound party | 3, 7 | 6 | 1 | No |
| 4 | Unquantified MUSTs | 2 | 11 | 2 | Yes — sharpen vs demote |
| 5 | One obligation per ID | 1 | 20 | 4 | Yes — split vs sub-clause |
| 6 | ID stability (pre-publication gate) | 11 | 2 scripts | 1 | Yes — ID scheme |
| 7 | Verify & re-baseline | — | — | 1 | No |

Phases 1–5 are free to rename IDs. `check-standards.js` in the conformance repo will go
red; that is the guard working, and re-baselining its 31 tags is a Phase 7 task.

---

### Phase 1 — factual corrections

Low risk, high external visibility. These are what an external vendor notices first.

- `docs/api-development/synchronous-apis/05-http-verbs.md` — defects 4 + 10, same
  sentence. Extend the verb list to GET, HEAD, POST, PUT, PATCH, DELETE; replace the
  "W3C Standard" attribution with RFC 9110 §9.
- `docs/api-development/synchronous-apis/08-content.md` — defect 8. RFC 7159 → STD 90
  (RFC 8259). Cite STD 90, which survives future revisions. **This renames the ID** —
  first real exercise of the phase 0 map.
- `docs/api-security/13-security-controls.md` — defect 9. Split content encryption
  (NZISM algorithms, e.g. AES-256-GCM) from message authentication / token signing
  (HMAC, JWS). Cite the specific NZISM section.

---

### Phase 2 — redundancy & duplication

- Defect 5, `docs/api-security/13-security-controls.md`: delete
  `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS`, or restate at MUST as a configuration
  obligation. TLS 1.3+ being mandatory already prohibits everything else.
- Defect 6a/6b, AsyncAPI publishing docs: fold the v2 guidance into the clause that
  already states it, or split into version-scoped clauses with no overlap.
- Defect 6c, MCP token audience across `api-security/14-mcp-api-security.md` and
  `api-development/mcp-apis/08-mcp-security.md`: apply the canonical-location-plus-link
  treatment already used for the four deduplicated MCP clauses.
- **Added by Phase 1 (same defect class, found while fixing defect 8).**
  `docs/api-development/synchronous-apis/08-content.md`:
  `MSDAS_MUST_CONFORM_JSON_TO_STD_90` now mandates STD 90, which requires JSON text
  exchanged between systems to be UTF-8. The adjacent `MSDAS_SHOULD_ENCODE_TEXT_AS_UTF_8`
  therefore restates part of a MUST at SHOULD strength. Either narrow the SHOULD to
  non-JSON textual content, or delete it as covered by the MUST. (RFC 7159 permitted
  UTF-8/16/32, so this tension is new as of the STD 90 citation.)

Then add the generator lint: **same subject at two strengths**. Both instances of this
pattern so far were fixed as one-off edits, which is why new ones keep appearing.

Note: the UTF-8 pair above is the cleanest test case to build that lint against. Unlike
the TLS and AsyncAPI pairs, the MUST and the SHOULD sit in the **same paragraph of the
same file**, so a first cut of the lint can work at paragraph scope and still catch it.
It is also the only one of the four that Phase 1 *introduced* — evidence that a
by-hand pass over the catalog does not stop the pattern recurring, and the reason the
lint is worth building here rather than deferring again.

---

### Phase 3 — anaphora & bound party

**Anaphora (defect 3).** Four clauses, each in a different file. Make each clause text
self-contained:

- `MSDAS_MUST_PROVIDE_AUTHORISATION_INTENT` — "this" has no antecedent
- `MSDAS_MUST_OBTAIN_CONSENT_TO_SHARE_ATTRIBUTES` — "this information" undefined
- `MSDAS_MUST_INDICATE_MAJOR_VERSION_IN_RESPONSE` — "still" implies an absent condition
- `MSDAS_MUST_NOT_RETURN_BODY_FOR_HEAD_REQUEST` — switches actor mid-clause

Remember the clause text is the `toolTip` attribute, not the rendered prose. The
surrounding page can keep its narrative flow; only the toolTip must stand alone.

Then add the generator lint: reject a `toolTip` opening with a dangling demonstrative
("this", "these", "such", "it"), or containing "still"/"also"/"instead" without a
resolvable referent.

**Bound party (defect 7).** Add a `boundParty` prop to `<Standard>`
(`provider` | `consumer` | `both`, defaulting to `provider`), emitted into the JSON by
`extractStandards.js`. Small, self-contained generator change — it belongs here with its
first users rather than in a separate infrastructure phase.

- `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` → `consumer`. The conformance repo
  currently tags this and overclaims; marking it lets any tool filter it out.
- `MSDAS_MUST_DESIGN_PUT_TOLERANT_APIS` — "be aware of the race condition" is not an
  observable property. Reword to the observable obligation, or demote to NOTE.

Worth sweeping for other consumer-binding clauses while in here.

---

### Phase 4 — unquantified MUSTs (19 clauses, 11 files)

**Decide the policy once, then apply it.** For each clause: name the concrete
requirement, or demote to non-normative prose so it stops occupying a clause ID. The
report judges demotion likely correct for several — they read as framing sentences the
catalog promoted into rules.

Split by area:

| Agent | Files | Clauses |
|---|---|---|
| 4a | `api-security/03` (4), `api-security/13`, `api-security/05`, `api-security/14` (2) | 8 |
| 4b | `api-publishing/05` (2), `api-publishing/03`, `sync/12` (2), `mcp-apis/03` (2), `mcp-apis/04`, `async/08`, `async/05` | 11 |

Sharpest cases: `MSDAS_MUST_APPLY_APPROPRIATE_AUTHORISATION` and
`MSDAS_MUST_AUTHENTICATE_API_ACCESS` say nothing testable at all.

Note: `MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA` and `MSDAS_MUST_TREAT_MCP_CONTENT_AS_UNTRUSTED`
are also Phase 5 clauses. Handle them in Phase 5 and skip them here.

---

### Phase 5 — one obligation per ID (35 clauses, 20 files)

The largest phase, and the one that most changes the clause count. **Decide the mechanism
once:** full split into separate `<Standard>` blocks (cleaner, more disruptive) vs
sub-clause IDs (`MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA.1`) where sentences must stay
joined for readability. The generator needs to support whichever you pick — note
`ID_REGEX` in `validateStandardTags.js` and `idFormatRegex` in `extractStandards.js`
both reject `.` today.

Split by area:

| Agent | Files | Clauses |
|---|---|---|
| 5a | `api-security/` 03, 07, 08, 09, 11, 14 | 14 |
| 5b | `api-publishing/` 02, 03 | 6 |
| 5c | `synchronous-apis/` 01, 05, 06, 09, 10, 11 | 8 |
| 5d | `mcp-apis/` 03, 06, 07, 08 + `asynchronous-apis/` 03, 05 | 7 |

Worst offender: `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS` packs eight independent
security requirements into one ID.

Then add the generator lint: reject a `toolTip` containing an RFC 2119 keyword other
than its own `type`. This makes the fix permanent rather than a one-time cleanup.

---

### Phase 6 — ID stability (pre-publication gate)

Do this once phases 1–5 have settled the wording, and before the catalog leaves `/draft/`
or acquires a second consumer. Not before — see "Why ID stability is deferred" above.

Touches `scripts/extractStandards.js` and `src/components/Standard.jsx`.

**Decision needed:** full stable IDs (`"id": "MSDAS-0142"` with the current text-derived
ID demoted to `"slug"`), or the cheaper interim of keeping text-derived IDs primary and
publishing `supersedes` plus a flat `{old_id: new_id}` rename map at
`build/draft/assets/api-standards-renames.json`.

Either way, seed the map from `id-fixes.md` (the 198-row rename already applied in
`3f19cea`) plus the rename log below.

---

### Phase 7 — verify & re-baseline

1. `yarn validate:standards && yarn build`
2. Re-run every count in STANDARDS-DEFECTS.md Appendix A. Mixed-strength must be 0,
   vague MUSTs 0, no duplicate content.
3. Re-baseline `../api-standards-conformance`: 31 tags, 7 of which touch Phase 5 clauses,
   plus `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` (Phase 3) and the two tags Phase 1
   has already broken — `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` (retag to
   `…_TO_STD_90`) and `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` (its scenario tests
   signature algorithms, so retag to
   `MSDAS_MUST_AUTHENTICATE_MESSAGES_WITH_APPROVED_ALGORITHMS`, not to the encryption
   clause). Run its `standards:check` and fix what it reports — that is the guard doing
   its job, not a regression.
4. Decide what the conformance suite does with the six `boundParty` clauses listed under
   "Bound-party assignments" below. Two are tagged today and both overclaim:
   `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` and — newly visible after Phase 3 —
   `MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT`, whose scenario tests the provider
   returning 406 rather than the consumer sending `Accept`. Neither is a rename, so
   `standards:check` stays green on them; they need reading, not diffing. Phase 3 also
   renamed `MSDAS_MUST_DESIGN_PUT_TOLERANT_APIS` and removed
   `MSDAS_SHOULD_NOT_USE_PASSWORD_MODEL_IN_PRODUCTION`, neither of which is tagged.

---

## Per-agent protocol

Each agent, in order:

1. Read this file and the relevant section of `../api-standards-conformance/STANDARDS-DEFECTS.md`.
2. Edit only the files listed for its batch.
3. Run `yarn validate:standards`, then `yarn build` if the generator changed.
4. Append every ID added, removed or renamed to the rename log below. This is the input
   to Phase 6 and to the Phase 7 re-baseline — it is the reason renames stay cheap
   despite being deferred.
5. Update the status table below — batch, date, IDs changed, anything deferred.
6. Stop. Do not start the next batch.

Keeping each agent to one batch is what keeps context small enough that it can read the
actual clause prose rather than working from summaries.

---

## Status

| Phase | Status | Date | Notes |
|---|---|---|---|
| 1 — factual | **done** | 2026-07-29 | Defects 4, 8, 9, 10 fixed. 3 files, 3 clauses touched, +1 net clause (**199**: MUST 93, SHOULD 65, MAY 19, SHOULD NOT 14, MUST NOT 8). Mixed-strength still 35, vague MUSTs 19 — unchanged, no new instances. Build + `validateStandardTags.js` clean. Decisions (a)–(d) reviewed and **confirmed with the owner, 2026-07-29** — do not re-open in a later phase. (a) verb list includes **OPTIONS** — the report left it optional, but the page documents OPTIONS use, so excluding it from a closed MUST list would re-create defect 4; (b) JSON clause cites **STD 90** (not RFC 8259), so the ID is `…_TO_STD_90` and survives the next JSON revision; (c) NZISM citation is **section 17.2, Approved Cryptographic Algorithms**, verified against NZISM v3.9 (Nov 2025) — 17.2.11/17.2.13 give AES-256 for encryption, 17.2.26 SHA-2 for hashing. HMAC is *not* in 17.2, so the message-authentication clause cites 17.2 for the algorithm/hash, not for HMAC itself; (d) encryption clause type changed `REQUIRED` → `MUST` (same canonical group). **Raised for Phase 2:** new SHOULD/MUST overlap on UTF-8 — see Phase 2 bullet. |
| 2 — redundancy | **done** | 2026-07-29 | Defects 5, 6a, 6b, 6c fixed, plus the UTF-8 overlap Phase 1 raised. 4 doc files + `validateStandardTags.js`. Clause count unchanged at **199** (MUST 94, SHOULD 64, MAY 19, SHOULD NOT 14, MUST NOT 8) — the +1/−1 is defect 5 moving from SHOULD to MUST. **Mixed-strength 35 → 34**: trimming the token-audience sentence out of `MSDAS_MUST_FOLLOW_CURRENT_MCP_AUTHORISATION_FLOW` for 6c also resolved one defect-1 instance, so 5d inherits one clause less. Vague MUSTs unchanged at 19 (denominator now 102). No duplicate IDs or duplicate content. Build + validator clean, no broken anchors. Decisions: (a) defect 5 **restated at MUST**, not deleted — the conformance suite's `transport-security.feature` already asserts lower versions are *rejected outright*, so it was testing MUST-strength behaviour against a SHOULD clause; disabling obsolete versions at the listener is separately observable from "all traffic uses 1.3+". (b) 6a/6b fixed as **version-scoped clauses with no overlap** (trim the v2 sentence out of the v3 toolTip) rather than folding — a v2 and a v3 document are checked by different rules, so two clauses is the honest count. IDs left alone: `address`/`messages` fields exist only in v3+, so the IDs are already unambiguous, and gratuitous renames cost Phase 7. (c) 6c fixed by the canonical-location-plus-link treatment, extending the existing bullet list in `mcp-apis/08`. (d) UTF-8 SHOULD **narrowed** to non-JSON text, not deleted — STD 90 only binds JSON, so deleting would have dropped a real obligation on CSV/XML/plain-text payloads. **Lint limitation — read before Phase 7:** the new mixed-strength lint catches defect 5 against the pre-Phase-2 tree (verified), but it does **not** catch the original UTF-8 pair. The plan called that pair "the cleanest test case"; it is in fact undetectable lexically — "Textual content should be UTF-8 encoded" and the STD 90 MUST share no terms, and the link between them is semantic (STD 90 *implies* UTF-8). The lint only sees it *after* the narrowing edit introduced the shared word "JSON". So the lint stops lexically-similar recurrences, not implication-based ones; do not treat a clean run as proof that defect 5's class is eliminated. |
| 3 — anaphora & bound party | **done** | 2026-07-30 | Defects 3 and 7 fixed. 9 doc files + `Standard.jsx`, `extractStandards.js`, `validateStandardTags.js`, `StandardsChecklist.jsx`, `CONTRIBUTING.md`. Clause count unchanged at **199** (MUST 95, SHOULD 64, MAY 19, SHOULD NOT 13, MUST NOT 8) — the HEAD split adds a MUST, the duplicate below removes a SHOULD NOT. **Mixed-strength 34 → 33** (the HEAD split resolved one defect-1 instance, so 5c inherits one clause less). Vague MUSTs unchanged at 19 (denominator now 103). No duplicate IDs or duplicate content. Build clean, no broken anchors, validator clean. **The lint found 8 more instances of defect 3 than the report's 4** — the report says "4 identified", not exhaustive, and all 8 were fixed here rather than deferred, since a lint that ships with known violations is not a gate. They are: `MSDAS_SHOULD_OFFER_ONBOARDING_ON_AUTHENTICATED_WEB` ("This SHOULD be made available" — no antecedent at all), `MSDAS_MAY_USE_PASSWORD_AUTHENTICATION_FOR_LEGACY`, `MSDAS_MAY_USE_PASSWORD_AUTHENTICATION_FOR_TESTING`, `MSDAS_SHOULD_NOT_USE_PASSWORD_MODEL_IN_PRODUCTION`, `MSDAS_MAY_USE_CERTIFICATE_AUTH_FOR_LEGACY` (all "this model"/"this pattern"), `MSDAS_MAY_USE_BACKEND_FOR_FRONTEND_PATTERN` ("this guidance" → the IETF's browser-app draft), `MSDAS_SHOULD_NOT_PROCESS_BULK_ASYNC_SYNCHRONOUSLY` ("this type of interaction"), and `MSDAS_MUST_PUBLISH_THROTTLING_QUOTAS` (reviewed, acknowledged — the referent is inside the clause). Decisions: (a) `MSDAS_MUST_NOT_RETURN_BODY_FOR_HEAD_REQUEST` **split** rather than trimmed — the consumer sentence is a real RFC 9110 obligation, and `boundParty` landing in this phase gave it somewhere honest to live; (b) `MSDAS_MUST_DESIGN_PUT_TOLERANT_APIS` **reworded to the observable obligation**, not demoted — "be aware of the race condition" moved to page prose pointing at `MSDAS_MUST_IMPLEMENT_CONCURRENCY_CONTROL`, which already carries that requirement at MUST, so nothing normative was lost. "PUT tolerant" was undefined in the source; the interpretation applied is in the rename log and is the one thing in this phase worth a second opinion from the owner; (c) resolving "This model" made `MSDAS_SHOULD_NOT_USE_PASSWORD_MODEL_IN_PRODUCTION` **byte-identical** to `MSDAS_SHOULD_NOT_USE_PASSWORD_AUTHENTICATION_IN_PRODUCTION` — a defect-6-class duplicate the anaphora had been hiding. Deleted the second and moved its "Note the related MAY guidance" pointer onto the canonical clause; (d) `boundParty` swept beyond the report's 2 clauses — 5 consumer, 1 both (see below). **Read before Phase 7:** `MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT` is now `consumer`, and the conformance repo tags it in `widgets-api.feature` on a scenario asserting the *provider* returns 406 for an unsatisfiable `Accept` — the same overclaim defect 7 documents for the TLS clause, now visible in the JSON. The provider-side obligation it actually tests (honour `Accept`, else 406) has no clause in the catalog; adding one is new normative content, so it is raised for the owner rather than done here. **Lint limitation:** the actor-switch half of defect 3 (the HEAD clause) is not lexically detectable and is not covered. Phase 5's "no foreign RFC 2119 keyword in a toolTip" lint catches that shape; until it lands, actor switches are caught only by review. `it`, `instead`, `too` and `otherwise` were each measured against the catalog and deliberately excluded — see the comment in `validateStandardTags.js` for the hit counts. |
| 4a — vague MUSTs (security) | **done** | 2026-07-30 | Defect 2, security half: 9 clauses in 5 files (the plan said 8 in 4 — it missed `MSDAS_MUST_DOCUMENT_CONSUMER_ONBOARDING_PROCESS` in `api-security/07`). 3 demoted, 6 qualifiers struck. See the shared Phase 4 notes below. |
| 4b — vague MUSTs (rest) | **done** | 2026-07-30 | Defect 2, remainder: 10 clauses in 7 files (plan said 11; the split across 4a/4b was 8/11, actually 9/10). All 10 fixed by striking the qualifier — no demotions, no renames. See the shared Phase 4 notes below. |
| 5a — split (api-security) | not started | | |
| 5b — split (api-publishing) | not started | | |
| 5c — split (synchronous) | not started | | |
| 5d — split (mcp + async) | not started | | |
| 6 — ID stability | not started | | |
| 7 — verify & re-baseline | not started | | |

## Phase 4 notes (4a and 4b)

Both batches were run together, because the policy decision below applies across them and the
lint cannot ship until every clause in both is clean.

**Policy, confirmed with the owner 2026-07-30 — do not re-open in a later phase.**

1. The three clauses that are *nothing but* a qualifier were **demoted to non-normative prose**,
   not sharpened: `MSDAS_MUST_AUTHENTICATE_API_ACCESS`, `MSDAS_MUST_APPLY_APPROPRIATE_AUTHORISATION`,
   `MSDAS_MUST_INCLUDE_SCOPES_IN_ACCESS_TOKENS`. All three sat on `api-security/03`, directly above
   the concrete clauses that carry the real obligation (API keys for system-to-system, Developer
   Authentication, RBAC, OAuth scopes, ABAC), so the first two became `INFO` boxes pointing at them
   and the third was deleted outright. Nothing testable was lost: the least-privilege sentence next
   to the scopes clause was already page prose, not a clause.
2. Everywhere else the **qualifier was struck and the rest of the clause kept verbatim** — no new
   normative content, no renames. "declare an appropriate content type" → "declare their content
   type"; "a clear deprecation reason" → "a deprecation reason". The one place this changed meaning
   rather than trimming it is noted below.
3. A **blocking lint** was added (`findVagueQualifiers` in `validateStandardTags.js`), on the
   report's exact vocabulary, restricted to MUST and MUST NOT.

**Counts.** 199 → **196** (MUST 92, SHOULD 64, MAY 19, SHOULD NOT 13, MUST NOT 8) — the three
demotions, nothing else. **Vague MUSTs 19 → 0** of 100. Mixed-strength unchanged at 33 (Phase 5's
work; no instances added or resolved here). No duplicate IDs or duplicate content. Build, both
validators and the accessibility check clean, no broken anchors.

**Judgement calls worth a second opinion:**

- `MSDAS_MUST_ENCRYPT_ASYNCHRONOUS_MESSAGES` had four qualifiers, one of them load-bearing:
  "authorisation MUST be used to restrict access to topics **as appropriate**". Striking it makes
  the obligation unconditional. That is the reading taken — an "as appropriate" escape hatch on a
  MUST is exactly the unfalsifiable pattern this phase exists to remove, and the page already opens
  by saying Part B applies in full to asynchronous APIs. It is the only clause in Phase 4 whose
  scope genuinely widened.
- `MSDAS_MUST_DEFINE_OPENAPI_SECURITY_SCHEMES` — the vague half ("MUST define appropriate security
  mechanisms") was a restatement of the concrete half beside it, so it was deleted rather than
  reworded. The conformance suite tags this clause and its scenario tests the surviving sentence
  (`components.securitySchemes` plus per-operation references), so the tag still holds. ID kept.
- `MSDAS_MUST_DESCRIBE_EACH_TOOL_CLEARLY` — "clear, complete" → "complete". **"complete" is as much
  a judgement call as "clear" was**, but it is outside the report's vocabulary and therefore outside
  the lint; recorded here as a known survivor rather than silently passed. The ID keeps its
  `…_CLEARLY` suffix even though the word is gone: it is conformance-tagged, and a rename would
  cost a Phase 7 retag for no gain.

**Two Phase-5 clauses were touched, against the plan's skip note.** `MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA`
("SHOULD use clear verb-noun naming" → "verb-noun naming") and `MSDAS_MUST_TREAT_MCP_CONTENT_AS_UNTRUSTED`
("must not rely on the agent to correctly enforce" → "to enforce"). A blocking lint cannot ship with
two known violations, and the alternative — a warning-only lint — was declined. Only the qualifier
was removed in each; the splits Phase 5 owns are untouched.

**Lint limitation — read before Phase 7.** It is a word list, not a semantic check. Verified both
ways: run against the pre-Phase-4 tree it reproduces exactly the report's 19 clauses, and against
the current tree it reports 0. `ACKNOWLEDGED_QUALIFIERS` is empty by design — unlike the Phase 2 and
3 lints, no clause here needed an exception, so a future entry should be treated as a claim to
argue rather than a formality.

**Defect 11 moved the wrong way:** the report's text-derived-ID count went 28 → 29, because
`MSDAS_MUST_MATCH_OUTPUT_ENCODING_TO_CONTEXT` now has every ID token in its text ("must **match**
the **context** the **output** is rendered into"). That is a consequence of naming the requirement
concretely, and it is Phase 6's problem, not a reason to word the clause worse.

**Build gotcha found and recorded.** A markdown link to *another page* inside a `<Standard>` box
fails the static build with `Invariant failed` — the component renders its children to plain text
for the tooltip, and a cross-page link is router-backed. Same-page anchors are fine. This is why
the first `INFO` box names "Using OAuth 2.0 and OIDC" in words instead of linking to it. Added to
`CONTRIBUTING.md`; every pre-existing cross-page link in the docs happens to sit in prose, which is
why it had never surfaced.

---

## Rename log

Every ID added, removed or renamed by phases 1–5. Feeds Phase 6 and Phase 7.
Use `—` in New ID for a removal (a demoted clause), and in Old ID for an addition
(a clause split out of another).

| Old ID | New ID | Phase | Reason |
|---|---|---|---|
| `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` | `MSDAS_MUST_CONFORM_JSON_TO_STD_90` | 1 | Defect 8. RFC 7159 obsoleted by RFC 8259; cite the stable STD number so the next revision doesn't rename the clause again. |
| `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` | `MSDAS_MUST_ENCRYPT_CONTENT_WITH_APPROVED_ALGORITHMS` | 1 | Defect 9, encryption half. Renamed rather than kept: the clause no longer covers HMAC, and the conformance tag on the old ID tests *signature* algorithms. A rename makes `standards:check` fail loudly instead of silently re-pointing that tag at an encryption-only clause. |
| — | `MSDAS_MUST_AUTHENTICATE_MESSAGES_WITH_APPROVED_ALGORITHMS` | 1 | Defect 9, message-authentication half. New clause for HMAC / digital signatures. The existing conformance scenario for the old ID belongs here. |
| `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` | `MSDAS_MUST_DISABLE_OBSOLETE_TLS_VERSIONS` | 2 | Defect 5. Restated at MUST as a listener-configuration obligation, so the ID prefix has to change with the type. Not a conformance tag, but named in comments in the conformance repo's `mock/server.js` and `features/Mock Target/transport-security.feature` — update those in Phase 7. |
| `MSDAS_SHOULD_ENCODE_TEXT_AS_UTF_8` | `MSDAS_SHOULD_ENCODE_NON_JSON_TEXT_AS_UTF_8` | 2 | Phase 1 addendum. Narrowed to non-JSON text now that the adjacent MUST cites STD 90, which already binds JSON to UTF-8. Renamed because the scope genuinely shrank — a tool tagging the old ID was claiming coverage of JSON encoding it no longer gets from this clause. Not currently tagged in the conformance repo. |
| `MSDAS_MUST_DESIGN_PUT_TOLERANT_APIS` | `MSDAS_MUST_ACCEPT_FULL_REPRESENTATION_ON_PUT` | 3 | Defect 7, second clause. "Be aware of the race condition" is not observable, and "PUT tolerant" was never defined in the source. Read as its standard industry meaning — accept the whole representation a GET returned, including properties the consumer cannot change — which is testable (PUT back a GET payload verbatim, expect 2xx) and, unlike the idempotency reading, is not already stated in the prose above the clause. Renamed because "design PUT tolerant APIs" named a posture, not the requirement. Not tagged in the conformance repo. |
| — | `MSDAS_MUST_IGNORE_BODY_IN_HEAD_RESPONSE` | 3 | Defect 3, consumer half of `MSDAS_MUST_NOT_RETURN_BODY_FOR_HEAD_REQUEST`. New clause, `boundParty="consumer"`. The MUST NOT keeps its ID and now binds only the provider. |
| `MSDAS_SHOULD_NOT_USE_PASSWORD_MODEL_IN_PRODUCTION` | — | 3 | Removed as a duplicate. Once "This model" was resolved to "Username and password (direct) authentication", its text was identical to `MSDAS_SHOULD_NOT_USE_PASSWORD_AUTHENTICATION_IN_PRODUCTION`. Its cross-reference sentence moved to that clause. Not tagged in the conformance repo; the only in-repo link to the anchor was repointed. |
| `MSDAS_MUST_AUTHENTICATE_API_ACCESS` | — | 4 | Defect 2. "Appropriate authentication must be achieved when accessing APIs" is unfalsifiable; demoted to an `INFO` box pointing at the mechanism clauses on the same page. Not tagged in the conformance repo. |
| `MSDAS_MUST_APPLY_APPROPRIATE_AUTHORISATION` | — | 4 | Defect 2. "Appropriate authorisation must be applied" — same treatment, pointing at the RBAC, scopes and ABAC clauses below it. Not tagged in the conformance repo. |
| `MSDAS_MUST_INCLUDE_SCOPES_IN_ACCESS_TOKENS` | — | 4 | Defect 2. Deleted rather than replaced with a pointer: the `MAY` on OAuth scopes sits in the same section and the least-privilege obligation was already page prose. Not tagged in the conformance repo. |

## Bound-party assignments (Phase 3)

Every clause not listed here is `provider`, the default. Phase 7 needs this list: a conformance run
against a provider endpoint cannot verify any of them, so a tag on one is an overclaim.

| Clause | Party | Why |
|---|---|---|
| `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` | consumer | Defect 7. Chain and CRL validation happens in software the provider does not control. Currently tagged in `transport-security.feature`. |
| `MSDAS_MUST_PROVIDE_AUTHORISATION_INTENT` | consumer | The consumer sends the intent to the authorisation server. |
| `MSDAS_MUST_IGNORE_BODY_IN_HEAD_RESPONSE` | consumer | New in Phase 3; only the receiver can ignore a body. |
| `MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT` | consumer | Both halves bind the party sending the request. Currently tagged — see the Phase 3 status note. |
| `MSDAS_SHOULD_PROTECT_EMBEDDED_API_KEYS` | consumer | The key is embedded in the consumer's application; the page prose already says the consumer's developers are responsible for it. |
| `MSDAS_SHOULD_REQUIRE_CONFIRMATION_FOR_WRITE_TOOLS` | both | The MCP Server declares which tools need confirmation, but the confirmation prompt is the Host's to show. Neither party can satisfy it alone. |

Judged `provider` despite naming the consumer: `MSDAS_MUST_IDENTIFY_CONSUMER_IN_TOKEN` (the
authorisation server mints the token), `MSDAS_MUST_LIMIT_GRANT_TYPES` (the consumer half is
descriptive, not normative), and the ~30 publishing clauses of the form "API Providers MUST publish
X for API Consumers", where the consumer is the beneficiary and not the bound party.
