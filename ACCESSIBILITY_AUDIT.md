# Accessibility Audit Findings — Action List

Audited: all 74 doc pages against WCAG 2.2 AA, rendered HTML (`build/draft/**`, confirmed current). 2026-07-23.
Ordered by priority. Each item: fix + file + verify.

## 1. `/` root route renders blank (Critical)
Navbar+footer only, no H1, empty `<main>`, HTTP 200 (should be a redirect or 404).
- Investigate `docusaurus.config.js` versions config (`current`/`draft` path) — likely needs a redirect plugin from `/` → `/draft/`, or `onBrokenLinks`/routing fix.
- Verify: `curl -s http://localhost:PORT/msd-api-standards/ | grep '<h1'` should return content.

## 2. Markdown tables missing `<th scope="col">` (Moderate, ~30+ instances site-wide)
Docusaurus's default table renderer never adds `scope`. Single fix point, not per-file.
- Add a remark/rehype plugin (or MDX table wrapper component) in `docusaurus.config.js` `remarkPlugins`/`rehypePlugins` that injects `scope="col"` on header-row `<th>` for all doc tables.
- Verify: rebuild, grep `build/draft/**/index.html` for `<th>` without `scope=`.

## 3. Code-block syntax highlight fails contrast (Serious, site-wide)
`docusaurus.config.js:5` — `lightTheme = themes.github`. JSON key color `#36acaa` on `#f6f8fa` = 2.58:1; string color `#e3116c` = 4.32:1 (need 4.5:1).
- Swap to a prism-react-renderer light theme with AA-compliant token colors (e.g. `themes.vsLight`, `themes.oneLight` — check ratios before adopting), or override token CSS in `src/css/custom.css`.
- Verify: compute contrast of `.token.property` / `.token.string` colors against `#f6f8fa`.

## 4. Malformed callout tables (Serious, 2 known instances)
Single-cell pipe-tables used as INFO/SCOPE callouts get parsed as `<table><th>` = whole paragraph read as a column header.
- `docs/api-concepts/01-introduction.md:33` (`| INFO ... |`)
- `docs/api-development/synchronous-apis/01-api-design.md:47` (`| SCOPE ... |` — missing blank line before it, merges into preceding table)
- Fix: replace with the existing `<Standard>`/admonition component (see `src/components/Standard.jsx`) instead of a pipe-table, or add blank lines so it's not parsed as a table at all. Grep `docs/**/*.md` for other `| INFO` / `| SCOPE` / `| NOTE` one-row tables — these two were only the ones the audit happened to hit.

## 5. Inline RFC 2119 keyword spans not keyboard-focusable (Serious)
`src/components/Standard.jsx` — inline variant (`.standard-inline`, used mid-sentence e.g. "SHOULD NOT") has a react-tooltip but no `tabIndex`/`role`, so keyboard users can't trigger it. Block-style `.standard` boxes are fine (text duplicated visibly).
- Add `tabIndex={0}` and `role="button"` (or equivalent) to the inline span in `Standard.jsx`.
- Verify: Tab to an inline keyword span in a browser, confirm tooltip appears on focus.

## 6. Footer links all point to the same URL (Minor)
`docusaurus.config.js:126-135` — "Accessibility", "Privacy & security", "Legal and copyright" all `href: 'https://www.msd.govt.nz/'`.
- Point each to its actual distinct destination page once those pages exist, or consolidate into one honestly-labeled link.

## 7. Duplicate generic page titles (Serious, 3 pages)
`/draft/checklist`, `/draft/api-development/api-specifications`, and the Redoc spec page (`/api-specifications/example-agency-specification`) all render the same generic site title instead of a page-specific one.
- Checklist/api-specifications: add explicit `title` frontmatter to `docs/checklist.md` and `docs/api-development/api-specifications/index.md`.
- Redoc page: set a page title via the `redocusaurus` plugin config in `docusaurus.config.js` (spec route config).

## 8. Redoc page heading misuse (Moderate, third-party theme output)
`/api-specifications/example-agency-specification` — Redoc emits consecutive `<h2>`s where the second is a sentence-length operation description, not a title (repeats ~10+ times).
- Likely needs a `redocusaurus` theme override or upstream Redoc issue; lower priority since it's third-party generated markup.

## 9. Empty/unlabeled table header cell (Serious, 1 page)
`docs/api-development/synchronous-apis/12-search-apis.md` — first `<th>` in the comparison table is blank with no scope/label.
- Add visually-hidden label text, e.g. `<th><span class="visually-hidden">Aspect</span></th>`, or a real header like "Feature".

## 10. Diagram label contrast (Minor, generated SVG)
`docs/api-concepts/05-standards-component-definitions.md` — PlantUML/Kroki diagram label color `#4080A9` ≈ 4.3:1, just under 4.5:1.
- Fix at the Kroki/PlantUML theme/style level (diagram source), not site CSS. Low priority, borderline ratio.

## Not yet triggered but present in code (preventive, low priority)
- `.site-alert` component in `src/css/custom.css`: navy-on-red/navy gradient ≈ 2.78:1 if ever populated with content — not used on any current page.
- `.btn--primary` in `src/css/custom.css`: navy on `#c23b3b` ≈ 3.36:1 — not used on any current page.
- Fix contrast before either component is adopted in content.

## Already verified clean (no action needed)
Skip link, `lang="en-nz"`, heading hierarchy (single H1, no skips), image alt text, body/heading contrast (light+dark), `<Standard>` badge contrast, code-block keyboard scrolling, link text specificity — all checked across all 74 pages, no defects found.
