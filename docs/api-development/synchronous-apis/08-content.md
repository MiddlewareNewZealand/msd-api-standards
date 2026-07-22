---
title: "Content"
---

## **Formats**

<Standard id="MSDAS_SHOULD_REST_APIS_DEFAULT_RETURN_CONTENT" type="SHOULD">
REST APIs SHOULD, by default, return content in JSON format, and SHOULD be human- and machine-readable.
</Standard>

<Standard id="MSDAS_MUST_RESPONSE_FORMAT_GET_REQUEST_INDICATED" type="MUST">
The response format for a GET request MUST be indicated by the consumer using the Accept header; the request format for POST/PUT MUST be indicated using the Content-Type header.
</Standard>

Where JSON is used, it <Standard inline id="MSDAS_MUST_JSON_CONFORM_RFC_7159" type="MUST" toolTip="Where JSON is used, it must conform to RFC 7159.">MUST</Standard> conform to RFC 7159. Textual content <Standard inline id="MSDAS_SHOULD_TEXTUAL_CONTENT_UTF8_ENCODED" type="SHOULD" toolTip="Textual content should be UTF-8 encoded.">SHOULD</Standard> be UTF-8 encoded. Binary data such as images <Standard inline id="MSDAS_SHOULD_NOT_BINARY_DATA_RETURNED_DIRECTLY" type="SHOULD NOT" toolTip="Binary data such as images should not be returned directly in API responses — prefer a hyperlink to the image instead.">SHOULD NOT</Standard> be returned directly in API responses — prefer a hyperlink to the image instead.

## **Layout**

<Standard id="MSDAS_SHOULD_RESPONSES_JSON_OBJECT_BARE_ARRAY" type="SHOULD">
Responses SHOULD be a JSON object (not a bare array) by default, so metadata and additional top-level properties can be added later without breaking consumers.
</Standard>

```json
// Good layout
{
  "responseMetadata": { "totalCount": 2 },
  "clients": [
    { "id": "12345", "status": "active" },
    { "id": "67890", "status": "active" }
  ]
}
```

## **JSON property names**

- Property names <Standard inline id="MSDAS_SHOULD_PROPERTY_NAMES_MEANINGFUL_DEFINED_SEMANTICS" type="SHOULD" toolTip="Property names should be meaningful, with defined semantics.">SHOULD</Standard> be meaningful, with defined semantics.

- Property names <Standard inline id="MSDAS_MUST_PROPERTY_NAMES_CAMEL_CASE_ASCII" type="MUST" toolTip="Property names must be camel-case ASCII strings, e.g. exampleProperty.">MUST</Standard> be camel-case ASCII strings, e.g. exampleProperty.

- The first character <Standard inline id="MSDAS_MUST_PROPERTY_FIRST_CHARACTER_LETTER_UNDERSCORE" type="MUST" toolTip="The first character of a property name must be a letter or underscore.">MUST</Standard> be a letter or underscore.

- Reserved JavaScript keywords <Standard inline id="MSDAS_SHOULD_RESERVED_JAVASCRIPT_KEYWORDS_AVOIDED" type="SHOULD" toolTip="Reserved JavaScript keywords should be avoided in property names.">SHOULD</Standard> be avoided.

## **Consistency**

- Preserve backwards compatibility by returning expected fields and sensible defaults for missing fields.

- Keep terminology consistent throughout, e.g. don't repurpose a 'status' field to mean something different between resources.

## **Singletons vs. collections**

A single-item GET (e.g. /clients/12345) returns the fundamental details of that resource; a collection GET (e.g. /clients) returns an array plus related metadata. If a queried collection legitimately has no results (e.g. no appointments scheduled for a given client), the correct response is 200 with an empty array — not 404.

<Standard id="MSDAS_SHOULD_NOT_COLLECTION_RESOURCES_CONTAIN_BINARY_ATTACHMENTS" type="SHOULD NOT">
Collection resources SHOULD NOT contain binary attachments or other content that would lead to large response payloads.
</Standard>

## **HATEOAS**

Hypermedia as the Engine of Application State (HATEOAS) is the principle of returning not just the requested data, but links to related, useful transitions — for example, a client record returning links to that client's entitlements and appointments, rather than embedding stale copies of that data. This reduces the risk of consumers holding cached, out-of-date embedded data, and allows front-ends to adapt automatically as new capabilities are added.

```json
{
  "clientId": "d9e1a2f6-...",
  "name": "Aroha Ngata",
  "_links": [
    { "rel": "self", "href": "https://api.msd.govt.nz/clients/d9e1a2f6-..." },
    { "rel": "entitlements", "href": "https://api.msd.govt.nz/clients/d9e1a2f6-.../entitlements" },
    { "rel": "appointments", "href": "https://api.msd.govt.nz/clients/d9e1a2f6-.../appointments" }
  ]
}
```
