# Defect remediation plan

Working plan for resolving the defects in
`../api-standards-conformance/STANDARDS-DEFECTS.md`.

This file is the **handoff state** between sessions. Each agent reads it, does one
batch, updates the status table, and stops. Do not carry work across batches.

**Baseline verified 2026-07-29 at `3f19cea`:** 198 clauses (92 MUST, 65 SHOULD, 19 MAY,
14 SHOULD NOT, 8 MUST NOT). Matches the reviewed snapshot exactly — every defect in the
report is live against the current tree.

**All phases complete, 2026-07-30.** Closing baseline: **240 clauses** (112 MUST, 74 SHOULD,
24 MAY, 16 SHOULD NOT, 14 MUST NOT). Mixed-strength clauses 35 → **0**, vague MUSTs 19 → **0**,
no duplicate IDs or content. Defect 11 is the one open item, deferred as a pre-publication gate —
see Phase 6. The conformance suite is re-baselined at **33 tags**. Four blocking lints now hold
defect classes 1, 2, 3 and 5 shut in the generator, and a fifth check in the conformance repo
blocks tagging a consumer-bound clause.

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

**Outcome, 2026-07-30:** neither condition has arrived, so Phase 6 was closed with no work
and the gate carried forward. See the Phase 6 section for the verification and the
re-open triggers.

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
| 6 | ID stability | 11 | — | — | **Closed, no work — see below** |
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

### Phase 6 — ID stability — **closed with no work, 2026-07-30**

**Decision, with the owner, 2026-07-30.** Neither option is built. Defect 11 is closed as
*not applicable yet*, and the rename log below is the whole deliverable.

The phase was scoped as generator work — permanent numeric IDs with the text-derived ID
demoted to `slug`, or a published `api-standards-renames.json`. Both exist to serve
downstream consumers that would otherwise be broken silently by a rename. **There are no
such consumers.** Nothing is published outside `/draft/`, `versions.json` is still `[]`,
the specs and tooling have never been released, and the single reader of the catalog is
`../api-standards-conformance`, under the same ownership and re-baselined by hand in
Phase 7. Building either mechanism now would be infrastructure with no reader.

**Verified before closing, 2026-07-30.** Of the 31 tags in the conformance suite, exactly
**3** stopped resolving across phases 1–5, and all 3 already carry an explicit retag
target in the rename log:

| Stale tag | Retag to | Recorded in |
|---|---|---|
| `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` | `MSDAS_MUST_CONFORM_JSON_TO_STD_90` | Phase 1 |
| `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` | `MSDAS_MUST_AUTHENTICATE_MESSAGES_WITH_APPROVED_ALGORITHMS` | Phase 1 |
| `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` | `MSDAS_MUST_DISABLE_OBSOLETE_TLS_VERSIONS` | Phase 2 |

The 45 clauses Phase 5 added and the 4 clauses phases 3–5 removed touched nothing tagged.
So a plain retag from the log clears `standards:check` — no rename infrastructure is on the
critical path. Reproduce with: `grep -rhoE '@MSDAS_[A-Z0-9_]+' features/ | sed 's/@//' |
sort -u`, compared against `grep -rhoE 'id="MSDAS_[A-Z0-9_]+"' docs/` (240 IDs, matching
the Phase 5 count).

**Correction to the Phase 2 rename log entry:** it records
`MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` as "not a conformance tag, but named in
comments". It *is* a live tag, at `features/Mock Target/transport-security.feature:19`,
as well as appearing in comments there and in `mock/server.js`. Corrected in the log below.

**When to re-open.** This is a pre-publication gate, not a dead item. Re-open defect 11
*before* either of these happens, not after:

1. the catalog leaves `/draft/` — i.e. `versions.json` stops being `[]`, or
   `build/assets/api-standards.json` starts being produced and served; or
2. a second consumer appears, in particular one outside this ownership.

At that point the recommendation is the **full stable-ID** option, not the interim rename
map, for a reason phases 4 and 5 both surfaced independently: text-derived IDs got *worse*
as the clauses got sharper (28 → 29 → 33 of the MUST/MUST NOT set), because splitting a
clause down to one sentence makes its ID a near-transcription of that sentence. The
interim map does not address that; it only makes each rename followable after the fact.

Seed material, should it be re-opened: `id-fixes.md` (the 198-row rename applied in
`3f19cea`) plus the rename log below.

---

### Phase 7 — verify & re-baseline — **done, 2026-07-30**

Executed as written; results in the status row and the Phase 7 notes at the end of this file.

1. `yarn validate:standards && yarn build`
2. Re-run every count in STANDARDS-DEFECTS.md Appendix A. Mixed-strength must be 0,
   vague MUSTs 0, no duplicate content.
