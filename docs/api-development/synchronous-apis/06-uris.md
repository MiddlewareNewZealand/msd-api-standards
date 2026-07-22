---
title: "Uniform Resource Identifiers (URI)"
---

URI construction matters: it's the door through which consumers access API resources, and should be intuitive enough that a developer can guess what an endpoint does just from the URI and HTTP verb.

<Standard id="MSDAS_SHOULD_ENDPOINT_URLS_ADVERTISE_RESOURCES_AVOID" type="SHOULD">
Endpoint URLs SHOULD advertise resources, and avoid verbs.
</Standard>

## **URI structure**

| Level | Name | Cardinality |
| --- | --- | --- |
| 0 | [basePath] | 1..1 MUST be provided |
| 1 | namespace | 0..1 SHOULD be provided |
| 2 | version | 0..1 MAY be provided |
| 3 | resource | 1..1 MUST be provided |
| 4 | resource-id | 0..1 MUST be provided when interacting with a resource instance |
| 5 | sub-resource | 0..1 MUST be provided when interacting with a sub-resource |
| 6 | sub-resource-id | 0..1 MUST be provided when interacting with a sub-resource instance |

Examples: [basePath]/v2/clients/33245/entitlements, [basePath]/v1/case-managers/43265/caseloads

## **API offering**

<Standard id="MSDAS_SHOULD_URL_MAKES_CLEAR_ITS_API" type="RECOMMENDED">
It's recommended that the URL makes it clear that it's an API, e.g. https://api.msd.govt.nz or https://msd.govt.nz/api.
</Standard>

## **Version**

Header-based versioning is recommended (see Versioning APIs); however, where API infrastructure doesn't readily support it, URL-based versioning is a viable alternative.

<Standard id="MSDAS_SHOULD_URL_BASED_VERSIONING_URI_INCLUDE" type="SHOULD">
For URL-based versioning, the URI SHOULD include /vN with the major version (N) and v as a prefix. APIs SHOULD NOT include minor version numbers in the path.
</Standard>

```http
# Get details for client id 12345 – version 1 of the API
GET https://api.msd.govt.nz/v1/clients/12345

# Get details for client id 12345 – version 2 of the API
GET https://api.msd.govt.nz/v2/clients/12345
```

## **Namespaces**

MSD API Providers may hold multiple responsibilities that can result in overlapping resource naming (for example, “case” could mean different things across employment services and care and protection). It's recommended that namespaces be used to avoid ambiguity.

<Standard id="MSDAS_SHOULD_NAMESPACE_FIRST_NOUN_URI_REFLECT" type="SHOULD">
The namespace SHOULD be the first noun in the URI and SHOULD reflect the function being offered by the API, e.g. /v1/employment-services/.
</Standard>

## **Resources and sub-resources**

<Standard id="MSDAS_SHOULD_RESOURCE_NAMES_NOUN_BASED_LOWER" type="SHOULD">
Resource names SHOULD be noun-based, lower case and plural for collections, e.g. /clients. Naming SHOULD be short, simple and human-guessable, avoiding technical or specialist jargon.
</Standard>

<Standard id="MSDAS_MUST_SUB_RESOURCES_APPEAR_UNDER_RESOURCE" type="MUST">
Sub-resources MUST appear under the resource they relate to (/resource/id/sub-resource/id), and SHOULD go no more than three levels deep.
</Standard>

Example: `https://api.msd.govt.nz/v2/clients/33245/entitlements/E100782`

### **Sub-resource ownership**

A URI resolving successfully doesn't confirm that a sub-resource actually belongs to the parent resource in the path, or that the requesting user is authorised to access both — for example, `/clients/33245/entitlements/E100782` returning a 200 doesn't by itself guarantee entitlement `E100782` belongs to client `33245`, rather than to a different client entirely.

<Standard id="MSDAS_MUST_API_IMPLEMENTATION_VERIFY_SUBRESOURCE_OWNERSHIP" type="MUST">
The API implementation MUST verify both that the requested sub-resource genuinely belongs to the specified parent resource, and that the authenticated caller is authorised to access both, before returning a response.
</Standard>

A sub-resource request for a resource the caller isn't authorised to access <Standard inline id="MSDAS_MUST_SUB_RESOURCE_UNAUTHORISED_TREATED_AS_404" type="MUST" toolTip="A sub-resource request for a resource the caller is not authorised to access must be treated as if the resource does not exist (404), not as a distinct authorisation failure (403).">MUST</Standard> be treated as if the resource doesn't exist (404), not as a distinct authorisation failure (403) that would confirm the resource's existence to an unauthorised caller — see Error Handling.

This check is typically an **application-layer concern, not a gateway concern**: it usually requires a state lookup (confirming the actual parent-child relationship in the underlying data) that an API Gateway, operating only on the URI and token, isn't positioned to perform. Gateway-level authorisation (see Part B: API Security) can confirm a caller is allowed to call the *endpoint*; it generally can't confirm the caller is allowed to access *this specific instance* of a sub-resource. That confirmation has to happen in the API implementation itself, at the point it resolves the relationship.

## **Word separation**

<Standard id="MSDAS_SHOULD_PATH_QUERY_STRING_PARAMETERS_LOWER" type="SHOULD">
Path and query string parameters SHOULD be lower case with hyphen separators for multiword names, e.g. /v1/case-notes?sort-order=asc.
</Standard>

## **Query arguments**

Query arguments filter or modify a result set. The general rule: if it changes the behaviour of the result set, it <Standard inline id="MSDAS_SHOULD_PARAMETER_RESULT_SET_QUERY_ARGUMENT" type="SHOULD" toolTip="If a parameter changes the behaviour of the result set, it should be a query argument.">SHOULD</Standard> be a query argument; if it changes the behaviour of the API, it <Standard inline id="MSDAS_SHOULD_PARAMETER_API_BEHAVIOUR_IN_PATH" type="SHOULD" toolTip="If a parameter changes the behaviour of the API, it should be in the path.">SHOULD</Standard> be in the path.

- Sorting or ordering — e.g. sort-order=ascending

- Pagination — the response <Standard inline id="MSDAS_SHOULD_RESPONSE_POINT_CONSUMERS_PAGINATION_LINKS" type="SHOULD" toolTip="For pagination, the response should point consumers to previous/next result pages using hypermedia links.">SHOULD</Standard> point consumers to previous/next result pages using hypermedia links (see Content, HATEOAS)

- Field selection — e.g. filtering a client record down to specific fields; use sparingly, and consider GraphQL where this flexibility is a core requirement
