import { parse } from "node-html-parser";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Tooltip } from "react-tooltip";
import useBrokenLinks from "@docusaurus/useBrokenLinks";

const extractText = (Component) => {
  const markup = ReactDOMServer.renderToStaticMarkup(Component);
  const root = parse(markup);
  return root.text;
};

// RFC 2119 keyword -> canonical group. The canonical group drives the Checklist
// grouping, the id prefix and the colour class. Synonyms display their own word
// but are treated as their RFC parent (e.g. REQUIRED behaves as MUST).
const CANONICAL_TYPE = {
  MUST: "MUST",
  "MUST NOT": "MUST NOT",
  REQUIRED: "MUST",
  SHALL: "MUST",
  "SHALL NOT": "MUST NOT",
  SHOULD: "SHOULD",
  "SHOULD NOT": "SHOULD NOT",
  RECOMMENDED: "SHOULD",
  "NOT RECOMMENDED": "SHOULD NOT",
  MAY: "MAY",
  OPTIONAL: "MAY",
};

// Non-normative callout keywords. These render as neutral boxes and are NOT
// extracted into the Checklist (no data-standard-type / anchor required).
const NON_NORMATIVE = new Set(["INFO", "EXAMPLE", "NOTE"]);

// Which party a clause binds. The catalog is consumed as a provider-side
// conformance contract, so "provider" is the default and only the exceptions
// need declaring. A consumer-bound clause cannot be assessed by running tests
// against a provider endpoint, and a tool that claims otherwise overclaims.
const BOUND_PARTIES = new Set(["provider", "consumer", "both"]);

// Shown in the tooltip so a reader of the page — not just of the JSON — can see
// that a clause is not the provider's to satisfy. Omitted for "provider".
const BOUND_PARTY_LABEL = {
  consumer: "Binds the API Consumer",
  both: "Binds both the API Provider and the API Consumer",
};

// Canonical group -> colour modifier class suffix.
const COLOUR_CLASS = {
  MUST: "must",
  "MUST NOT": "must",
  SHOULD: "should",
  "SHOULD NOT": "should",
  MAY: "may",
};

/**
 * Represents an API standard element.
 *
 * @param {Object} props - The properties for the API standard element.
 * @param {string} props.id - The unique identifier for the API standard, in an upper-snake-case format, e.g. MSDAS_MUST_NOT_X_NOTATION_HEADERS. The id prefix uses the canonical RFC group (e.g. a REQUIRED standard is MSDAS_MUST_...). Optional for non-normative (INFO/EXAMPLE/NOTE) boxes.
 * @param {string} props.type - The RFC 2119 keyword to display, e.g. "MUST", "MUST NOT", "REQUIRED", "RECOMMENDED", or a non-normative "INFO"/"EXAMPLE"/"NOTE".
 * @param {string} props.toolTip - The plain extended text used in the Checklist page and conformance tooling. Required for inline usage (where the children are just the keyword word). For box usage it defaults to the children text.
 * @param {boolean} props.inline - When true, renders the keyword inline within a sentence (red + bold, anchored) instead of a standalone box.
 * @param {string} props.boundParty - Which party the clause obliges: "provider" (default), "consumer", or "both". Emitted into the Checklist JSON so conformance tooling can filter to the clauses its target is accountable for.
 * @returns {JSX.Element} The JSX element representing the API standard.
 *
 * @example
 * // Standalone box:
 * <Standard id="MSDAS_MUST_NOT_X_NOTATION_HEADERS" type="MUST NOT">Providers must not use X- notation headers</Standard>
 *
 * // Inline keyword within a sentence:
 * API Keys <Standard inline id="MSDAS_MUST_API_KEYS_USED" type="MUST" toolTip="API Keys must be used wherever system-to-system authentication is needed.">must</Standard> be used wherever system-to-system authentication is needed.
 *
 * // Clause the API Consumer has to satisfy, not the provider:
 * <Standard id="MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS" type="MUST" boundParty="consumer">API Consumer applications must validate TLS certificate chains…</Standard>
 */

function Standard({ id, type, toolTip, inline, boundParty = "provider", children }) {
  if (children === undefined) {
    throw new Error(
      "Error in rendering Standard component; please check the format for " + id
    );
  }

  const isNonNormative = NON_NORMATIVE.has(type);
  const canonicalType = CANONICAL_TYPE[type];

  if (!isNonNormative && canonicalType === undefined) {
    throw new Error(
      `Unknown Standard type "${type}" for ${id}; expected an RFC 2119 keyword or INFO/EXAMPLE/NOTE.`
    );
  }

  if (inline && toolTip === undefined) {
    throw new Error(
      `Inline Standard ${id} requires an explicit toolTip giving the full normative statement.`
    );
  }

  if (!BOUND_PARTIES.has(boundParty)) {
    throw new Error(
      `Unknown boundParty "${boundParty}" for ${id}; expected "provider", "consumer" or "both".`
    );
  }

  if (toolTip === undefined) {
    toolTip = extractText(children);
  }

  // Non-normative boxes are excluded from the Checklist and don't require an anchor.
  const brokenLinks = useBrokenLinks();
  if (id) {
    brokenLinks.collectAnchor(id);
  }

  const colourClass = isNonNormative ? "info" : COLOUR_CLASS[canonicalType];

  const boundPartyLabel = isNonNormative ? undefined : BOUND_PARTY_LABEL[boundParty];

  const [tooltipContent] = useState(`
    <div>
      <div><strong>${id ?? type}</strong></div>
      <div>${toolTip}</div>
      ${boundPartyLabel ? `<div><em>${boundPartyLabel}</em></div>` : ""}
    </div>
  `);

  // Attributes carried by the anchored keyword element. Normative keywords carry
  // the extraction data attributes; non-normative boxes deliberately omit them so
  // scripts/extractStandards.js skips them.
  const keywordProps = {
    id: id,
    "data-tooltip-id": id,
    "data-tooltip-html": id ? tooltipContent : undefined,
    ...(isNonNormative
      ? {}
      : {
          "data-standard-type": canonicalType,
          "data-extended-text": toolTip,
          "data-bound-party": boundParty,
        }),
  };

  if (inline) {
    return (
      <>
        <span
          className="standard-inline"
          tabIndex={0}
          role="button"
          aria-label={toolTip}
          {...keywordProps}
        >
          {children}
        </span>
        {id ? <Tooltip id={id} place="bottom" /> : null}
      </>
    );
  }

  return (
    <div className={`standard standard--${colourClass}`}>
      <span className="standard__keyword" {...keywordProps}>
        {type}
      </span>
      <div className="standard__prose">{children}</div>
      {id ? <Tooltip id={id} place="bottom" /> : null}
    </div>
  );
}

export default Standard;
