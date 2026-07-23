---
title: "Search APIs"
---

Search capability is an important component of many REST APIs, used to find resources within a collection (see Content, Singletons vs. collections) that meet the API Consumer's requirements. There are two common ways to search a collection: GET with query parameters, or POST with query parameters in a request body. Both are supported by this standard, but the choice carries real security implications.

| Aspect | GET | POST |
| --- | --- | --- |
| Description | Retrieve resources from a collection matching parameters in a query string, e.g. GET /clients?status=active | Retrieve resources from a collection matching parameters in a request body, e.g. `POST /clients {"status":"active"}` |
| Considerations | Generally considered less secure than POST, since components in the HTTP(S) path (browsers, proxy servers) can log or cache full URLs. Very complex searches may hit URL/query-string length limits (server- and client-dependent, e.g. ~8KB Apache, ~16KB IIS, ~2KB in many browsers) — if this happens, POST SHOULD be used instead. | Generally considered more secure, since request-body parameters are encrypted in transit under HTTPS, preventing intermediary components from decrypting and logging them. Use when the search query itself contains sensitive or personal identifying information. |

<Standard id="MSDAS_MUST_NOT_SEARCH_QUERY_PARAMETERS_CONTAIN_PERSONAL" type="MUST NOT">
Search query parameters MUST NOT contain personal identifiable or sensitive information, e.g. GET /clients?lastName=Ngata&mobileNumber=0221112222.
</Standard>

<Standard id="MSDAS_MUST_POST_MECHANISM_USED_SENSITIVE_SEARCH" type="MUST">
Where the POST mechanism is used for a sensitive search, the API MUST have a distinct search resource (e.g. /clients/_search) so the API can clearly distinguish a search from a resource-creation request.
</Standard>

Template: `POST /{version}/{namespace}/{search-resource}`

```http
POST /v1/clients/client-search?page=5 HTTP/1.1
Host: api.msd.govt.nz
Content-Type: application/json

{
  "region": "Wellington",
  "caseStatus": "open",
  "assignedServiceCentre": "Porirua"
}

# Response
HTTP/1.1 200 OK

{
  "pageSize": 10,
  "page": 5,
  "totalItems": 77,
  "totalPages": 8,
  "items": [ "...client summary objects here..." ],
  "_links": [
    { "rel": "first", "href": "https://api.msd.govt.nz/v1/clients/client-search?page=1" },
    { "rel": "prev", "href": "https://api.msd.govt.nz/v1/clients/client-search?page=4" },
    { "rel": "next", "href": "https://api.msd.govt.nz/v1/clients/client-search?page=6" },
    { "rel": "last", "href": "https://api.msd.govt.nz/v1/clients/client-search?page=8" }
  ]
}
```

Search inputs are a common target for injection attacks, and the correct defence is to use the parameterisation and sanitisation mechanisms provided by the platform's own data access and templating libraries, rather than attempting to detect malicious input by matching against specific characters or keywords — text-matching approaches are trivially bypassed (e.g. case variation, encoding, alternative syntax) and produce false positives against legitimate content (a client's name or address may legitimately contain characters that overlap with blocklisted patterns).

<Standard id="MSDAS_MUST_DATA_ACCESS_CODE_USE_PARAMETERISED_QUERIES" type="MUST">
Data access code MUST use parameterised queries or an equivalent safe data-access mechanism
</Standard>

This applies to any user-supplied input reaching a data store (e.g. parameterised `SqlCommand`/Entity Framework in .NET, prepared statements in JDBC, parameterised ORM queries). Concatenating user input directly into a query string, in any form, <Standard inline id="MSDAS_MUST_NOT_CONCATENATING_USER_INPUT_QUERY_STRING" type="MUST NOT" toolTip="Concatenating user input directly into a query string, in any form, must not be used; use parameterised queries or an equivalent safe data-access mechanism.">MUST NOT</Standard> be used.

<Standard id="MSDAS_MUST_OUTPUT_RENDERED_USE_NATIVE_ENCODING" type="MUST">
Output rendered into any HTML, script, or markup context MUST be encoded using the rendering framework's built-in output-encoding mechanism
</Standard>

The specific encoding used <Standard inline id="MSDAS_MUST_OUTPUT_ENCODING_APPROPRIATE_TO_CONTEXT" type="MUST" toolTip="The specific output encoding used must be appropriate to the context (HTML body, attribute, URL, JavaScript) it is rendered into.">MUST</Standard> be appropriate to the context (HTML body, attribute, URL, JavaScript) it's rendered into. See the OWASP SQL Injection Prevention and Cross-Site Scripting Prevention Cheat Sheets for library-specific guidance.

Pagination behaviour <Standard inline id="MSDAS_SHOULD_PAGINATION_BEHAVIOUR_CONSISTENT" type="SHOULD" toolTip="Pagination behaviour should be consistent with the interaction described in URIs and Query Arguments, and can be implemented as page number/size, offset/limit, or a continuation token.">SHOULD</Standard> be consistent with the interaction described in URIs, Query Arguments, and can be implemented as page number/size, offset/limit, or a continuation token, depending on the scale and volatility of the search results. Since the HTTP protocol treats POST as unsafe, POST search results aren't cacheable — even with a Cache-Control header present — so consider the performance impact for high-volume search operations.
