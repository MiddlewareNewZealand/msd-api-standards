---
title: HTTP Headers
---
## **Request headers**

| Header | Usage | Requirement |
| --- | --- | --- |
| Accept | Desired response format. 406 if unsupported. | MUST |
| Content-Type | Format of the request payload. 415 if unsupported. | MUST (POST/PUT) |
| Authorization | Authorization type and token. 401 if invalid. | MUST, unless a public API |
| Accept-Encoding | Compression the consumer can accept. | SHOULD |
| API Key header | Sent with every request, if API keys are used. | MUST, if issued |
| If-Modified-Since / If-None-Match | Conditional request handling; 304 if unchanged. | SHOULD |
| Request tracking header | Unique identifier to trace a request across its lifecycle. | SHOULD |

## **Response headers**

| Header | Usage | Requirement |
| --- | --- | --- |
| Content-Type | Format of the response. | MUST |
| Location | Absolute URI of a newly created resource, or redirect target. | MUST for 201/30x |
| Content-Location | Absolute URI of the requested resource. | SHOULD |
| Cache-Control | Directives controlling caching outside the API layer. | SHOULD |
| Expires | Used with Cache-Control for backward compatibility. | SHOULD |
| ETag | Concurrency control tag. | SHOULD |

## **Custom headers**

<Standard id="MSDAS_SHOULD_NOT_X_NOTATION_HEADERS_DEPRECATED_PER" type="SHOULD NOT">
X- notation headers are deprecated per RFC 6648 and SHOULD NOT be used. Define a plain custom header name instead (e.g. Request-Id rather than X-Request-Id).
</Standard>

## **Distributed tracing**

A single client-initiated request often triggers a chain of internal calls across multiple services — API Gateway, backend application, downstream partner system. Without a consistent tracing mechanism, diagnosing where in that chain a failure or slowdown occurred becomes guesswork, particularly across the service and organisational boundaries typical of MSD's delivery-partner integrations.

<Standard id="MSDAS_SHOULD_APIS_PROPAGATE_DISTRIBUTED_TRACING_CONTEXT" type="SHOULD">
APIs SHOULD propagate distributed tracing context using the W3C Trace Context standard
</Standard>

This is done via the `traceparent` header (carrying the trace ID, parent span ID, and trace flags) and, where needed, the `tracestate` header (vendor-specific tracing system state). Where an incoming request carries a `traceparent` header, it <Standard inline id="MSDAS_MUST_TRACEPARENT_HEADER_PROPAGATED_UNCHANGED" type="MUST" toolTip="Where an incoming request carries a traceparent header, it must be propagated unchanged to any downstream calls made in the course of handling that request, with a new span ID generated for each hop.">MUST</Standard> be propagated unchanged to any downstream calls made in the course of handling that request, with a new span ID generated for each hop.

<Standard id="MSDAS_SHOULD_APIS_GENERATE_TRACEPARENT_HEADER_WHEN_ABSENT" type="SHOULD">
Where an incoming request has no `traceparent` header, the API SHOULD generate one and propagate it downstream
</Standard>

This ensures a trace exists even when the originating consumer doesn't support tracing itself. This is distinct from the Request tracking header referenced earlier in this section: a request-tracking ID identifies one request/response pair for logging and support purposes, while a trace ID identifies the whole causally-related chain of calls that request triggered.

## **Authorization**

Most API requests are authorised via the Authorization header. If an API Key header isn't used, the Authorization token <Standard inline id="MSDAS_MUST_AUTHORIZATION_TOKEN_IDENTIFY_API_CONSUMER" type="MUST" toolTip="If an API Key header is not used, the Authorization token must identify the API Consumer via an attribute within the token.">MUST</Standard> identify the API Consumer via an attribute within the token.

```http
# OAuth 2.0 Access Token (Opaque)
Authorization: Bearer x6TLB4JaomezC5rJ3CIl3KxxNinq

# OAuth 2.0 Access Token (Client-based JWT)
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9...
```

## **Cache-Control**

<Standard id="MSDAS_MUST_ENSURE_APIS_PERFORM_AT_SCALE" type="MUST">
To ensure APIs perform at scale, the Cache-Control header MUST be used.
</Standard>

Key directives: private/public (whether the response may be cached in a shared cache), no-cache, no-store, max-age, s-max-age, must-revalidate and proxy-revalidate. See Caching for MSD-specific guidance on response and object caching.
