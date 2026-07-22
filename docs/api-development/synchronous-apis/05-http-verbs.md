---
title: "HTTP Verbs"
---

<Standard id="MSDAS_MUST_ACCESS_REST_APIS_VIA_STANDARD" type="MUST">
Access to REST APIs MUST be via the standard HTTP verbs: GET, PUT, POST, DELETE, in line with the W3C Standard.
</Standard>

| Verb | Common usage |
| --- | --- |
| GET | Retrieval of information. Use where the interaction is a safe, read-only operation such as a query. |
| POST | Create a resource, or trigger an action. Use where the interaction changes resource state in a way the consumer would perceive, or where the consumer should be held accountable for the result. |
| PUT | Update or replace an existing resource item. |
| DELETE | Delete a resource item. |
| OPTIONS | Retrieve information about what the consumer is allowed to do with a resource. |
| PATCH | Not recommended, due to complexity. |
| HEAD | Rarely used; retrieves metadata about a resource. |

## **GET**

GET is used for retrieval of information — where the interaction is more like a question, i.e. a safe, idempotent operation such as a query. GET returns a representation in JSON with an HTTP 200 (OK) on success, or 404 (NOT FOUND) if the resource doesn't exist.

<Standard id="MSDAS_MUST_NOT_DO_EXPOSE_UNSAFE_OPERATIONS_VIA" type="MUST NOT">
Do not expose unsafe operations via GET — it should never modify any resources on the server.
</Standard>

### **GET example**

```http
# Request
GET "https://api.msd.govt.nz/clients/12345"
Accept: application/json,version=1.*
Host: api.msd.govt.nz

# Success response
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 12345,
  "names": {
    "firstName": "Aroha",
    "lastName": "Ngata"
  },
  "caseManager": {
    "id": "CM4021",
    "office": "Porirua Service Centre"
  }
}
```

## **POST**

POST is used to create a resource, or to spawn an action — for example, opening a new case, or submitting an application for assistance. POST is neither safe nor idempotent: repeating the same POST request will typically create a second resource. On successful creation, POST returns HTTP 201 with a Location header pointing to the new resource.

### **POST example**

```http
# Create a new client appointment
POST https://api.msd.govt.nz/clients/12345/appointments

{
  "dateTime": "2026-08-04T10:00:00.000Z",
  "type": "case-review",
  "caseManagerId": "CM4021"
}

# Successful creation response
HTTP/1.1 201 Created
Location: https://api.msd.govt.nz/clients/12345/appointments/9a1b2c3d
```

## **PUT**

PUT is used to update or replace an existing resource item, and, less commonly, to create a resource where the consumer chooses the resource ID. PUT is not safe but is idempotent — calling it repeatedly with the same body leaves the resource in the same state.

<Standard id="MSDAS_MUST_API_PROVIDERS_API_CONSUMERS_DESIGN" type="MUST">
API Providers and API Consumers MUST design APIs that are PUT tolerant, and be aware of the race condition this can expose when two consumers update the same resource concurrently.
</Standard>

This is commonly handled through optimistic or pessimistic concurrency control — see Versioning APIs, Resource Version Control.

## **DELETE**

DELETE removes a resource identified by a URI. DELETE operations are idempotent: repeated calls leave the resource deleted, though a second call may return 404 rather than 200/204 since the resource is already gone.

## **OPTIONS**

OPTIONS retrieves information about what the consumer is allowed to do with a resource, and is predominantly used by single-page application front-ends performing pre-flight checks.

## **Other verbs**

### **PATCH**

PATCH is a valid HTTP verb but its use is discouraged due to complexity, except where an adopted standard (such as a specific integration profile) explicitly supports safe PATCH semantics.

### **HEAD**

<Standard id="MSDAS_MUST_NOT_RESPONSE_HEAD_REQUEST_CONTAIN_BODY" type="MUST NOT">
The response to a HEAD request MUST NOT contain a body. If a response body is returned it MUST be ignored.
</Standard>
