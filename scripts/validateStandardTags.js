const fs = require("fs");
const path = require("path");

// Mirrors the rules enforced at runtime by src/components/Standard.jsx, but
// checks the Markdown source directly so authors get file:line feedback in
// seconds instead of waiting on a full `docusaurus build`.

const docsDir = path.join(__dirname, "..", "docs");

const CANONICAL_TYPE = {
  MUST: "MUST",
  "MUST NOT": "MUST_NOT",
  REQUIRED: "MUST",
  SHALL: "MUST",
  "SHALL NOT": "MUST_NOT",
  SHOULD: "SHOULD",
  "SHOULD NOT": "SHOULD_NOT",
  RECOMMENDED: "SHOULD",
  "NOT RECOMMENDED": "SHOULD_NOT",
  MAY: "MAY",
  OPTIONAL: "MAY",
};

const NON_NORMATIVE = new Set(["INFO", "EXAMPLE", "NOTE"]);

const ID_REGEX = /^MSDAS_(MUST|MUST_NOT|SHOULD|SHOULD_NOT|MAY)_[A-Za-z0-9_]+$/;

const TAG_REGEX = /<Standard\b([^>]*)>([\s\S]*?)<\/Standard>/g;
const ATTR_REGEX = /(\w+)(?:=(?:"([^"]*)"|\{([^}]*)\}))?/g;

// --- Mixed-strength check -------------------------------------------------
// Two clauses about the same subject at different RFC 2119 strengths make the
// weaker one look optional when the stronger already settles it (a SHOULD to
// disable old TLS versions, next to a MUST requiring TLS 1.3+). This had been
// fixed twice by hand before it was worth detecting.
//
// The heuristic: within one paragraph, two normative clauses of different
// strength that share a distinctive term. Paragraph scope is deliberate —
// widening it to section scope raises the flag count from 4 to 78, almost all
// of them the legitimate "SHOULD NOT in production / MAY in testing" shape.
//
// It cannot tell a real overlap from two different obligations about the same
// noun, so every pair here is a reviewed judgement rather than a suppression.
// Adding an entry means someone read both clauses and concluded they impose
// independent requirements.
const ACKNOWLEDGED_OVERLAPS = new Map([
  [
    "MSDAS_MUST_CONFORM_JSON_TO_STD_90|MSDAS_SHOULD_ENCODE_NON_JSON_TEXT_AS_UTF_8",
    "Disjoint by construction: the MUST covers JSON (UTF-8 via STD 90), the SHOULD covers every other text format.",
  ],
  [
    "MSDAS_MUST_CONFORM_JSON_TO_STD_90|MSDAS_SHOULD_NOT_RETURN_BINARY_DATA_DIRECTLY",
    "Shares only the token 'data' — JSON Data Interchange Format vs binary data. Unrelated subjects.",
  ],
  [
    "MSDAS_MUST_NOT_REVEAL_SENSITIVE_INFO_IN_ERRORS|MSDAS_SHOULD_OMIT_INTERNAL_DETAILS_FROM_ERRORS",
    "Same object (error messages), different predicates: withholding internal implementation detail vs not confirming whether a client exists.",
  ],
  [
    "MSDAS_MUST_NOT_REVEAL_SENSITIVE_INFO_IN_MCP_ERRORS|MSDAS_SHOULD_OMIT_INTERNAL_DETAILS_FROM_MCP_ERRORS",
    "As above, for the MCP tool-error equivalents.",
  ],
]);

const TERM_STOPWORDS = new Set(
  ("a an and any are as at be been being both but by can each for from has have if in into is it its " +
    "may must no non not of on only or other others same shall should so such than that the their them " +
    "then there these this those to use used using when where which while with within you your")
    .split(" "),
);

function subjectTerms(text) {
  const words = String(text)
    .replace(/<[^>]*>/g, " ")
    .replace(/\bMSDAS_[A-Z0-9_]+\b/g, " ")
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9.+-]*/g);
  const terms = new Set();
  for (const word of words || []) {
    const trimmed = word.replace(/[.+-]+$/, "");
    if (trimmed.length >= 3 && !TERM_STOPWORDS.has(trimmed)) terms.add(trimmed);
  }
  return terms;
}

function paragraphsOf(content) {
  const paragraphs = [];
  let offset = 0;
  for (const text of content.split(/\n\s*\n/)) {
    paragraphs.push({ text, start: offset });
    offset += text.length + 2;
  }
  return paragraphs;
}

