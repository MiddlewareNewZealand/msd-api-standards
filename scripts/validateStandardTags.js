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

  return errors;
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
