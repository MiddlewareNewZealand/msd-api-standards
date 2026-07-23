const fs = require("fs");
const path = require("path");

// Deterministic, code-only checks for Markdown table patterns that WCAG 2.2
// AA audits flagged as accessibility defects, but which don't need a full
// `docusaurus build` (or a browser/axe/pa11y run) to catch — they're
// structural problems visible in the Markdown source itself. Mirrors the
// style of scripts/validateStandardTags.js.

const docsDir = path.join(__dirname, "..", "docs");

// Keywords that have historically been misused as single-row pipe-table
// "callout" boxes (which Docusaurus/GFM parses as <table><th> — i.e. a
// whole paragraph read out as a column header) instead of the project's own
// <Standard type="..."> component. Extend this list if a new callout
// keyword shows up in review. "SCOPE" isn't itself a <Standard> type; the
// one historical instance was fixed using type="NOTE".
const CALLOUT_KEYWORDS = ["INFO", "SCOPE", "NOTE", "EXAMPLE", "WARNING"];
const SUGGESTED_TYPE = { SCOPE: "NOTE" };

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(entryPath, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(entryPath);
  }
  return out;
}

function isPipeRow(line) {
  return /^\|.*\|$/.test(line.trim());
}

// Splits a "| a | b |" row into trimmed cell strings, ignoring escaped
// pipes (\|) so inline content like `a\|b` doesn't fracture a cell.
function splitRow(line) {
  const trimmed = line.trim();
  const inner = trimmed.slice(1, -1);
  return inner.split(/(?<!\\)\|/).map((c) => c.trim());
}

function isSeparatorRow(line) {
  if (!isPipeRow(line)) return false;
  const cells = splitRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

function firstWord(cell) {
  const word = cell.trim().split(/\s+/)[0] || "";
  return word.toUpperCase().replace(/[:.,;-]+$/, "");
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const relPath = path.relative(process.cwd(), filePath);
  const lines = content.split("\n");
  const errors = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (!isPipeRow(line)) continue;

    const next = lines[i + 1];
    if (next === undefined || !isSeparatorRow(next)) continue;

    // `line` is a table header row (immediately followed by a valid
    // separator row).
    const headerCells = splitRow(line);
    const sepCells = splitRow(next);
    if (headerCells.length !== sepCells.length) continue; // malformed table; not ours to judge
    const at = `${relPath}:${i + 1}`;

    // --- Single-row pipe-table misused as an INFO/SCOPE/NOTE/etc callout ---
    if (headerCells.length === 1) {
      const keyword = firstWord(headerCells[0]);
      if (CALLOUT_KEYWORDS.includes(keyword)) {
        const suggestedType = SUGGESTED_TYPE[keyword] || keyword;
        errors.push(
          `${at} single-row table used as a "${keyword}" callout (renders as a lone column header, not a callout box) — use <Standard type="${suggestedType}">...</Standard> instead`
        );
        continue; // don't also report it as a "blank header cell" table
      }
    }

    // --- Blank/unlabeled header cell ---
    headerCells.forEach((cell, idx) => {
      if (cell === "") {
        errors.push(`${at} table header has a blank cell (column ${idx + 1}) — give it a real label instead of leaving it empty`);
      }
    });
  }

  return errors;
}

function main() {
  const files = walk(docsDir);
  const errors = files.flatMap(validateFile);

  if (errors.length > 0) {
    console.error("Accessibility issues found in Markdown tables:\n");
    errors.forEach((e) => console.error(`  ${e}`));
    console.error(`\n${errors.length} issue(s) found. See CONTRIBUTING.md / ACCESSIBILITY_AUDIT.md for context.`);
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${files.length} doc file(s); no table accessibility issues found.`);
}

main();