function findMixedStrengthPairs(filePath, content) {
  const relPath = path.relative(process.cwd(), filePath);
  const errors = [];

  for (const paragraph of paragraphsOf(content)) {
    const clauses = [];
    let match;
    TAG_REGEX.lastIndex = 0;
    while ((match = TAG_REGEX.exec(paragraph.text))) {
      const { id, type, toolTip } = parseAttrs(match[1]);
      const canonical = CANONICAL_TYPE[type];
      if (!id || !canonical) continue;
      clauses.push({ id, canonical, terms: subjectTerms(toolTip || match[2]) });
    }

    for (let i = 0; i < clauses.length; i++) {
      for (let j = i + 1; j < clauses.length; j++) {
        const [a, b] = [clauses[i], clauses[j]];
        if (a.canonical === b.canonical) continue;
        const shared = [...a.terms].filter((term) => b.terms.has(term));
        if (shared.length === 0) continue;
        if (ACKNOWLEDGED_OVERLAPS.has([a.id, b.id].sort().join("|"))) continue;

        const line = lineOf(content, paragraph.start);
        errors.push(
          `${relPath}:${line} "${a.id}" (${a.canonical}) and "${b.id}" (${b.canonical}) state requirements ` +
            `at different strengths in the same paragraph, sharing: ${shared.join(", ")}. ` +
            `Restate them at one strength, narrow them so they do not overlap, or — if they are ` +
            `genuinely independent — record the pair in ACKNOWLEDGED_OVERLAPS with the reason.`,
        );
      }
    }
  }

  return errors;
}

function parseAttrs(attrString) {
  const attrs = {};
  let m;
  ATTR_REGEX.lastIndex = 0;
  while ((m = ATTR_REGEX.exec(attrString))) {
    const [, name, doubleQuoted, brace] = m;
    attrs[name] = doubleQuoted !== undefined ? doubleQuoted : brace !== undefined ? brace : true;
  }
  return attrs;
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(entryPath, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(entryPath);
  }
  return out;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const relPath = path.relative(process.cwd(), filePath);
  const errors = [];
  let match;
  TAG_REGEX.lastIndex = 0;

  while ((match = TAG_REGEX.exec(content))) {
    const [, attrString, body] = match;
    const line = lineOf(content, match.index);
    const { id, type, toolTip, inline } = parseAttrs(attrString);
    const at = `${relPath}:${line}`;

    if (!type) {
      errors.push(`${at} missing required "type" attribute`);
      continue;
    }

    const isNonNormative = NON_NORMATIVE.has(type);
    const canonical = CANONICAL_TYPE[type];

    if (!isNonNormative && !canonical) {
      errors.push(`${at} unknown type "${type}" (expected an RFC 2119 keyword, or INFO/EXAMPLE/NOTE)`);
      continue;
    }

    if (!isNonNormative) {
      if (!id) {
        errors.push(`${at} type="${type}" is normative and requires an "id"`);
      } else if (!ID_REGEX.test(id)) {
        errors.push(`${at} id "${id}" does not match MSDAS_<TYPE>_... format`);
      } else if (!id.startsWith(`MSDAS_${canonical}_`)) {
        errors.push(`${at} id "${id}" prefix does not match type "${type}" (expected MSDAS_${canonical}_...)`);
      }
    }

    if (inline && !toolTip) {
      errors.push(`${at} inline Standard requires an explicit "toolTip" attribute`);
    }

    if (!inline) {
      const lines = body.split("\n");
      const firstLineHasContent = lines[0].trim() !== "";
      if (lines.length === 1 || firstLineHasContent) {
        errors.push(`${at} content must be on its own line(s), not on the same line as <Standard> (or use the inline form)`);
      } else if (lines[lines.length - 1].trim() !== "") {
        errors.push(`${at} closing </Standard> must be on its own line`);
      }
    }
  }

  return errors.concat(findMixedStrengthPairs(filePath, content));
}

function main() {
  const files = walk(docsDir);
  const errors = files.flatMap(validateFile);

  if (errors.length > 0) {
    console.error("Invalid <Standard> tag usage found:\n");
    errors.forEach((e) => console.error(`  ${e}`));
    console.error(`\n${errors.length} issue(s) found. See CONTRIBUTING.md for correct <Standard> usage.`);
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${files.length} doc file(s); no <Standard> tag issues found.`);
}

main();
