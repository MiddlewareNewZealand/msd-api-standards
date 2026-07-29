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
| 2 — redundancy | not started | | |
| 3 — anaphora & bound party | not started | | |
| 4a — vague MUSTs (security) | not started | | |
| 4b — vague MUSTs (rest) | not started | | |
| 5a — split (api-security) | not started | | |
| 5b — split (api-publishing) | not started | | |
| 5c — split (synchronous) | not started | | |
| 5d — split (mcp + async) | not started | | |
| 6 — ID stability | not started | | |
| 7 — verify & re-baseline | not started | | |

## Rename log

Every ID added, removed or renamed by phases 1–5. Feeds Phase 6 and Phase 7.
Use `—` in New ID for a removal (a demoted clause), and in Old ID for an addition
(a clause split out of another).

| Old ID | New ID | Phase | Reason |
|---|---|---|---|
| `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` | `MSDAS_MUST_CONFORM_JSON_TO_STD_90` | 1 | Defect 8. RFC 7159 obsoleted by RFC 8259; cite the stable STD number so the next revision doesn't rename the clause again. |
| `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` | `MSDAS_MUST_ENCRYPT_CONTENT_WITH_APPROVED_ALGORITHMS` | 1 | Defect 9, encryption half. Renamed rather than kept: the clause no longer covers HMAC, and the conformance tag on the old ID tests *signature* algorithms. A rename makes `standards:check` fail loudly instead of silently re-pointing that tag at an encryption-only clause. |
| — | `MSDAS_MUST_AUTHENTICATE_MESSAGES_WITH_APPROVED_ALGORITHMS` | 1 | Defect 9, message-authentication half. New clause for HMAC / digital signatures. The existing conformance scenario for the old ID belongs here. |
