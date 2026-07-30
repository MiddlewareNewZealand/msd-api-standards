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

const BOUND_PARTIES = new Set(["provider", "consumer", "both"]);

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

// --- Dangling-reference check ---------------------------------------------
// A clause is lifted out of the page's prose into the Checklist and the JSON,
// where nothing precedes it. "In order for this to occur, the API Consumer
// must provide…" states no rule once separated from the sentence before it.
//
// The check runs on the *first sentence* of the clause text only. Anaphora
// resolves backwards, so a demonstrative in the opening sentence has nothing
// inside the clause to bind to; later sentences almost always refer back to the
// first one ("…publish terms and conditions. These SHOULD be available via a
// web experience") and flagging them is pure noise.
//
// Deliberately not detected, each measured against the 199-clause catalog
// before being dropped:
//   "it"        24 hits, 23 resolving to a subject earlier in the same
//               sentence ("Where JSON is used, it must conform to STD 90").
//   "instead"   3 hits, 0 genuine — each grounded by an in-sentence contrast
//               ("prefer a hyperlink to the image instead").
//   "too"       2 hits, both the degree adverb ("too large for timely
//               synchronous processing"), not the additive one.
//   "otherwise" 1 hit, in the "or otherwise" idiom.
// Actor switches mid-clause (the other half of this defect class) are not
// lexically detectable; the RFC-2119-keyword check planned alongside the
// clause splitting catches those instead.
const DEMONSTRATIVE_REGEX = /\b(this|these|those|such)\b((?:\s+[A-Za-z][\w'-]*){0,3})/gi;

// Adverbs that presuppose a contrast the clause never states. "still" is only
// grounded when a concessive marker supplies the contrast in the same sentence.
const PRESUPPOSING_ADVERB_REGEX = /\b(still|also|likewise)\b/gi;
const CONCESSIVE_REGEX = /\b(even|although|though|while|whereas|despite|regardless)\b/i;

// Nouns a clause may legitimately point at with a demonstrative, because they
// name the document the clause is part of rather than something outside it.
const SELF_REFERENTIAL_NOUNS = new Set([
  "part",
  "parts",
  "document",
  "standard",
  "standards",
  "section",
  "page",
  "catalogue",
]);

// Words that, following a demonstrative, mean it is being used as a bare
// pronoun rather than as a determiner on a noun ("this can expose", "these
// SHOULD be available") — there is no head noun to look for.
const NON_NOUN_FOLLOWERS = new Set(
  ("can could is are was were be been being will would shall should must may might has have had " +
    "does do did and or but not to in of on for from with when where which that than then " +
    "applies apply means requires require provides provide produce produces")
    .split(" "),
);

const ARTICLES = new Set(["a", "an", "the"]);

// Reviewed exceptions. As with ACKNOWLEDGED_OVERLAPS, an entry here means
// someone read the clause and concluded the reference does resolve inside it.
const ACKNOWLEDGED_REFERENCES = new Map([
  [
    "MSDAS_MUST_LIMIT_GRANT_TYPES",
    '"those agreed and documented" is a reduced relative clause on "grant types", named earlier in the same sentence — not a reference out of the clause.',
  ],
  [
    "MSDAS_MUST_PUBLISH_THROTTLING_QUOTAS",
    '"since these produce materially different integration patterns" refers to the parenthesised list of quota scopes immediately before it, inside the clause.',
  ],
]);

const ABBREVIATION_REGEX = /(?:\b(?:e\.g|i\.e|etc|vs|cf|approx|Inc|Ltd)|\s[A-Z])\.$/;

// Clause text as a reader of the JSON sees it: markdown link targets and any
// stray markup removed, whitespace collapsed.
function clauseText(raw) {
  return String(raw)
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<[^>]*>/g, " ")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(text) {
  const parts = text.split(/(?<=[.!?])\s+/);
  let sentence = parts[0] ?? "";
  for (let i = 1; i < parts.length; i++) {
    // Keep going while the break was an abbreviation's full stop, or the next
    // fragment does not start like a new sentence.
    if (!ABBREVIATION_REGEX.test(sentence) && /^[A-Z“"(]/.test(parts[i])) break;
    sentence += ` ${parts[i]}`;
  }
  return sentence;
}

// "attributes" and "attribute" should match; 4 characters is enough of a stem
// to avoid matching on shared prefixes of unrelated words.
function mentionsEarlier(before, noun) {
  const stem = noun.replace(/(?:ies|es|s)$/, "");
  if (stem.length < 4) return before.toLowerCase().includes(noun.toLowerCase());
  return new RegExp(`\\b${stem}`, "i").test(before);
}

function findDanglingReferences(filePath, content) {
  const relPath = path.relative(process.cwd(), filePath);
  const errors = [];
  let match;
  TAG_REGEX.lastIndex = 0;

  while ((match = TAG_REGEX.exec(content))) {
    const { id, type, toolTip } = parseAttrs(match[1]);
    if (!id || !CANONICAL_TYPE[type] || ACKNOWLEDGED_REFERENCES.has(id)) continue;

    const at = `${relPath}:${lineOf(content, match.index)}`;
    const opening = firstSentence(clauseText(toolTip || match[2]));

    let hit;
    DEMONSTRATIVE_REGEX.lastIndex = 0;
    while ((hit = DEMONSTRATIVE_REGEX.exec(opening))) {
      const demonstrative = hit[1].toLowerCase();
      const following = (hit[2] || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
      const before = opening.slice(0, hit.index);

      // "such as" / "such that" are idioms, not references.
      if (demonstrative === "such" && ["as", "that"].includes(following[0])) continue;

      const head = following.find((word) => !ARTICLES.has(word));
      if (!head || NON_NOUN_FOLLOWERS.has(head)) {
        errors.push(
          `${at} "${id}" opens with a bare "${hit[1]}" that has no antecedent inside the clause. ` +
            `Clause text is read standalone in the Checklist and the JSON — name the thing it refers to.`,
        );
        continue;
      }

      if (SELF_REFERENTIAL_NOUNS.has(head) || mentionsEarlier(before, head)) continue;

      errors.push(
        `${at} "${id}" refers to "${hit[1]} ${head}" but never says what that is. ` +
          `Name it in the clause text, or record the clause in ACKNOWLEDGED_REFERENCES with the reason it resolves.`,
      );
    }

    PRESUPPOSING_ADVERB_REGEX.lastIndex = 0;
    while ((hit = PRESUPPOSING_ADVERB_REGEX.exec(opening))) {
      if (CONCESSIVE_REGEX.test(opening)) continue;
      errors.push(
        `${at} "${id}" uses "${hit[1]}", which presupposes a condition the clause does not state. ` +
          `State the condition, or drop the word.`,
      );
    }
  }

  return errors;
}

// --- Unquantified-qualifier check -----------------------------------------
// A MUST gated on a word that is never defined cannot be failed: any choice can
// be defended as "appropriate". Such a clause still consumes a clause ID and
// drags down any coverage figure computed against the catalogue, so it is worse
// than saying nothing.
//
// Restricted to MUST and MUST NOT deliberately. A SHOULD is advisory by
// construction — "should remain available for an appropriate transition period"
// invites a judgement, which is what SHOULD is for. The same words in a MUST
// invite one and then forbid the outcome of making it.
//
// The vocabulary matches the defect report's Appendix A regex exactly, so a
// clean run here means the reported count is 0 rather than merely lower. Note
// the converse does not hold: this is a word list, not a semantic check, and
// "complete" in MSDAS_MUST_DESCRIBE_EACH_TOOL_CLEARLY is just as much a
// judgement call while passing cleanly. Adding a word here means committing to
// fixing every clause that then fails.
const VAGUE_QUALIFIER_REGEX =
  /\b(appropriate(?:ly)?|sufficient|robust|correctly|clear(?:ly)?|relevant)\b/gi;

const VAGUE_CHECKED_TYPES = new Set(["MUST", "MUST_NOT"]);

// Reviewed exceptions, as with ACKNOWLEDGED_OVERLAPS and ACKNOWLEDGED_REFERENCES.
// An entry means someone read the clause and concluded the word is quantified by
// the clause itself.
const ACKNOWLEDGED_QUALIFIERS = new Map();

function findVagueQualifiers(filePath, content) {
  const relPath = path.relative(process.cwd(), filePath);
  const errors = [];
  let match;
  TAG_REGEX.lastIndex = 0;

  while ((match = TAG_REGEX.exec(content))) {
    const { id, type, toolTip } = parseAttrs(match[1]);
    const canonical = CANONICAL_TYPE[type];
    if (!id || !VAGUE_CHECKED_TYPES.has(canonical) || ACKNOWLEDGED_QUALIFIERS.has(id)) continue;

    const text = clauseText(toolTip || match[2]);
    const hits = new Set();
    VAGUE_QUALIFIER_REGEX.lastIndex = 0;
    let hit;
    while ((hit = VAGUE_QUALIFIER_REGEX.exec(text))) hits.add(hit[1].toLowerCase());
    if (hits.size === 0) continue;

    errors.push(
      `${relPath}:${lineOf(content, match.index)} "${id}" is a ${type} gated on an unquantified ` +
        `qualifier: ${[...hits].join(", ")}. Nothing can fail it. Name the concrete requirement, ` +
        `demote the clause to prose, or record it in ACKNOWLEDGED_QUALIFIERS with the reason it is ` +
        `quantified in the clause text.`,
    );
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
    const { id, type, toolTip, inline, boundParty } = parseAttrs(attrString);
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

    if (boundParty !== undefined) {
      if (isNonNormative) {
        errors.push(`${at} type="${type}" is non-normative and binds nobody; remove "boundParty"`);
      } else if (!BOUND_PARTIES.has(boundParty)) {
        errors.push(
          `${at} boundParty "${boundParty}" is not one of provider, consumer, both ` +
            `(omit it for the provider default)`,
        );
      }
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

  return errors
    .concat(findMixedStrengthPairs(filePath, content))
    .concat(findDanglingReferences(filePath, content))
    .concat(findVagueQualifiers(filePath, content));
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
