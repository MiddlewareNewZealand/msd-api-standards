---
title: "Versioning APIs"
---

## **Semantic versioning**

MSD APIs <Standard inline id="MSDAS_SHOULD_FOLLOW_SEMANTIC_VERSIONING" type="SHOULD" toolTip="MSD APIs should follow semantic versioning, e.g. 3.2.5, where the MAJOR number changes on breaking changes, the MINOR number on backward-compatible additions, and the PATCH number on bug fixes or security remediations that introduce no new functionality.">SHOULD</Standard> follow semantic versioning, e.g. 3.2.5, where the MAJOR number changes on breaking changes, the MINOR number on backward-compatible additions, and the PATCH number on bug fixes or security remediations that introduce no new functionality.

## **Version control mechanism**

<Standard id="MSDAS_MUST_INCLUDE_MAJOR_VERSION_IN_URI" type="MUST">
For URL-based versioning, the URI MUST include `/v{N}` with the major version (N) and v as a prefix.
</Standard>

<Standard id="MSDAS_SHOULD_NOT_INCLUDE_MINOR_VERSION_IN_URI" type="SHOULD NOT">
APIs SHOULD NOT include minor version numbers in the URI path.
</Standard>

```http
GET https://api.msd.govt.nz/clients/v1/search?last-name=Ngata
GET https://api.msd.govt.nz/clients/v2/search?last-name=Ngata
```

The response <Standard inline id="MSDAS_MUST_INDICATE_MAJOR_VERSION_IN_RESPONSE" type="MUST" toolTip="Whichever version control mechanism a request uses, the response must indicate at least the MAJOR version of the API that processed it, via the Content-Type header, e.g. Content-Type: application/json; version=v3.2.5.">MUST</Standard> still indicate at least the MAJOR version of the API that processed the request, via the Content-Type header, e.g. Content-Type: application/json; version=v3.2.5.

## **When to version**

<Standard id="MSDAS_SHOULD_VERSION_ON_BREAKING_CHANGE" type="SHOULD">
An API SHOULD be versioned when a change is breaking.
</Standard>

Breaking changes include: removing a response property; changing a property's data type or making an optional property required; removing a resource or HTTP verb; changing how errors are handled; or changing an existing resource URI.

Non-breaking changes include: adding new properties; adding new resources; adding support for new HTTP verbs on existing resources; and adding new optional headers.

## **Resource version control**

API Providers <Standard inline id="MSDAS_MUST_IMPLEMENT_CONCURRENCY_CONTROL" type="MUST" toolTip="API Providers must implement a concurrency control mechanism to handle situations where two consumers attempt to update the same resource at the same time.">MUST</Standard> implement a concurrency control mechanism to handle situations where two consumers attempt to update the same resource at the same time — for example, two case managers updating the same client record concurrently.

| Feature | Optimistic concurrency | Pessimistic concurrency |
| --- | --- | --- |
| Locks resource before update | No | Yes |
| Checks for conflicts before update | Yes | No |
| Performance when conflicts rare | Good | Poor |
| Performance when conflicts common | Poor | Good |

Optimistic concurrency is typically preferred for MSD APIs due to its simplicity and scalability; pessimistic concurrency should be reserved for cases where data consistency is paramount and conflicts are frequent.
