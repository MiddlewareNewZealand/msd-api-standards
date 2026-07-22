---
title: "Bulk APIs"
---

## **Bulk API handling**

<Standard id="MSDAS_SHOULD_NOT_APIS_DESIGNED_LARGE_PAYLOADS_I" type="SHOULD NOT">
APIs SHOULD NOT be designed for large payloads — i.e. bulk handling for retrieving or uploading batches of data. APIs are geared towards stateless, usually synchronous, web-like CRUD requests for individual discrete data transactions.
</Standard>

<Standard id="MSDAS_MAY_BULK_HANDLING_ACHIEVED_BUNDLING_MULTIPLE" type="MAY">
Bulk handling MAY be achieved by bundling multiple sub-requests into the same API invocation. This can help achieve logical grouping of similar requests, atomicity of transactions, and recoverability in the event of errors.
</Standard>

When handling bulk requests, consider troubleshooting and recovery: log all sub-requests with accurate timestamps so monitoring tools can visualise transaction progress.

<Standard id="MSDAS_MUST_SUB_REQUEST_IDENTIFIERS_BULK_CALLS" type="REQUIRED">
Sub-request identifiers (see HTTP Headers, Request headers) are REQUIRED in bulk API calls, to ensure sub-requests are traceable end-to-end.
</Standard>

Where legacy system impact is a concern, it may be appropriate to provide an asynchronous batch capability instead — for example, bulk creation of client records from a batch event in a consuming legacy application. It's preferable for the consuming application to treat each record as a unique event and POST it individually, since this lets each success or error be handled in its own right and reported back to the consumer. Where that's not possible due to a system constraint, multiple records may be POSTed together asynchronously; this type of interaction <Standard inline id="MSDAS_SHOULD_NOT_BULK_ASYNC_INTERACTION_ATTEMPTED_SYNCHRONOUSLY" type="SHOULD NOT" toolTip="Where multiple records are POSTed together asynchronously, this type of interaction should not be attempted synchronously, since large batches will tie up HTTP threads and may require client/server timeout handling.">SHOULD NOT</Standard> be attempted synchronously, since large batches will tie up HTTP threads and may require client/server timeout handling.

## **Transactions vs. batches**

Bulk APIs can be transaction-based or batch-based, and the two behave differently on partial failure. With a transaction API, sub-requests are treated as a single transaction: if one sub-request fails, all sub-requests are typically rolled back, preserving atomicity. With a batch API, sub-requests are treated as an independent collection: if one fails, the others typically continue processing regardless.

### **Transactions and temporary IDs**

Because sub-requests within a transaction are, by definition, tightly linked, it's common for the identifier from one sub-request to be referenced by a later sub-request in the same call — for example, a new client record referencing another new record in the same transaction as a related party, before either has a real, server-issued identifier.

<Standard id="MSDAS_SHOULD_SUB_REQUEST_IDENTIFIER_TEMPORARY_CLIENT" type="SHOULD">
The sub-request identifier (a temporary, client-assigned bulkId) SHOULD be used for cross-references between sub-requests within a transaction. The server replaces this with the real, server-side resource identifier once the record is created. In a batch call, by contrast, cross-references must use identifiers already known ahead of time, since sub-requests aren't guaranteed to succeed or process together.
</Standard>

### **Example: transaction vs. batch response**

The requests for a transaction and a batch bulk call look very similar; the response is the key differentiator. A transaction response returns HTTP 400 if any sub-request fails, since the whole job is rolled back and the consumer must fix and resubmit the entire request:

```http
HTTP/1.1 400 Bad Request

{
  "items": [
    { "bulkId": 1, "id": 1, "status": 201, "errors": [] },
    { "bulkId": 2, "id": 2, "status": 400, "errors": [
      { "code": 400, "description": "Request contains invalid data..." }
    ] }
  ]
}
```

A batch response returns HTTP 207 (Multi-Status), since some sub-requests may have succeeded even though others failed; the consumer is responsible for resubmitting only the failed items:

```http
HTTP/1.1 207 Multi-Status

{
  "items": [
    { "batchId": 1, "id": 1, "status": 201, "errors": [] },
    { "batchId": 2, "id": 2, "status": 400, "errors": [
      { "code": 400, "description": "Request contains invalid data..." }
    ] }
  ]
}
```

## **Asynchronous transactions**

Where intended bulk payloads are too large for timely synchronous processing, the API <Standard inline id="MSDAS_SHOULD_API_SUPPORT_JSON_SEQ_CONTENT_TYPE" type="SHOULD" toolTip="Where intended bulk payloads are too large for timely synchronous processing, the API should support the application/json-seq Content-Type, indicating the JSON payload is a sequenced data set.">SHOULD</Standard> support the application/json-seq Content-Type, indicating the JSON payload is a sequenced data set. The API can then process each record individually and respond asynchronously with a Location header pointing to the transaction's process detail/status — following the same pattern as State in process APIs, above.
