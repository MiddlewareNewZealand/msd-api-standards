---
title: "Error Handling"
---

API Consumers see an API as a black box; when something goes wrong they need clear, actionable information — without the response leaking details about the provider's internal systems.

<Standard id="MSDAS_MUST_ERROR_OCCURS_RESPONSE_BODY_CONTAIN" type="MUST">
When an error occurs, the response body MUST contain: the HTTP status code; an API-specific error code that support staff can look up; and a human-readable error message.
</Standard>

## **HTTP status codes**

| Code | Meaning | Typical use |
| --- | --- | --- |
| 200 | OK | Successful GET, or successful PUT with response body |
| 201 | Created | Successful POST that created a resource |
| 204 | No Content | Successful request with no response body (e.g. DELETE) |
| 207 | Multi-Status | Bulk operation with mixed per-item results |
| 304 | Not Modified | Cached representation is still current |
| 400 | Bad Request | Request failed validation |
| 401 | Unauthorized | Credentials missing or insufficient |
| 404 | Not Found | Requested resource doesn't exist |
| 422 | Unprocessable Content | Request understood but cannot be processed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unhandled provider-side error |
| 503 | Service Unavailable | Temporary outage; retry later |

## **Error schema**

<Standard id="MSDAS_MUST_API_PROVIDERS_DOCUMENT_ERRORS_MACHINE" type="MUST">
API Providers MUST document their errors in a machine-readable schema, published as part of the OpenAPI specification.
</Standard>

```http
# HTTP 400

{
  "errors": [
    { "code": 20001, "description": "Request validation failed. Please contact support." }
  ],
  "_links": [ { "rel": "support", "href": "https://support.msd.govt.nz" } ]
}
```

Human-readable error messages <Standard inline id="MSDAS_SHOULD_ERROR_MESSAGES_INFORMATIVE_WITHOUT_INTERNAL_DETAILS" type="SHOULD" toolTip="Human-readable error messages should be informative without exposing internal system details (component names, stack traces) that could help a malicious actor.">SHOULD</Standard> be informative without exposing internal system details (component names, stack traces) that could help a malicious actor, and <Standard inline id="MSDAS_MUST_NOT_ERROR_MESSAGES_CONFIRM_DENY_SENSITIVE" type="MUST NOT" toolTip="Human-readable error messages must not confirm or deny sensitive information such as whether a specific client ID exists.">MUST NOT</Standard> confirm or deny sensitive information such as whether a specific client ID exists.