3. Re-baseline `../api-standards-conformance`: 31 tags, 7 of which touch Phase 5 clauses,
   plus `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` (Phase 3) and the **three** tags that
   phases 1–2 have already broken (count confirmed by the Phase 6 verification, which is
   the authoritative list — it is the complete set, not a sample):
   `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` (retag to `…_TO_STD_90`);
   `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` (its scenario tests signature
   algorithms, so retag to `MSDAS_MUST_AUTHENTICATE_MESSAGES_WITH_APPROVED_ALGORITHMS`,
   not to the encryption clause); and
   `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` → `MSDAS_MUST_DISABLE_OBSOLETE_TLS_VERSIONS`
   at `features/Mock Target/transport-security.feature:19`, plus the two comment mentions.
   Run its `standards:check` and fix what it reports — that is the guard doing
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
| 5a — split (api-security) | **done** | 2026-07-30 | Defect 1, security half: 15 clauses in 6 files, plus `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS` in `api-security/05`. See the shared Phase 5 notes below. |
| 5b — split (api-publishing) | **done** | 2026-07-30 | Defect 1, publishing: 6 clauses in 2 files. See the shared Phase 5 notes below. |
| 5c — split (synchronous) | **done** | 2026-07-30 | Defect 1, synchronous: 7 clauses in 6 files. See the shared Phase 5 notes below. |
| 5d — split (mcp + async) | **done** | 2026-07-30 | Defect 1, MCP + async: 5 clauses in 5 files (`mcp-apis/08` had none left — Phase 2 resolved its one instance). See the shared Phase 5 notes below. |
| 6 — ID stability | **closed, no work** | 2026-07-30 | Defect 11 closed as not applicable yet, with the owner. No generator change, no renumbering, no published rename map — all three exist to protect downstream consumers, and there are none: nothing is published outside `/draft/`, `versions.json` is `[]`, the specs and tooling are unreleased, and the sole reader is `../api-standards-conformance` under the same ownership. Verified first: only **3 of the 31** conformance tags stopped resolving across phases 1–5, and all 3 already carry a retag target in the rename log, so the log alone drives the Phase 7 retag. Also corrected a wrong claim in the Phase 2 log entry — `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` *is* a live tag, not comment-only. Re-open before the catalog leaves `/draft/` or a second consumer appears; see the Phase 6 section for the trigger conditions and why the full stable-ID option is the one to take then. |
| 7 — verify & re-baseline | **done** | 2026-07-30 | All four steps executed. **Every Appendix A count re-derived from a fresh local build and confirmed:** 240 clauses (MUST 112, SHOULD 74, MAY 24, SHOULD NOT 16, MUST NOT 14), mixed-strength **0**, vague MUSTs **0** of 126, no duplicate IDs, no duplicate content, text-derived IDs 33 of 126 (Phase 6's open item). `validateStandardTags.js`, `validateAccessibility.js` and `docusaurus build` + `extractStandards.js` all clean. Conformance repo re-baselined: exactly the **3** predicted tags were stale and no others, so the rename log alone drove the retag, as Phase 6 said it would. 12 files changed there; `standards:check` green, mock suite **39/39** conforming and 24 failures nonconforming. Tag count 31 → **33**. Details, decisions and the two things left for the owner are in the Phase 7 notes below. |

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

## Phase 5 notes (5a–5d)

All four batches were run together, for the same reason as Phase 4: the mechanism decision applies
across them, and the lint cannot ship until every clause in all four is clean.

**Decisions, confirmed with the owner 2026-07-30 — do not re-open in a later phase.**

1. **Mechanism: full split into separate `<Standard>` blocks**, not sub-clause IDs. Sub-clause IDs
   would need `ID_REGEX` and `idFormatRegex` loosened to allow `.`, a parent/child shape in the JSON
   and a Checklist change — and the parent ID would still exist and still mean "all of them", so the
   overclaim this phase exists to remove would survive at parent level. Neither generator regex was
   touched. Adjacent boxes separated by a blank line are in different paragraphs, so a split does not
   trip the Phase 2 mixed-strength lint; no `ACKNOWLEDGED_OVERLAPS` entry was needed for any of them.
2. **Scope: the 33 mixed-strength clauses plus `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`.** The 33
   are exactly the lint-enforceable set. Clauses in that set were atomised *fully*, including their
   same-strength parts — once a clause is being opened up, leaving two MUSTs joined is arbitrary. That
   rule was applied to the clauses *created* here too: a first pass produced three new two-obligation
   clauses, which were caught by the same-strength count below and split again. The 15 pre-existing
   clauses that repeat only their own keyword are listed under "Same-strength multi-obligation clauses"
   below and were **not** touched.
3. A **blocking lint** was added (`findForeignKeywords` in `validateStandardTags.js`).

**Counts.** 196 → **240** (MUST 112, SHOULD 74, MAY 24, SHOULD NOT 16, MUST NOT 14) — 45 clauses
added, 1 removed. **Mixed-strength 33 → 0.** Vague MUSTs stay 0 (denominator now 126). No duplicate
IDs or duplicate content. Build, both validators and the accessibility check clean, no broken anchors.
**No retained clause was renamed**, so all 7 conformance tags on former mixed-strength clauses still
resolve — but see the Phase 7 note below, because three of them now under-cover their scenario.

**Descriptive keywords had to be reworded, not just split.** Roughly a third of the 33 were not
multi-obligation at all: they were a single rule next to a cross-reference ("Note the related MAY
guidance above"), a rationale ("since the agent *may* relay tool output"), or a plain English modal
("the rules API Consumers *must* agree to"). The lint cannot distinguish those from obligations, and
neither can a reader of the JSON, so they were reworded and the cross-references moved out into page
prose. This is why the phase touched 18 files rather than the ~12 that carry genuine splits.

**Judgement calls worth a second opinion:**

- `MSDAS_MAY_USE_PASSWORD_AUTHENTICATION_FOR_LEGACY` carried "…but its use must be treated as an
  exception and **recorded appropriately**". Splitting the MUST out would have shipped a new clause
  that fails the Phase 4 vague-qualifier lint, so the destination had to be named: the new clause says
  "recorded in the API solution's risk assessment", tying it to `MSDAS_MUST_DEMONSTRATE_RISK_ASSESSMENT`.
  That is a concretisation, not a trim — the source never said where.
- `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS` → **8 clauses, old ID removed.** The eight are the
  report's own enumeration. One needed rewording rather than splitting: "a zero-trust model (no
  session-based authentication such as cookies)" reads as a MUST NOT inside a MUST, but the
  parenthetical defines what zero trust means here rather than adding a rule, so it became a relative
  clause ("in which no session-based authentication mechanism … is relied on to establish trust").
- `MSDAS_MUST_NOT_SILENTLY_CHANGE_APPROVED_TOOLS` → **4 clauses**. The consent half started as one
  `boundParty="both"` clause, following `MSDAS_SHOULD_REQUIRE_CONFIRMATION_FOR_WRITE_TOOLS`, but "the
  host must obtain consent and the server must require it" is two obligations on two parties, so it
  became `MSDAS_MUST_REQUIRE_RENEWED_CONSENT_FOR_CHANGED_TOOLS` (provider) and
  `MSDAS_MUST_OBTAIN_RENEWED_CONSENT_FOR_CHANGED_TOOLS` (consumer). Splitting turned out to be the
  better answer than `both` here: each half now has an honest, separately assessable bound party,
  which `both` cannot express. Worth revisiting whether the write-tools SHOULD deserves the same
  treatment — not done here, it is out of scope. Its sibling
  `MSDAS_MUST_NOTIFY_HOSTS_OF_MATERIAL_TOOL_CHANGES` (MUST) sits close to
  `MSDAS_SHOULD_NOTIFY_CLIENTS_OF_CAPABILITY_CHANGES` (SHOULD) in subject. Reviewed and judged
  distinct — the SHOULD covers a capability list changing at runtime, the MUST covers a *previously
  approved* tool changing materially, which is the rug-pull case. Different files, so the
  paragraph-scoped Phase 2 lint never sees them; recorded here so the pair is not rediscovered as a
  defect 5.
- `MSDAS_MUST_MINIMISE_IDENTITY_ATTRIBUTES` shed a parenthetical MAY ("ID Tokens may be returned from
  the authorise endpoint over TLS, or the token endpoint over mTLS") to page prose rather than to a new
  clause. It states where ID Tokens come from; the obligations on those transports live elsewhere.
- `MSDAS_MUST_NOT_EXPOSE_UNSAFE_OPERATIONS_VIA_GET` was "Do not expose unsafe operations via GET — it
  should never modify any resources on the server", one idea said twice. Split into two MUST NOTs
  anyway rather than merged, because the ID names only the first half and the second is separately
  testable.

**Lint limitations — read before Phase 7.**

- Verified both ways: run against the pre-Phase-5 tree it flags **exactly** the report's 33 clauses
  (identical ID sets, not just an equal count); against the current tree it reports 0.
- It only sees *strength* collisions. `MSDAS_MUST_ENCRYPT_ASYNCHRONOUS_MESSAGES` still packs four MUSTs
  into one ID and passes cleanly. "One obligation per ID" is therefore enforced for mixed-strength
  clauses and enforced by review for everything else.
- `ACKNOWLEDGED_FOREIGN_KEYWORDS` is empty by design — as in Phase 4, no clause needed an exception, so
  a future entry is a claim to argue rather than a formality.
- Synonyms are matched **upper-case only**, deliberately: lower-case *required* (8 hits), *recommended*
  (7) and *optional* (1) are all ordinary adjectives in this catalogue, and cross-canonical upper-case
  uses are 0. The primary five stay case-insensitive, matching the report's Appendix A detector.

**Read before Phase 7 — three tagged scenarios now span a split.** None of these break
`standards:check` (no ID moved), so they need reading, not diffing:

- `@MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA` — the scenario asserts unique tool names *and* an input
  schema. Unique names are now `MSDAS_MUST_MAKE_TOOL_NAMES_UNIQUE_WITHIN_A_SERVER`; add the tag or
  split the scenario.
- `@MSDAS_MUST_DECLARE_MCP_SPECIFICATION_VERSION` — asserts `result.protocolVersion` *and*
  `result.serverInfo.version`. The second is now `MSDAS_MUST_DECLARE_TOOL_CONTRACT_VERSION`.
- `@MSDAS_MUST_RETURN_429_WHEN_THROTTLED` — asserts the 429 *and* the `Retry-After` header. The header
  is now `MSDAS_SHOULD_INCLUDE_RETRY_AFTER_ON_429`, a SHOULD; the scenario has been asserting it at
  MUST strength.
- `@MSDAS_SHOULD_DOCUMENT_ALL_RESPONSES` — asserts multiple responses *including an error response*.
  The error half is now `MSDAS_MUST_DOCUMENT_ERROR_RESPONSES`, a MUST.
- **A retag, not a split:** `@MSDAS_MUST_AUDIENCE_RESTRICT_MCP_TOKENS` in `mcp-apis.feature` mints a
  token for the *widgets* audience and expects the MCP call to 401. That tests the cross-audience
  rejection, which is now `MSDAS_MUST_NOT_HONOUR_MCP_TOKENS_ACROSS_AUDIENCES`. The surviving MUST (the
  server must audience-restrict the tokens it issues) is not what the scenario exercises.

**Defect 11 moved the wrong way again**, as in Phase 4: text-derived IDs 29 → 33 of 126. Splitting a
clause down to one sentence makes its ID a near-transcription of that sentence almost by construction.
Phase 6's problem, and an argument for the full-stable-ID option there rather than the interim.

## Same-strength multi-obligation clauses (out of Phase 5 scope)

Not touched, per decision 2 above — **15** of them. These carry more than one obligation at a *single*
strength, so the `standardType` field does not misrepresent them and the lint cannot see them; a
conformance run can still only report them all-or-nothing. Listed so a future phase does not have to
rediscover them:

`MSDAS_MUST_ENCRYPT_ASYNCHRONOUS_MESSAGES` (4 MUSTs), `MSDAS_MUST_PROVIDE_SUBSCRIPTION_MECHANISM` (3),
and 2-obligation instances in `MSDAS_MUST_GIVE_RESOURCES_STABLE_IDENTIFIERS`,
`MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT`, `MSDAS_MUST_PUBLISH_GRAPHQL_SCHEMA`,
`MSDAS_MUST_DESCRIBE_GRAPHQL_SCHEMA_ELEMENTS`, `MSDAS_MUST_DEFINE_OPENAPI_SECURITY_SCHEMES`,
`MSDAS_MUST_ADOPT_LEVEL_OF_ASSURANCE_MODEL`, `MSDAS_MUST_LOG_CLIENT_DATA_TOOL_INVOCATIONS`,
`MSDAS_MUST_OBTAIN_CONSENT_TO_SHARE_ATTRIBUTES`, `MSDAS_SHOULD_FOLLOW_CURRENT_MCP_TRANSPORT_MODEL`,
`MSDAS_SHOULD_RETURN_JSON_BY_DEFAULT`, `MSDAS_SHOULD_USE_NAMESPACE_AS_FIRST_URI_NOUN`,
`MSDAS_SHOULD_USE_PLURAL_NOUN_RESOURCE_NAMES`, `MSDAS_SHOULD_ASSIGN_UNIQUE_API_KEYS`.

Reproduce with: count occurrences of a clause's own `standardType` in its `content` and report `> 1`.

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
| `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` | `MSDAS_MUST_DISABLE_OBSOLETE_TLS_VERSIONS` | 2 | Defect 5. Restated at MUST as a listener-configuration obligation, so the ID prefix has to change with the type. **Corrected in Phase 6:** this entry originally said "not a conformance tag, but named in comments". It *is* a live tag, at `features/Mock Target/transport-security.feature:19`, and also appears in comments there and in `mock/server.js` — update all three in Phase 7. |
| `MSDAS_SHOULD_ENCODE_TEXT_AS_UTF_8` | `MSDAS_SHOULD_ENCODE_NON_JSON_TEXT_AS_UTF_8` | 2 | Phase 1 addendum. Narrowed to non-JSON text now that the adjacent MUST cites STD 90, which already binds JSON to UTF-8. Renamed because the scope genuinely shrank — a tool tagging the old ID was claiming coverage of JSON encoding it no longer gets from this clause. Not currently tagged in the conformance repo. |
| `MSDAS_MUST_DESIGN_PUT_TOLERANT_APIS` | `MSDAS_MUST_ACCEPT_FULL_REPRESENTATION_ON_PUT` | 3 | Defect 7, second clause. "Be aware of the race condition" is not observable, and "PUT tolerant" was never defined in the source. Read as its standard industry meaning — accept the whole representation a GET returned, including properties the consumer cannot change — which is testable (PUT back a GET payload verbatim, expect 2xx) and, unlike the idempotency reading, is not already stated in the prose above the clause. Renamed because "design PUT tolerant APIs" named a posture, not the requirement. Not tagged in the conformance repo. |
| — | `MSDAS_MUST_IGNORE_BODY_IN_HEAD_RESPONSE` | 3 | Defect 3, consumer half of `MSDAS_MUST_NOT_RETURN_BODY_FOR_HEAD_REQUEST`. New clause, `boundParty="consumer"`. The MUST NOT keeps its ID and now binds only the provider. |
| `MSDAS_SHOULD_NOT_USE_PASSWORD_MODEL_IN_PRODUCTION` | — | 3 | Removed as a duplicate. Once "This model" was resolved to "Username and password (direct) authentication", its text was identical to `MSDAS_SHOULD_NOT_USE_PASSWORD_AUTHENTICATION_IN_PRODUCTION`. Its cross-reference sentence moved to that clause. Not tagged in the conformance repo; the only in-repo link to the anchor was repointed. |
| `MSDAS_MUST_AUTHENTICATE_API_ACCESS` | — | 4 | Defect 2. "Appropriate authentication must be achieved when accessing APIs" is unfalsifiable; demoted to an `INFO` box pointing at the mechanism clauses on the same page. Not tagged in the conformance repo. |
| `MSDAS_MUST_APPLY_APPROPRIATE_AUTHORISATION` | — | 4 | Defect 2. "Appropriate authorisation must be applied" — same treatment, pointing at the RBAC, scopes and ABAC clauses below it. Not tagged in the conformance repo. |
| `MSDAS_MUST_INCLUDE_SCOPES_IN_ACCESS_TOKENS` | — | 4 | Defect 2. Deleted rather than replaced with a pointer: the `MAY` on OAuth scopes sits in the same section and the least-privilege obligation was already page prose. Not tagged in the conformance repo. |
| `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS` | — | 5 | Defect 1, worst offender. Eight independent requirements in one ID; replaced by the nine clauses below (the throttling requirement was itself two obligations). Not tagged in the conformance repo. |
| — | `MSDAS_MUST_AUTHENTICATE_AND_AUTHORISE_CLOUD_API_REQUESTS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_VALIDATE_CLOUD_API_REQUESTS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_THROTTLE_CLOUD_API_REQUESTS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_APPLY_QUOTAS_TO_EXPENSIVE_CLOUD_ENDPOINTS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`; quotas are separately observable from throttling. |
| — | `MSDAS_MUST_LOG_CLOUD_API_ACTIVITY` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_DEPEND_ONLY_ON_TRUSTED_CLOUD_DEPENDENCIES` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_APPLY_ZERO_TRUST_MODEL_TO_CLOUD_APIS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. The "no session-based authentication" parenthetical is definitional, kept as a relative clause rather than split into a MUST NOT. |
| — | `MSDAS_MUST_FILTER_PUBLIC_NETWORK_TRAFFIC_TO_CLOUD_APIS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_RESTRICT_ACCESS_TO_CLOUD_API_SECRETS` | 5 | Split out of `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS`. |
| — | `MSDAS_MUST_RECORD_PASSWORD_AUTHENTICATION_AS_AN_EXCEPTION` | 5 | MUST half of `MSDAS_MAY_USE_PASSWORD_AUTHENTICATION_FOR_LEGACY`. "Recorded appropriately" had to name a destination to clear the Phase 4 lint — now the API solution's risk assessment. |
| — | `MSDAS_MUST_NOT_PUT_SENSITIVE_INFORMATION_IN_AUTHORISE_ENDPOINT_ID_TOKENS` | 5 | MUST NOT half of `MSDAS_MUST_MINIMISE_IDENTITY_ATTRIBUTES`. |
| — | `MSDAS_SHOULD_NOT_USE_CLIENT_CREATED_SAML_ASSERTIONS` | 5 | Second obligation of `MSDAS_SHOULD_NOT_USE_SAML_FOR_SERVER_TO_SERVER`. |
| — | `MSDAS_MAY_USE_SAML_WITH_AUTHORISATION_CODE_FOR_CONFIDENCE_APIS` | 5 | Second obligation of `MSDAS_MAY_USE_SAML_FOR_UNCLASSIFIED_APIS`. |
| — | `MSDAS_MUST_BIND_ISSUED_TOKENS_TO_THE_CLIENT` | 5 | MUST half of `MSDAS_SHOULD_SECURE_SENSITIVE_APIS_WITH_CLIENT_AUTHENTICATION`. |
| — | `MSDAS_MAY_USE_TLS_CLIENT_AUTH_IN_PRODUCTION` | 5 | Second obligation of `MSDAS_MAY_USE_SELF_SIGNED_MTLS_IN_TESTING`; different method, different environment. |
| — | `MSDAS_SHOULD_NOT_USE_MTLS_METHODS_WITH_PUBLIC_CLIENTS` | 5 | Second obligation of `MSDAS_SHOULD_NOT_USE_SELF_SIGNED_MTLS_IN_PRODUCTION`. |
| — | `MSDAS_SHOULD_BASE_POP_SELECTION_ON_RISK_ASSESSMENT` | 5 | SHOULD half of `MSDAS_MAY_USE_DPOP_FOR_CONFIDENCE_APIS`. |
| — | `MSDAS_SHOULD_ASSESS_API_RISK_AT_DESIGN_AND_ONGOING` | 5 | SHOULD half of `MSDAS_MUST_DEMONSTRATE_RISK_ASSESSMENT`. |
| — | `MSDAS_SHOULD_MAINTAIN_RISK_RECORDS_IN_MSD_SYSTEMS` | 5 | Second SHOULD of `MSDAS_MUST_DEMONSTRATE_RISK_ASSESSMENT`. |
| — | `MSDAS_MUST_NOT_HONOUR_MCP_TOKENS_ACROSS_AUDIENCES` | 5 | MUST NOT half of `MSDAS_MUST_AUDIENCE_RESTRICT_MCP_TOKENS`. **This is what the existing `@MSDAS_MUST_AUDIENCE_RESTRICT_MCP_TOKENS` scenario actually tests** — retag in Phase 7. |
| — | `MSDAS_MUST_NOTIFY_HOSTS_OF_MATERIAL_TOOL_CHANGES` | 5 | Notification half of `MSDAS_MUST_NOT_SILENTLY_CHANGE_APPROVED_TOOLS`. |
| — | `MSDAS_MUST_REQUIRE_RENEWED_CONSENT_FOR_CHANGED_TOOLS` | 5 | Provider half of the re-consent obligation in `MSDAS_MUST_NOT_SILENTLY_CHANGE_APPROVED_TOOLS`. |
| — | `MSDAS_MUST_OBTAIN_RENEWED_CONSENT_FOR_CHANGED_TOOLS` | 5 | Host half of the same obligation. `boundParty="consumer"` — see the bound-party table below. |
| — | `MSDAS_MUST_NOT_DELEGATE_ACCESS_CONTROL_TO_THE_AGENT` | 5 | MUST NOT half of `MSDAS_MUST_TREAT_MCP_CONTENT_AS_UNTRUSTED`. |
| — | `MSDAS_SHOULD_PUBLISH_TERMS_AND_CONDITIONS_ON_WEB` | 5 | SHOULD half of `MSDAS_MUST_PUBLISH_TERMS_AND_CONDITIONS`. |
| — | `MSDAS_SHOULD_INCLUDE_RETRY_AFTER_ON_429` | 5 | SHOULD half of `MSDAS_MUST_RETURN_429_WHEN_THROTTLED`. The existing scenario for that tag asserts the header too — see the Phase 7 note. |
| — | `MSDAS_SHOULD_PUBLISH_THROTTLING_THRESHOLDS_ON_WEB` | 5 | Second SHOULD of `MSDAS_SHOULD_INCLUDE_QUOTA_HEADERS`. |
| — | `MSDAS_MAY_VARY_THROTTLING_THRESHOLDS_BY_SLA_TIER` | 5 | MAY half of `MSDAS_SHOULD_INCLUDE_QUOTA_HEADERS`. |
| — | `MSDAS_MUST_DOCUMENT_ERROR_RESPONSES` | 5 | MUST half of `MSDAS_SHOULD_DOCUMENT_ALL_RESPONSES`. The existing scenario for that tag asserts an error response — see the Phase 7 note. |
| — | `MSDAS_SHOULD_REFERENCE_REQUEST_BODY_SCHEMA_FROM_COMPONENTS` | 5 | SHOULD half of `MSDAS_MUST_DEFINE_REQUEST_BODY_SCHEMA`. |
| — | `MSDAS_MAY_NEST_SCHEMA_REFERENCES` | 5 | MAY half of `MSDAS_SHOULD_USE_SCHEMA_REFERENCES`. |
| — | `MSDAS_MUST_DOCUMENT_EXTERNAL_APIS_IN_THE_CATALOGUE` | 5 | MUST half of `MSDAS_SHOULD_PUBLISH_API_DEFINITION_WHEN_READY`. "Well documented" → "documented … with accurate and up-to-date guidance"; the discovery rationale moved to prose. |
| — | `MSDAS_MUST_NOT_MODIFY_RESOURCES_IN_A_GET` | 5 | Second obligation of `MSDAS_MUST_NOT_EXPOSE_UNSAFE_OPERATIONS_VIA_GET`. |
| — | `MSDAS_SHOULD_LIMIT_SUB_RESOURCE_NESTING_DEPTH` | 5 | SHOULD half of `MSDAS_MUST_NEST_SUB_RESOURCES_UNDER_PARENT`. |
| — | `MSDAS_MUST_USE_KNOWN_IDENTIFIERS_FOR_BATCH_CROSS_REFERENCES` | 5 | MUST half of `MSDAS_SHOULD_USE_TEMPORARY_BULK_IDS`; the batch case, as against the transaction case the SHOULD keeps. |
| — | `MSDAS_SHOULD_NOT_INCLUDE_MINOR_VERSION_IN_URI` | 5 | SHOULD NOT half of `MSDAS_MUST_INCLUDE_MAJOR_VERSION_IN_URI`. |
| — | `MSDAS_SHOULD_DECLARE_TOOL_OUTPUT_SCHEMA` | 5 | SHOULD half of `MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA`. |
| — | `MSDAS_MUST_MAKE_TOOL_NAMES_UNIQUE_WITHIN_A_SERVER` | 5 | Second MUST of `MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA`. The existing scenario for that tag asserts unique names too — see the Phase 7 note. |
| — | `MSDAS_SHOULD_USE_VERB_NOUN_TOOL_NAMES` | 5 | Second SHOULD of `MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA`. |
| — | `MSDAS_MUST_DECLARE_TOOL_CONTRACT_VERSION` | 5 | Second MUST of `MSDAS_MUST_DECLARE_MCP_SPECIFICATION_VERSION`. The existing scenario for that tag asserts `serverInfo.version` too — see the Phase 7 note. |
| — | `MSDAS_MUST_NOT_BREAK_TOOL_INPUT_SCHEMA_WITHOUT_SIGNALLING` | 5 | MUST NOT half of `MSDAS_MUST_DECLARE_MCP_SPECIFICATION_VERSION`. Reworded from "without also changing" to "unless the Tool's name changes with it" to clear the Phase 3 presupposing-adverb lint, which only checks a clause's opening sentence and so had never seen this text. |
| — | `MSDAS_MAY_ADD_OPTIONAL_TOOL_PARAMETERS_WITHOUT_SIGNALLING` | 5 | MAY half of `MSDAS_MUST_DECLARE_MCP_SPECIFICATION_VERSION`. |
| — | `MSDAS_MUST_SUPPORT_QUERYING_FOR_CHANGED_RESOURCES` | 5 | MUST half of `MSDAS_MAY_INCLUDE_RESOURCE_POINTER_IN_THIN_EVENT`. |
| — | `MSDAS_MUST_NOT_CHANGE_MEANING_OF_TOPIC_ROOT_LEVELS` | 5 | MUST NOT half of `MSDAS_MUST_APPLY_TOPIC_DESIGN_CONSISTENTLY`. |
| — | `MSDAS_MUST_SEPARATE_TOPIC_LEVELS_WITH_SLASH` | 5 | Second MUST of `MSDAS_MUST_APPLY_TOPIC_DESIGN_CONSISTENTLY`. |

## Bound-party assignments (Phases 3 and 5)

Every clause not listed here is `provider`, the default. Phase 7 needs this list: a conformance run
against a provider endpoint cannot verify any of them, so a tag on one is an overclaim.

| Clause | Party | Why |
|---|---|---|
| `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` | consumer | Defect 7. Chain and CRL validation happens in software the provider does not control. **Untagged in Phase 7.** |
| `MSDAS_MUST_PROVIDE_AUTHORISATION_INTENT` | consumer | The consumer sends the intent to the authorisation server. |
| `MSDAS_MUST_IGNORE_BODY_IN_HEAD_RESPONSE` | consumer | New in Phase 3; only the receiver can ignore a body. |
| `MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT` | consumer | Both halves bind the party sending the request. **Untagged in Phase 7**; the provider-side 406 obligation it was standing in for still has no clause — see the Phase 7 notes. |
| `MSDAS_SHOULD_PROTECT_EMBEDDED_API_KEYS` | consumer | The key is embedded in the consumer's application; the page prose already says the consumer's developers are responsible for it. |
| `MSDAS_SHOULD_REQUIRE_CONFIRMATION_FOR_WRITE_TOOLS` | both | The MCP Server declares which tools need confirmation, but the confirmation prompt is the Host's to show. Neither party can satisfy it alone. |
| `MSDAS_MUST_OBTAIN_RENEWED_CONSENT_FOR_CHANGED_TOOLS` | consumer | New in Phase 5. Only the Host can put the changed tool back in front of the person the agent acts for. Its provider-side counterpart, `MSDAS_MUST_REQUIRE_RENEWED_CONSENT_FOR_CHANGED_TOOLS`, is a separate clause rather than a `both` — see the Phase 5 notes. |

Judged `provider` despite naming the consumer: `MSDAS_MUST_IDENTIFY_CONSUMER_IN_TOKEN` (the
authorisation server mints the token), `MSDAS_MUST_LIMIT_GRANT_TYPES` (the consumer half is
descriptive, not normative), and the ~30 publishing clauses of the form "API Providers MUST publish
X for API Consumers", where the consumer is the beneficiary and not the bound party.

---

## Phase 7 notes

### 1–2. Verification (standards repo — no source changes)

`node scripts/validateStandardTags.js`, `node scripts/validateAccessibility.js` and
`npm run build` (docusaurus + `extractStandards.js`) all clean over 80 doc files. Every Appendix A
command was re-run verbatim against the freshly built
`build/draft/assets/api-standards.json`; results are in the status row. Nothing in the standards
repo needed editing, which is the point — phases 1–6 left it consistent.

Note `yarn` cannot be used in this repo: there is a `package.json`/`yarn.lock` pair at `/home/pete`,
so Yarn Berry resolves the standards repo as a stray non-workspace and refuses. Use
`npm run build` / `node scripts/…` directly. Not worth fixing here; recorded so the next agent
doesn't read the error as a repo problem.

Two residual grep hits were checked and are correct as they stand: the one surviving `W3C`
reference is `MSDAS_SHOULD_PROPAGATE_TRACE_CONTEXT`, where W3C Trace Context genuinely is a W3C
standard (defect 10 was about HTTP), and the one surviving `HMAC` mention is in the
message-authentication clause Phase 1 created for it.

### 3–4. Conformance re-baseline (`../api-standards-conformance`, 12 files)

Phase 6's prediction held exactly: of the 31 tags, **the same 3 and only those 3** were stale, and
the rename log carried a retag target for each. No rename infrastructure was on the critical path.

Verified against a **local** catalog build, not the published one — the remediated catalog is still
unpublished, so `standards:check` against its default URL would have compared the new tags to the
old snapshot. Serve `build/draft/assets/` over HTTP and set `STANDARDS_JSON_ENDPOINT`; `fetch` will
not take a `file://` URL. This is now written down in that repo's `STANDARDS-DRIFT-CHECK.md`.

**Retags (3, from the rename log).** `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` → `…_TO_STD_90`;
`MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` → `MSDAS_MUST_…` (tag plus the two comment mentions
Phase 6 corrected the log about); `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` →
`MSDAS_MUST_AUTHENTICATE_MESSAGES_WITH_APPROVED_ALGORITHMS`. **The last one also corrects the
conformance repo's own earlier guess:** its commit `31b1671` ("fix renamed tag") had repointed the
`mock/server.js` comment at `MSDAS_MUST_ENCRYPT_CONTENT_WITH_APPROVED_ALGORITHMS`, the encryption
clause. The scenario decodes a JWT header and asserts the `alg` — signing, not encryption — so the
rename log's target was right and that comment was wrong.

**Scenario splits (4).** Each of the four scenarios flagged in the Phase 5 notes asserted a clause
that has since been split, so one scenario spanned two clause IDs. All four were split into two
scenarios rather than double-tagged: a double tag reports both clauses as failing when only one
assertion breaks, which is the same all-or-nothing reporting defect 1 existed to remove. New tags
now live: `MSDAS_MUST_MAKE_TOOL_NAMES_UNIQUE_WITHIN_A_SERVER`,
`MSDAS_MUST_DECLARE_TOOL_CONTRACT_VERSION`, `MSDAS_SHOULD_INCLUDE_RETRY_AFTER_ON_429`,
`MSDAS_MUST_DOCUMENT_ERROR_RESPONSES`. The last needed the combined
`every OpenAPI operation should document multiple responses including an error response` step
replaced by two steps in `oas-lint.steps.js`. Two of these were previously asserted at the wrong
strength — `Retry-After` at MUST and the error response at SHOULD — and now report at their own.

**Repoint (1).** `@MSDAS_MUST_AUDIENCE_RESTRICT_MCP_TOKENS` → `MSDAS_MUST_NOT_HONOUR_MCP_TOKENS_ACROSS_AUDIENCES`.
The scenario mints a token for the widgets audience and expects the MCP call to 401, which is the
rejection clause. The surviving MUST binds the token *issuer* and is now untested — a genuine
coverage gap, not a regression, and not fillable against a mock that issues its own tokens.

**Untags (2) — the step-4 decision.** Both tagged consumer-bound clauses were untagged and recorded
in `standards-mapping.json` with the reason. `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS`: the
scenario asserts the *test client's* trust store, so no target behaviour can fail it. Kept as a
guard that the handshake probe still validates chains (it catches a stray
`NODE_TLS_REJECT_UNAUTHORIZED=0`), but untagged. `MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT`:
the scenario asserts a provider 406, and that obligation still has no clause. Both scenarios were
kept and both remain in the run; only the conformance *claim* was withdrawn. Net effect on the tag
count: 31 − 2 + 4 = **33**, across 35 tagged scenarios of 40.

A third **blocking check** was added to `check-standards.js` — a tag on a `boundParty="consumer"`
clause now fails `standards:check`. Same pattern as the phase 2–5 lints, and negative-tested both
ways (a throwaway feature tagging the TLS clause fails with the right message; removing it passes).
`both` is deliberately allowed: a provider run can evidence the provider's half. A catalog
predating `boundParty` omits the field, which is read as the `provider` default, so the check is a
no-op against older snapshots rather than a wall of false failures.

**Fixture bug found and fixed (unplanned).** The whole suite was unrunnable: the mock target's
self-signed cert has one-day validity but was only regenerated when *absent*, so every request
failed `CERT_HAS_EXPIRED` until `mock/certs/` was deleted by hand. `ensureTlsCertificate()` now
regenerates when the cert is missing *or* fails `openssl x509 -checkend 300`. Unrelated to the
remediation, but it blocked step 3 and would have hit the next person the same way.

The nonconforming mock was also taught to omit `serverInfo.version`, so
`MSDAS_MUST_DECLARE_TOOL_CONTRACT_VERSION` is demonstrated failing as well as passing. Without it
the new tag would only ever have been green.

**Results.** `standards:check` green. Mock suite **39/39** passing conforming; **24 failures**
nonconforming, including every newly split scenario — so each new tag detects a violation, not just
a pass. `eslint` clean on the three changed JS files. The `oas-lint` family still passes in both
modes, since `MOCK_MODE` doesn't vary `mock/oas.yml`; pre-existing and documented in
`mock/README.md`.

### Left for the owner

1. **The missing provider-side content-negotiation clause.** The catalogue obliges the consumer to
   send `Accept`, but says nothing about what a provider does with an `Accept` it cannot satisfy.
   RFC 9110 §12.5.1 and §15.5.7 give the answer (406, or serve a default), the mock already
   implements it, and a scenario already tests it — it just has no clause to tag. Adding one is new
   normative content, which is why phases 3 and 7 both stopped short. This is the one real
   *coverage* gap the remediation opened.
2. **`MSDAS_MUST_AUDIENCE_RESTRICT_MCP_TOKENS` is now untested** (see Repoint above). It needs a
   scenario that inspects an issued token's `aud`, not one that watches a server reject someone
   else's token.

Not done, deliberately: `../api-standards-conformance/STANDARDS-DEFECTS.md` was left untouched. It
states its snapshot (fetched 2026-07-29, sha256 `84f9fa4b952cfa97…`, 198 clauses) in its own header,
so it reads correctly as a historical report; editing counts into it would make it neither the
original review nor a current one. This file is the record of what was done about it.
