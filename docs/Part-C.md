---
title: "API Development"
sidebar_label: "API Development"
sidebar_position: 4
---
# Part C: API Development

*DRAFT v0.1*

This section is aimed at API Providers and API Consumers building on MSD's API platform. It provides detailed standards to guide the development of consistent, well-designed APIs, and the rules that consuming applications should follow.

This section is relevant to you if you are an API Provider, API Consumer, API Developer, or Application Developer.

## **Scope**

This section provides high-level standards with design and implementation guidance, along with low-level API best practice, to guide MSD and its delivery partners in the development of APIs.

These standards and guidelines are intended to apply to all API standards and protocols used at MSD, though most of the detailed guidance is oriented towards REST (Representational State Transfer) APIs. Illustrative examples in this section use hypothetical social sector scenarios — clients, case managers, entitlements and appointments — to demonstrate practical application. Examples do not represent MSD's actual API design or data content.

## **Target audience**

The target audience for this section is primarily API designers, API developers and application developers working on technology solutions for MSD and the wider social sector. Compliance and assurance personnel may also be interested, in terms of assessing alignment with these standards.

## **Definition of API**

An API is an interface that enables one software application to communicate with another. Typically the communication protocol of APIs is agnostic, but the APIs and examples in this section are primarily Web APIs — APIs accessible via the http(s) protocol.

## **C.1 Synchronous APIs**

This section covers the design and development of synchronous, request/response-style APIs — typically REST APIs consumed over HTTP.

### **1\. API Design**

This section sets out the standards required to support MSD and its delivery partners in designing, developing and governing APIs. It's aimed at API developers and API designers.

When reading this section, consider the implications for your team. Fundamentally, APIs should make integration with MSD's systems simple, but more importantly consistent. Application developers invest heavily in using an API — in learning its design and behaviour, in developing and testing around it, and sometimes in building an entire service on top of it. Good API design attracts developers and reduces support burden; poor API design drives away developers and drives up support, maintenance and operating costs.

#### **When is an API appropriate?**

The default reaction to a requirement for capability has often been to develop a web application. This is gravitating towards APIs as the default. Below are some situations where an API may be more appropriate than a standalone web application:

* When applications are screen-scraping data from a website

* When MSD holds a single authoritative source of truth for the information

* Where there is a need for real or near-real-time information exchange with a delivery partner

* When parts of a business process are (or may be) outsourced

* When MSD data or a service can be included as part of a larger, cross-agency business process

* When there's a requirement for internal systems to interact with cloud-based SaaS solutions

* Where clients, whānau or providers require easy access to public information

* Where community or delivery partner organisations want to build capability into their own applications that benefits clients (mobile/web apps)

* If other parties are expected to act as agents or intermediaries for services MSD provides

* When multiple service delivery channels are in use

Developing a bespoke application for each of these situations would be expensive and time-consuming. Developing an API instead lets MSD focus on access, quality, integrity and security of its data, while other teams and delivery partners develop applications specific to their own needs. This represents a shift in thinking, from building functionality and applications, to making data available for others to build with.

#### **Types of API**

There are several different types of API, and the type chosen may depend on the technical use case applied to both consumption and provision.

| API type | Description | Requirement |
| :---- | :---- | :---- |
| REST | The most common and well-understood API type; an architectural style for building distributed, hypermedia-driven systems, typically with a strongly typed OpenAPI schema. Best suited to synchronous interactions and resource creation/modification (POST, PUT, DELETE) at medium latency. | MAY support |
| GraphQL | An open query and manipulation language letting consumers request exactly the data they need, avoiding REST's tendency to “over-fetch” a whole resource. Well suited to a widely distributed client set with varying data needs, particularly high-read (GET) clients. | MAY support |
| AsyncAPI (Asynchronous APIs) | An open initiative bringing OpenAPI-style standardisation and tooling to event-driven APIs. Suited to asynchronous interactions, event-driven architectures, and APIs fronting workflows or long-running orchestrations — see Part C.2, Asynchronous APIs. | MAY support |
| gRPC | A high-performance RPC framework using Protocol Buffers by default, letting a client call a method on a remote server as if it were local, via a formal Interface Definition Language. | MUST NOT support |
| SOAP | An XML-based protocol from the late 1990s, still in some use. Suited to stateful operations needing contextual and conversational state management, via the WS\* structure (security, transactions, coordination) — which a REST approach would otherwise require custom-building. | MAY support, but is deprecated for new NZ Government work — see API Development Industry Standards |

| SCOPE The requirements in this table govern the API surface MSD exposes to API Consumers — the protocol a consuming application is required to speak to integrate with an MSD API. They don't reach into the internal implementation of an API Provider's backend. For example, if a platform vendor's internal event-streaming mechanism happens to use gRPC behind the scenes, that's an internal implementation detail of the platform and isn't itself a breach of the gRPC prohibition — the prohibition applies to MSD publishing a gRPC interface for API Consumers to call directly. Where a platform's only consumer-facing option for a given capability is a protocol this table marks MUST NOT, that capability needs to be fronted by an API Gateway or facade presenting a compliant interface (see API Consumption Patterns, Proxy) rather than exposed as-is. |
| :---- |

#### **API design principles**

##### **Future-focused design**

<Standard id="MSDAS_SHOULD_NOT_APIS_EXPOSE_OBSOLETE_LEGACY_STRUCTURES" type="SHOULD NOT">
APIs SHOULD NOT expose obsolete or legacy structures or functions.
</Standard>

Good API design seeks to avoid future breakage in dependent consumer applications by minimising the functions, data structures and behaviour exposed, while planning for — or at least signalling — foreseeable future change. As with any interface that has to be maintained, less is more when it comes to what's exposed.

##### **Layering**

An API is made up of distinct functional layers: security, caching, and representation.

Every API has a security component. This isn't only authentication and authorisation for access to the API; it also includes threat protection (DDoS, SQL injection, cross-site scripting, etc.) and availability/quality of service. It's often cost-effective to build a common framework that handles security across all of MSD's APIs — see Part B: API Security.

Caching can dramatically improve an API's performance. When designing an API, consider what, when and where to cache; understanding how and how often data changes, and which layer is most appropriate to cache at, are both important considerations — see Caching, below.

##### **Standards-based**

Web standards have rapidly become powerful agreements spanning not just local regions but international acceptance, enabling commonality and consistency. Using standard HTTP and URLs — the core technologies of the web — along with standards such as JSON and OAuth 2.0, ensures MSD isn't creating bespoke or proprietary technologies. The principle is to build to the latest versions of existing open, accepted standards: HTTP, OpenAPI, AsyncAPI, REST, JSON, OAuth 2.0, and OIDC. See API Development Industry Standards, below, for detail on relevant standards.

#### **Designing an API**

When designing an API, perform business process analysis first, so API development is business-driven rather than technology-driven — technology-driven projects rarely meet client or delivery-partner needs in the long run. Co-design with representatives of likely API Consumers is fundamental to getting this right. To identify potential partners to involve, consider: processes that currently depend on information the API could expose; and processes that require a capability the API could expose.

Focus early conversations on extracting true requirements through functional analysis (use cases) and data flow analysis, rather than getting drawn into developers' proposed technical solutions. Security and information privacy impacts — particularly important given the sensitivity of client and whānau information — must be identified up front and addressed early in the design process.

A common pitfall is mapping existing data tables directly onto resources and building CRUD operations over them; this usually produces a poor API design tightly coupled to the underlying data structure. Another is designing an API as a thin extension of a monolithic legacy system, which tightly couples the API to that system. Both pitfalls create long-term problems for API Providers and Consumers alike.

Agility matters more than completeness early on: share draft interface specifications with delivery partner developers and iterate quickly on their feedback. The right design will likely not please every developer — a reasonable rule of thumb is that the design is on the right track if most developers are a little unhappy but all can still achieve their aims. Start simple, focused on a single channel or interaction, and let the API evolve towards broader capability over time rather than trying to build for every use case from day one.

#### **Design-driven development**

<Standard id="MSDAS_MUST_BUILDING_APIS_DESIGN_DRIVEN_APPROACH" type="MUST">
When building APIs, a design-driven approach MUST be taken, comprising: interface specification first; an iterative design approach; and continuous integration/deployment/testing.
</Standard>

##### **Interface specification first**

The best way to design an API is in collaboration with potential API Consumers. Creating the interface specification first makes it easier for application developers to see what the API will offer and how it could be used, and their early feedback confirms the design is heading in the right direction. See Interface Specification, below.

##### **Iterative approach**

Big-bang releases rarely deliver business or client benefit. An iterative approach, with ongoing releases offering gradual improvement, gives a better sense of momentum, illustrates progress, and lets delivery partners coordinate their own efforts with MSD's API development. The API is a product whose capabilities should undergo continuing improvement based on consumer feedback, performance analytics and emerging needs.

##### **Automation first**

Automation gives fast turnaround on informing API developers about breaking changes as code is submitted to a shared codebase, via an automated, integrated build process that flags anything broken. Tests written against the interface specification early in development — using stubs or mocks — can be incorporated into this automated build, giving early warning of regressions. API code SHOULD NOT progress through delivery environments until it passes automated tests.

#### **Granularity**

APIs SHOULD be designed at the lowest practical level of granularity, since this makes each resource simpler and allows resources to be combined in ways that suit the application developer, rather than tying them to a specific sequence of calls just because that's how the back end happens to be built.

Too fine-grained a resource forces consuming applications to make many more calls to collect the information they need (“chatty” communication). Too coarse-grained a resource (returning everything about it) can produce enormous response payloads that may not suit every consumer's needs, and become cumbersome to maintain. Varying granularity may be needed within a single API depending on purpose — for example, a coarse-grained resource for posting a new case file as a bundle of content (notes, documents, keywords, supporting information), but separate, fine-grained sub-resources for adding comments to that file.

Aim for a granularity that prevents business logic leaking into the API — for example, requiring calls to be made in a specific sequence to satisfy an internal business process. This puts the onus on the application developer to get the sequence right, risks inconsistent data if they don't, and tightly couples the consuming application to MSD's internal process, so that any future change to that process has a downstream impact on every application developer.

General guidelines: don't aim for the finest possible granularity — build around each discrete, updatable resource; there doesn't need to be a one-to-one mapping between a manual service and a corresponding API, since APIs should support a process rather than encapsulate it; a rough guide is one API operation per entity lifecycle state transition; resources can be identified by reviewing a business process and identifying the key entities that underpin it; there should be only one API operation for one business outcome (e.g. change an address); and query parameters can be used to vary the granularity returned from a single resource (e.g. /appointments returns a list, while /appointments?$summary returns a summarised view).

#### **Interface specification**

An API represents a contract between the API Provider and API Consumer for access to the provider's resources. Because API consumption is a programmatic exercise, a clear definition of what the API offers and how those resources are accessed — the interface specification — is essential.

The specification SHOULD be designed in advance of developing the API: working through it typically surfaces issues that would otherwise affect the underlying resource-handling code, and it lets application developers review the capabilities on offer against their needs before they start building. Where API development is outsourced, the interface specification can be written in abstract as a means of defining what the vendor should build; it's version-controllable and can serve as the primary API documentation.

<Standard id="MSDAS_MUST_OPENAPI_SWAGGER_USED_INTERFACE_SPECIFICATION" type="MUST">
OpenAPI/Swagger MUST be used as the interface specification language for all synchronous APIs being developed.
</Standard>

Several API modelling languages exist — some proprietary (RAML, API Blueprint), some machine-readable but not human-readable (WADL) — but OpenAPI is the most widely used open standard, offering a programming-language-agnostic (JSON/YAML) interface that both humans and computers can use to discover and understand an API's capabilities.

#### **Orchestration**

As a general rule, using APIs as an orchestration tool isn't recommended, due to the architectural complexity this can introduce. That said, simple orchestration may sometimes be appropriate — for example, a “mashup” API creating a new logical resource by combining related data held in two or more backend systems. A mashup isn't appropriate where it merges two genuinely distinct API products together; if a consumer needs that functionality, the mashup should be performed by the consuming application instead. Other simple orchestration examples include mediation such as message transformation (JSON to XML, or canonical message model transformation).

#### **Software Development Kits (SDKs)**

| RECOMMENDED | It's recommended that API Providers offer an SDK to developers of consuming applications. |
| :---: | :---- |

An SDK is the implementation toolset for using MSD's APIs: it lets developers build applications faster without needing to understand every detail of the API, and should include sample code demonstrating the API's functionality.

<Standard id="MSDAS_SHOULD_ONCE_API_FIT_STATE_OFFERED" type="SHOULD">
Once an API is in a fit state to be offered to consumers, the API definition SHOULD be published to the MSD Developer Portal or equivalent social sector capability. The primary way developers discover an API is via this catalogue, so an external API MUST be well documented there, with accurate and up-to-date guidance.
</Standard>

### **2\. API Artefacts**

<Standard id="MSDAS_MUST_ALL_API_ARTEFACTS_MAINTAINED_SYSTEM" type="MUST">
All API artefacts MUST be maintained in a system that supports change tracking.
</Standard>

| API artefact | Requirement | Format | Description |
| :---- | :---- | :---- | :---- |
| Interface specification | MUST | OpenAPI 3.x | A machine-readable API specification document describing the API at a technical level. |
| Published documentation | MUST | — | Human-readable documentation describing the technical aspects of the API, example use cases, and any supporting business documentation. MUST be published via an easily consumable mechanism, preferably the web. |
| API policies | MUST | — | A set of policies applied to all APIs published via the MSD Developer Portal or equivalent social sector capability. |
| Tests | MUST | Dependent on implementation | A full set of unit, integration and functional tests for the API. These MUST be automated and a test report available. |
| Service Level Agreement (SLA) | MUST | — | An approved SLA defining minimum availability and performance service levels for the API, accessible via the MSD Developer Portal — see Part D: API Publishing. |

### **3\. API Architectural Patterns**

The table below identifies architectural and deployment patterns that bear further investigation for MSD's API landscape. There are vendor-specific implementations of most of these; this standard does not recommend any particular one.

| Pattern | Description |
| :---- | :---- |
| Microservices | Independently deployable services, each exposing a narrow, well-defined API, composed to deliver broader capability. |
| API Management | The combined discipline of API gateways and API managers used to publish, secure and govern APIs — see Part B: API Security, Security Reference Architecture. |
| Observability | Structured approaches to monitoring, logging and tracing that let API Providers understand the real-world behaviour of a distributed API landscape. |
| API Publication / Discovery | Approaches for making APIs discoverable to prospective consumers — see Part D: API Publishing. |
| Hybrid Deployments | Patterns for APIs that span on-premises and multiple cloud environments. |
| Service Mesh | Infrastructure-layer handling of service-to-service communication (routing, retries, encryption) independent of application code, typically used within microservice architectures. |

### **4\. API Consumption Patterns**

| INFO The patterns documented here reflect a small number of patterns MSD is expected to use initially. This list is expected to grow as MSD's API programme matures. |
| :---- |

#### **Direct**

The API service is hosted and published from the primary environment in which the MSD Developer Portal capability is implemented. MSD internal application developers,  social sector participant application developers or delivery partner application developer accesses the API directly via MSD's API Gateway; MSD's own operations team manages the API Management and Developer Portal components; and MSD API developers use the Developer Portal to publish and maintain their APIs.

#### **Proxy**

An API service hosted and published by an external delivery partner, using API management they own, is republished via MSD's Developer Portal, which routes (proxies) incoming traffic through to the partner's service under MSD's governance. In this pattern, both MSD's own API Gateway/Developer Portal and the delivery partner's API Gateway/service implementation are involved: consumers connect to MSD's Gateway as normal, and MSD's API Management routes and monitors traffic through to the partner's implementation, while the partner's own developers and operations staff manage their side directly.

The Proxy pattern lets MSD present a consistent, governed front door to consumers even where the underlying capability is actually delivered by a delivery partner, community provider, or other agency system.

### **5\. HTTP Verbs**

<Standard id="MSDAS_MUST_ACCESS_REST_APIS_VIA_STANDARD" type="MUST">
Access to REST APIs MUST be via the standard HTTP verbs: GET, PUT, POST, DELETE, in line with the W3C Standard.
</Standard>

| Verb | Common usage |
| :---- | :---- |
| GET | Retrieval of information. Use where the interaction is a safe, read-only operation such as a query. |
| POST | Create a resource, or trigger an action. Use where the interaction changes resource state in a way the consumer would perceive, or where the consumer should be held accountable for the result. |
| PUT | Update or replace an existing resource item. |
| DELETE | Delete a resource item. |
| OPTIONS | Retrieve information about what the consumer is allowed to do with a resource. |
| PATCH | Not recommended, due to complexity. |
| HEAD | Rarely used; retrieves metadata about a resource. |

#### **GET**

GET is used for retrieval of information — where the interaction is more like a question, i.e. a safe, idempotent operation such as a query. GET returns a representation in JSON with an HTTP 200 (OK) on success, or 404 (NOT FOUND) if the resource doesn't exist.

<Standard id="MSDAS_MUST_NOT_DO_EXPOSE_UNSAFE_OPERATIONS_VIA" type="MUST NOT">
Do not expose unsafe operations via GET — it should never modify any resources on the server.
</Standard>

##### **GET example**

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

#### **POST**

POST is used to create a resource, or to spawn an action — for example, opening a new case, or submitting an application for assistance. POST is neither safe nor idempotent: repeating the same POST request will typically create a second resource. On successful creation, POST returns HTTP 201 with a Location header pointing to the new resource.

##### **POST example**

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

#### **PUT**

PUT is used to update or replace an existing resource item, and, less commonly, to create a resource where the consumer chooses the resource ID. PUT is not safe but is idempotent — calling it repeatedly with the same body leaves the resource in the same state.

<Standard id="MSDAS_MUST_API_PROVIDERS_API_CONSUMERS_DESIGN" type="MUST">
API Providers and API Consumers MUST design APIs that are PUT tolerant, and be aware of the race condition this can expose when two consumers update the same resource concurrently.
</Standard>

This is commonly handled through optimistic or pessimistic concurrency control — see Versioning APIs, Resource Version Control.

#### **DELETE**

DELETE removes a resource identified by a URI. DELETE operations are idempotent: repeated calls leave the resource deleted, though a second call may return 404 rather than 200/204 since the resource is already gone.

#### **OPTIONS**

OPTIONS retrieves information about what the consumer is allowed to do with a resource, and is predominantly used by single-page application front-ends performing pre-flight checks.

#### **Other verbs**

##### **PATCH**

PATCH is a valid HTTP verb but its use is discouraged due to complexity, except where an adopted standard (such as a specific integration profile) explicitly supports safe PATCH semantics.

##### **HEAD**

<Standard id="MSDAS_MUST_NOT_RESPONSE_HEAD_REQUEST_CONTAIN_BODY" type="MUST NOT">
The response to a HEAD request MUST NOT contain a body. If a response body is returned it MUST be ignored.
</Standard>

### **6\. Uniform Resource Identifiers (URI)**

URI construction matters: it's the door through which consumers access API resources, and should be intuitive enough that a developer can guess what an endpoint does just from the URI and HTTP verb.

<Standard id="MSDAS_SHOULD_ENDPOINT_URLS_ADVERTISE_RESOURCES_AVOID" type="SHOULD">
Endpoint URLs SHOULD advertise resources, and avoid verbs.
</Standard>

#### **URI structure**

| Level | Name | Cardinality |
| :---- | :---- | :---- |
| 0 | \[basePath\] | 1..1 MUST be provided |
| 1 | namespace | 0..1 SHOULD be provided |
| 2 | version | 0..1 MAY be provided |
| 3 | resource | 1..1 MUST be provided |
| 4 | resource-id | 0..1 MUST be provided when interacting with a resource instance |
| 5 | sub-resource | 0..1 MUST be provided when interacting with a sub-resource |
| 6 | sub-resource-id | 0..1 MUST be provided when interacting with a sub-resource instance |

Examples: \[basePath\]/v2/clients/33245/entitlements, \[basePath\]/v1/case-managers/43265/caseloads

#### **API offering**

| RECOMMENDED | It's recommended that the URL makes it clear that it's an API, e.g. https://api.msd.govt.nz or https://msd.govt.nz/api. |
| :---: | :---- |

#### **Version**

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

#### **Namespaces**

MSD API Providers may hold multiple responsibilities that can result in overlapping resource naming (for example, “case” could mean different things across employment services and care and protection). It's recommended that namespaces be used to avoid ambiguity.

<Standard id="MSDAS_SHOULD_NAMESPACE_FIRST_NOUN_URI_REFLECT" type="SHOULD">
The namespace SHOULD be the first noun in the URI and SHOULD reflect the function being offered by the API, e.g. /v1/employment-services/.
</Standard>

#### **Resources and sub-resources**

<Standard id="MSDAS_SHOULD_RESOURCE_NAMES_NOUN_BASED_LOWER" type="SHOULD">
Resource names SHOULD be noun-based, lower case and plural for collections, e.g. /clients. Naming SHOULD be short, simple and human-guessable, avoiding technical or specialist jargon.
</Standard>

<Standard id="MSDAS_MUST_SUB_RESOURCES_APPEAR_UNDER_RESOURCE" type="MUST">
Sub-resources MUST appear under the resource they relate to (/resource/id/sub-resource/id), and SHOULD go no more than three levels deep.
</Standard>

Example: https://api.msd.govt.nz/v2/clients/33245/entitlements/E100782

#### **Word separation**

<Standard id="MSDAS_SHOULD_PATH_QUERY_STRING_PARAMETERS_LOWER" type="SHOULD">
Path and query string parameters SHOULD be lower case with hyphen separators for multiword names, e.g. /v1/case-notes?sort-order=asc.
</Standard>

#### **Query arguments**

Query arguments filter or modify a result set. The general rule: if it changes the behaviour of the result set, it SHOULD be a query argument; if it changes the behaviour of the API, it SHOULD be in the path.

* Sorting or ordering — e.g. sort-order=ascending

* Pagination — the response SHOULD point consumers to previous/next result pages using hypermedia links (see Content, HATEOAS)

* Field selection — e.g. filtering a client record down to specific fields; use sparingly, and consider GraphQL where this flexibility is a core requirement

### **7\. HTTP Headers**

#### **Request headers**

| Header | Usage | Requirement |
| :---- | :---- | :---- |
| Accept | Desired response format. 406 if unsupported. | MUST |
| Content-Type | Format of the request payload. 415 if unsupported. | MUST (POST/PUT) |
| Authorization | Authorization type and token. 401 if invalid. | MUST, unless a public API |
| Accept-Encoding | Compression the consumer can accept. | SHOULD |
| API Key header | Sent with every request, if API keys are used. | MUST, if issued |
| If-Modified-Since / If-None-Match | Conditional request handling; 304 if unchanged. | SHOULD |
| Request tracking header | Unique identifier to trace a request across its lifecycle. | SHOULD |

#### **Response headers**

| Header | Usage | Requirement |
| :---- | :---- | :---- |
| Content-Type | Format of the response. | MUST |
| Location | Absolute URI of a newly created resource, or redirect target. | MUST for 201/30x |
| Content-Location | Absolute URI of the requested resource. | SHOULD |
| Cache-Control | Directives controlling caching outside the API layer. | SHOULD |
| Expires | Used with Cache-Control for backward compatibility. | SHOULD |
| ETag | Concurrency control tag. | SHOULD |

#### **Custom headers**

<Standard id="MSDAS_SHOULD_NOT_X_NOTATION_HEADERS_DEPRECATED_PER" type="SHOULD NOT">
X- notation headers are deprecated per RFC 6648 and SHOULD NOT be used. Define a plain custom header name instead (e.g. Request-Id rather than X-Request-Id).
</Standard>

#### **Authorization**

Most API requests are authorised via the Authorization header. If an API Key header isn't used, the Authorization token MUST identify the API Consumer via an attribute within the token.

```http
# OAuth 2.0 Access Token (Opaque)
Authorization: Bearer x6TLB4JaomezC5rJ3CIl3KxxNinq

# OAuth 2.0 Access Token (Client-based JWT)
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9...
```

#### **Cache-Control**

<Standard id="MSDAS_MUST_ENSURE_APIS_PERFORM_AT_SCALE" type="MUST">
To ensure APIs perform at scale, the Cache-Control header MUST be used.
</Standard>

Key directives: private/public (whether the response may be cached in a shared cache), no-cache, no-store, max-age, s-max-age, must-revalidate and proxy-revalidate. See Caching for MSD-specific guidance on response and object caching.

### **8\. Content**

#### **Formats**

<Standard id="MSDAS_SHOULD_REST_APIS_DEFAULT_RETURN_CONTENT" type="SHOULD">
REST APIs SHOULD, by default, return content in JSON format, and SHOULD be human- and machine-readable.
</Standard>

<Standard id="MSDAS_MUST_RESPONSE_FORMAT_GET_REQUEST_INDICATED" type="MUST">
The response format for a GET request MUST be indicated by the consumer using the Accept header; the request format for POST/PUT MUST be indicated using the Content-Type header.
</Standard>

Where JSON is used, it MUST conform to RFC 7159\. Textual content SHOULD be UTF-8 encoded. Binary data such as images SHOULD NOT be returned directly in API responses — prefer a hyperlink to the image instead.

#### **Layout**

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

#### **JSON property names**

* Property names SHOULD be meaningful, with defined semantics.

* Property names MUST be camel-case ASCII strings, e.g. exampleProperty.

* The first character MUST be a letter or underscore.

* Reserved JavaScript keywords SHOULD be avoided.

#### **Consistency**

* Preserve backwards compatibility by returning expected fields and sensible defaults for missing fields.

* Keep terminology consistent throughout, e.g. don't repurpose a 'status' field to mean something different between resources.

#### **Singletons vs. collections**

A single-item GET (e.g. /clients/12345) returns the fundamental details of that resource; a collection GET (e.g. /clients) returns an array plus related metadata. If a queried collection legitimately has no results (e.g. no appointments scheduled for a given client), the correct response is 200 with an empty array — not 404\.

<Standard id="MSDAS_SHOULD_NOT_COLLECTION_RESOURCES_CONTAIN_BINARY_ATTACHMENTS" type="SHOULD NOT">
Collection resources SHOULD NOT contain binary attachments or other content that would lead to large response payloads.
</Standard>

#### **HATEOAS**

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

### **9\. API State**

#### **Consideration of state**

<Standard id="MSDAS_SHOULD_ALMOST_ALL_CASES_REST_API" type="SHOULD">
In almost all cases, a REST API SHOULD be entirely stateless.
</Standard>

As part of processing, an API may gather context and pass it to a downstream system, but SHOULD NOT maintain that context for future requests. This shouldn't be confused with caching (see Caching, below): a typical stateless flow has the API layer forwarding requests to a service layer, which may itself hold state (some services are stateful, others aren't) and pass state between services via service-to-service messaging — for example, an API being notified of a state transition via a state transition queue or topic, without the API layer itself retaining that state between requests.

#### **State in process APIs**

In some solution domains, API Providers need to implement services that are process-driven — either short-running (completed within a single consumer request) or long-running (persisting over many requests, potentially over an extended period, such as a multi-stage benefit application or a case review workflow). In these cases, the state of the process flow matters to the API Consumer, since it affects what the consumer can do next.

<Standard id="MSDAS_MUST_RESTFUL_APIS_EMBODY_PROCESS_WORKFLOW" type="MUST">
RESTful APIs that embody a process workflow MUST provide a mechanism for the API Consumer to retrieve the current state of their process.
</Standard>

Since process flows are typically specific to the business domain an API supports, it's prudent to implement the specific state model and flow logic in a single logical component — a service orchestrator — for ease of testing and maintenance. The service orchestrator dispatches requests to the services appropriate for the current process position, and keeps track of overall process state; the API itself becomes a facade over the orchestrator. A consumer initiating a process receives a Location header pointing to a status resource; querying that resource at any point returns the current state of the process, however many internal services the orchestrator has since dispatched work to.

### **10\. Bulk APIs**

#### **Bulk API handling**

<Standard id="MSDAS_SHOULD_NOT_APIS_DESIGNED_LARGE_PAYLOADS_I" type="SHOULD NOT">
APIs SHOULD NOT be designed for large payloads — i.e. bulk handling for retrieving or uploading batches of data. APIs are geared towards stateless, usually synchronous, web-like CRUD requests for individual discrete data transactions.
</Standard>

<Standard id="MSDAS_MAY_BULK_HANDLING_ACHIEVED_BUNDLING_MULTIPLE" type="MAY">
Bulk handling MAY be achieved by bundling multiple sub-requests into the same API invocation. This can help achieve logical grouping of similar requests, atomicity of transactions, and recoverability in the event of errors.
</Standard>

When handling bulk requests, consider troubleshooting and recovery: log all sub-requests with accurate timestamps so monitoring tools can visualise transaction progress.

| REQUIRED | Sub-request identifiers (see HTTP Headers, Request headers) are REQUIRED in bulk API calls, to ensure sub-requests are traceable end-to-end. |
| :---: | :---- |

Where legacy system impact is a concern, it may be appropriate to provide an asynchronous batch capability instead — for example, bulk creation of client records from a batch event in a consuming legacy application. It's preferable for the consuming application to treat each record as a unique event and POST it individually, since this lets each success or error be handled in its own right and reported back to the consumer. Where that's not possible due to a system constraint, multiple records may be POSTed together asynchronously; this type of interaction SHOULD NOT be attempted synchronously, since large batches will tie up HTTP threads and may require client/server timeout handling.

#### **Transactions vs. batches**

Bulk APIs can be transaction-based or batch-based, and the two behave differently on partial failure. With a transaction API, sub-requests are treated as a single transaction: if one sub-request fails, all sub-requests are typically rolled back, preserving atomicity. With a batch API, sub-requests are treated as an independent collection: if one fails, the others typically continue processing regardless.

##### **Transactions and temporary IDs**

Because sub-requests within a transaction are, by definition, tightly linked, it's common for the identifier from one sub-request to be referenced by a later sub-request in the same call — for example, a new client record referencing another new record in the same transaction as a related party, before either has a real, server-issued identifier.

<Standard id="MSDAS_SHOULD_SUB_REQUEST_IDENTIFIER_TEMPORARY_CLIENT" type="SHOULD">
The sub-request identifier (a temporary, client-assigned bulkId) SHOULD be used for cross-references between sub-requests within a transaction. The server replaces this with the real, server-side resource identifier once the record is created. In a batch call, by contrast, cross-references must use identifiers already known ahead of time, since sub-requests aren't guaranteed to succeed or process together.
</Standard>

##### **Example: transaction vs. batch response**

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

#### **Asynchronous transactions**

Where intended bulk payloads are too large for timely synchronous processing, the API SHOULD support the application/json-seq Content-Type, indicating the JSON payload is a sequenced data set. The API can then process each record individually and respond asynchronously with a Location header pointing to the transaction's process detail/status — following the same pattern as State in process APIs, above.

### **11\. Versioning APIs**

#### **Semantic versioning**

MSD APIs SHOULD follow semantic versioning, e.g. 3.2.5, where the MAJOR number changes on breaking changes, the MINOR number on backward-compatible additions, and the PATCH number on bug fixes or security remediations that introduce no new functionality.

#### **Version control mechanism**

<Standard id="MSDAS_MUST_URL_BASED_VERSIONING_URI_INCLUDE" type="MUST">
For URL-based versioning, the URI MUST include `/v{N}` with the major version (N) and v as a prefix. APIs SHOULD NOT include minor version numbers in the path.
</Standard>

```http
GET https://api.msd.govt.nz/clients/v1/search?last-name=Ngata
GET https://api.msd.govt.nz/clients/v2/search?last-name=Ngata
```

The response MUST still indicate at least the MAJOR version of the API that processed the request, via the Content-Type header, e.g. Content-Type: application/json; version=v3.2.5.

#### **When to version**

<Standard id="MSDAS_SHOULD_API_VERSIONED_CHANGE_BREAKING" type="SHOULD">
An API SHOULD be versioned when a change is breaking.
</Standard>

Breaking changes include: removing a response property; changing a property's data type or making an optional property required; removing a resource or HTTP verb; changing how errors are handled; or changing an existing resource URI.

Non-breaking changes include: adding new properties; adding new resources; adding support for new HTTP verbs on existing resources; and adding new optional headers.

#### **Resource version control**

API Providers MUST implement a concurrency control mechanism to handle situations where two consumers attempt to update the same resource at the same time — for example, two case managers updating the same client record concurrently.

| Feature | Optimistic concurrency | Pessimistic concurrency |
| :---- | :---- | :---- |
| Locks resource before update | No | Yes |
| Checks for conflicts before update | Yes | No |
| Performance when conflicts rare | Good | Poor |
| Performance when conflicts common | Poor | Good |

Optimistic concurrency is typically preferred for MSD APIs due to its simplicity and scalability; pessimistic concurrency should be reserved for cases where data consistency is paramount and conflicts are frequent.

### **12\. Search APIs**

Search capability is an important component of many REST APIs, used to find resources within a collection (see Content, Singletons vs. collections) that meet the API Consumer's requirements. There are two common ways to search a collection: GET with query parameters, or POST with query parameters in a request body. Both are supported by this standard, but the choice carries real security implications.

|  | GET | POST |
| :---- | :---- | :---- |
| Description | Retrieve resources from a collection matching parameters in a query string, e.g. GET /clients?status=active | Retrieve resources from a collection matching parameters in a request body, e.g. `POST /clients {"status":"active"}` |
| Considerations | Generally considered less secure than POST, since components in the HTTP(S) path (browsers, proxy servers) can log or cache full URLs. Very complex searches may hit URL/query-string length limits (server- and client-dependent, e.g. \~8KB Apache, \~16KB IIS, \~2KB in many browsers) — if this happens, POST SHOULD be used instead. | Generally considered more secure, since request-body parameters are encrypted in transit under HTTPS, preventing intermediary components from decrypting and logging them. Use when the search query itself contains sensitive or personal identifying information. |

<Standard id="MSDAS_MUST_NOT_SEARCH_QUERY_PARAMETERS_CONTAIN_PERSONAL" type="MUST NOT">
Search query parameters MUST NOT contain personal identifiable or sensitive information, e.g. GET /clients?lastName=Ngata\&mobileNumber=0221112222.
</Standard>

<Standard id="MSDAS_MUST_POST_MECHANISM_USED_SENSITIVE_SEARCH" type="MUST">
Where the POST mechanism is used for a sensitive search, the API MUST have a distinct search resource (e.g. /clients/\_search) so the API can clearly distinguish a search from a resource-creation request.
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

Other considerations include special characters or filters that add complexity through URL encoding — for example, supporting “\<” or “\>” operators, or non-English characters. Structured query language (SQL) keywords should also be handled carefully, since common threat-detection filters may block requests containing words like ‘DROP’, ‘ALTER’ or ‘DELETE’ on the assumption they indicate a SQL injection attempt — see the OWASP Cross-Site Scripting and SQL Injection Prevention Cheat Sheets for detail.

Pagination behaviour SHOULD be consistent with the interaction described in URIs, Query Arguments, and can be implemented as page number/size, offset/limit, or a continuation token, depending on the scale and volatility of the search results. Since the HTTP protocol treats POST as unsafe, POST search results aren't cacheable — even with a Cache-Control header present — so consider the performance impact for high-volume search operations.

### **13\. Caching**

Caching enables faster API responses and reduces backend load. It's well suited to information that's frequently requested but doesn't change often — for example, a list of MSD service centre locations or reference/lookup codes.

#### **Response cache**

A response cache stores the response to a GET request on a unique resource, held as close to the consumer as possible while remaining inside the agency's security boundary. Many API gateway products provide a built-in response cache.

<Standard id="MSDAS_SHOULD_API_PROVIDERS_MONITOR_RESPONSE_CACHE" type="SHOULD">
API Providers SHOULD monitor their response cache to keep stale objects to a minimum, ensuring the cache is refreshed once information is updated or a timeout occurs.
</Standard>

For example: a client requests service centre opening hours; the gateway checks its cache, and on a miss retrieves the data from the provider and caches it for subsequent requests. If the opening hours are later updated via a PUT request, the gateway invalidates the corresponding cache entry so the next GET returns current information.

#### **Object cache**

An object cache holds objects fundamental to an API's function that don't change often — for example, a reference table of benefit or entitlement codes used to validate incoming requests. Rather than querying the reference database on every request, the API layer caches these codes with a time-to-live (TTL) and refers to the cache until it expires or is explicitly invalidated (for example, when an administrator updates the reference data).

### **14\. Error Handling**

API Consumers see an API as a black box; when something goes wrong they need clear, actionable information — without the response leaking details about the provider's internal systems.

<Standard id="MSDAS_MUST_ERROR_OCCURS_RESPONSE_BODY_CONTAIN" type="MUST">
When an error occurs, the response body MUST contain: the HTTP status code; an API-specific error code that support staff can look up; and a human-readable error message.
</Standard>

#### **HTTP status codes**

| Code | Meaning | Typical use |
| :---- | :---- | :---- |
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

#### **Error schema**

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

Human-readable error messages SHOULD be informative without exposing internal system details (component names, stack traces) that could help a malicious actor, and MUST NOT confirm or deny sensitive information such as whether a specific client ID exists.

### **15\. API Governance**

API governance ensures MSD's APIs are built proactively to achieve specific goals and deliver value to both providers and consumers. It also helps MSD make informed decisions about its API programme and establish consistent practice for building, deploying and consuming APIs.

MSD API governance should include:

* Specification and resource definitions — governing API contracts and resource definitions to improve consistency and reuse.

* Style and pattern guidelines — standardising API design so APIs remain consistent and usable.

* Automation — templates and pipelines that make it easier to comply with policy than not (for example, scaffolding that automatically wires in security and audit logging, or pipelines that enforce coding standards and security scans).

* Lifecycle management — governing an API from publication through versioning, deprecation and retirement.

* Tracking and analytics — visibility into where APIs are deployed, who is using them and how.

* A robust code review process — development using a branch strategy with at least one peer review required before merge and deployment.

Governance works best as a collaborative process: the more aligned MSD's API designers and developers are on these standards, the more efficient and successful the API programme will be. This is particularly important given MSD's API programme spans multiple business groups (income support, employment, housing, and care and protection) and delivery partners.

\*\*\*\*\*\* Include this in governance playbook section as well as reference architecture

Dogfooding is a well-established, practical principle which earns its place for concrete reasons:

* **Quality forcing function** — if MSD's own case management tools have to consume the same client/entitlement APIs as external delivery partners, any friction, gap or bad design gets felt and fixed internally before it becomes a delivery partner's problem.  
* **Holistic demand management** — if internal traffic bypasses the gateway (e.g. direct database or service calls), MSD loses visibility into true combined load, and capacity/throttling decisions made against external-only metrics will be wrong.  
* **No back-door security posture** — internal consumption through the same authenticated, audited path as external consumption means there's one security model to reason about, not two.  
* **Better prioritisation signal** — usage analytics (Part D, Publishing Components) actually reflect total demand, not just external demand, which matters for SLA and roadmap decisions.

\*\*\*\*\*\*\*

### **16\. API Development Industry Standards**

In addition to the standards captured in API Design and Part B: API Security, the table below sets out current API and web standards that should be considered as part of MSD's API strategy.

| Standard or standards organisation | Description |
| :---- | :---- |
| OpenAPI | Defines a standard, language-agnostic interface to RESTful APIs, letting both humans and computers discover and understand a service's capabilities without access to source code, documentation, or network traffic inspection. |
| AsyncAPI | An open initiative to improve the state of event-driven architectures, aiming to make working with them as easy as working with REST APIs. |
| HTTP | Hyper Text Transfer Protocol — the transport layer most RESTful APIs rely on, using HTTP verbs such as POST, GET, PUT and DELETE. |
| OAuth 2.0 / OIDC | The industry-standard authorisation framework, and the identity layer built on top of it — see Part B: API Security. |
| JSON / JSON Schema | A lightweight, self-describing, open standard format for storing and transporting data, easy for both humans and computers to read. |
| JWT / JWS / JWE / JWK / JWA | A related set of open standards for securely transmitting information between systems using JSON: the token structure (JWT), how to sign it (JWS), how to encrypt it (JWE), and JSON cryptography practices (JWK and JWA). |
| Fast Healthcare Interoperability Resources (FHIR) | An HL7 industry standard for exchanging healthcare information electronically. Not applicable to MSD's social sector context, but included here as it may be relevant where MSD APIs interoperate with health sector partners. |
| Payments New Zealand (PNZ) API Centre Standards | An NZ industry standard for Open Banking. Its security profile — particularly how it captures customer consent for third parties to act on their behalf — is a useful reference for MSD's own consent-driven APIs. |
| SOAP | Deprecated for NZ Government — the Government Enterprise Architecture Governance group has determined SOAP should not be used for new work, though it may remain in use for existing APIs. |
| Financial Grade API (FAPI) Security Profile | An industry standard for the financial sector, useful as an example of good security profile practice — see Part B: API Security, PAR, JARM and Session Management. |
| Pan European Public Procurement Online (Peppol) | A global standardised framework enabling businesses to exchange procurement documents electronically, governed by a multilateral agreement structure owned and maintained by OpenPeppol. |
| Internet Engineering Task Force (IETF) | The open international community responsible for the evolution of Internet architecture, producing many of the RFCs referenced throughout this standard. |
| Standards New Zealand | A business unit within the Ministry of Business, Innovation and Employment responsible for managing the development, publication and sale of NZ, joint Australia-NZ, and international standards. |
| Stats NZ: Standards and classifications | Standards and classifications maintained by Stats NZ, including tools to help classify and code survey and administrative responses. |
| Data Content Requirements | The Government's register of data content requirements, published at data.govt.nz, setting out standardised data content definitions for use across the public sector. |

## **C.2 Asynchronous APIs**

Not every integration fits a request/response pattern. Where a consuming system needs to know about a change as soon as it happens — for example, when a client's entitlement status changes, or a case is reassigned — an event-driven, Asynchronous API is often a better fit than polling a synchronous API.

### **Synchronous vs. asynchronous interaction**

A typical synchronous REST interaction is a request/response exchange: an API Consumer sends a request and waits for the API Provider to respond, usually within a few seconds, and there is only ever one consumer per request.

An asynchronous interaction is different: it's typically a “fire and forget” model, where an API Provider publishes an event to an intermediary — a message broker or queue — and one or more API Consumers process that event later, often in near real-time. The API Provider publishes once; the broker is responsible for routing the event to every interested consumer.

| RECOMMENDED | For MSD's social sector data-sharing use cases, the Publish/Subscribe pattern is the recommended default — see Async Patterns. |
| :---: | :---- |

### **Messaging concepts**

Asynchronous and event-driven architecture uses terminology that can mean different things in other contexts. This glossary defines how these terms are used throughout this section.

| Concept | Description |
| :---- | :---- |
| Message | A packet of data transmitted over a channel, containing data such as an event. |
| Message Producer | A software application which publishes messages to API Consumers using Asynchronous APIs. |
| Event | A message containing information about something that has occurred — for example, a benefit payment being issued, or a client updating their address. |
| Event Producer | A software application which publishes event messages to API Consumers using Asynchronous APIs. |
| Unbounded event | An event containing continuous, unbounded data — for example, a stream of readings from a monitoring device. |
| Discrete event | An event containing discrete data: a fact that has happened, such as a payment being issued. |
| Message broker | Software that lets API Consumers and Providers communicate. The broker distributes messages to the correct channels (routing), applies authorisation, manages subscriptions and applies transformations. |
| Topic | A destination that an API Provider publishes messages to. |
| Queue | A destination API Producers publish to, and an endpoint API Consumers bind to and consume messages from. |
| Event schema | A specification defining the data structure contained in a message. |
| Subscription | A unique relationship to a topic by a subscriber, indicating it should receive updates for that topic. |
| Subscriber | The API Consumer. |

### **Message types**

The type of message used depends on the use case. Event-driven architectures typically publish domain events (private, used internally e.g. between microservices) or integration events (intended for external consumers, and designed not to leak private implementation detail).

When publishing integration events there's a balance to strike between publishing too much information (risking unnecessary disclosure of client or whānau data) and too little (forcing consumers back to the source system for every detail).

#### **Event notification (thin events)**

A “thin” message contains no data, or the minimum needed to inform a consumer that an event occurred. Interested consumers can contact the API Provider (typically via REST) for further detail.

<Standard id="MSDAS_MAY_THIN_EVENTS_INCLUDE_POINTER_URL" type="MAY">
Thin events MAY include a pointer (URL or identifier) back to the resource that triggered the notification. If no pointer is supplied, the data source MUST allow subscribers to query specifically for changed resources (e.g. lastUpdatedTime \> `{last query time}`).
</Standard>

```json
{
  "specversion": "1.0",
  "type": "entitlement_status_changed",
  "source": "income-support",
  "subject": "client/12345",
  "id": "5a5c049a-...",
  "time": "2026-07-13T09:12:00Z",
  "data": {
    "url": "https://api.msd.govt.nz/clients/12345/entitlements/E100782"
  }
}
```

Characteristics: minimal information transferred, reducing the risk of unauthorised disclosure; less risk of data going out of sync, since consumers fetch the latest data themselves; smaller, simpler contracts that are easier to evolve. This message type SHOULD be used where the API Consumer isn't fully trusted, or where re-authentication of the client is required — which is common with the Pub/Sub pattern.

#### **Event-carried state transfer (thick events)**

A “thick” event carries enough current data for the consumer to act on the event without contacting the source system — sometimes called a “fact” event, since it captures state at a point in time.

```json
{
  "specversion": "1.0",
  "type": "entitlement_status_changed",
  "source": "income-support",
  "subject": "client/12345",
  "id": "5a5c049a-...",
  "time": "2026-07-13T09:12:00Z",
  "data": {
    "client": { "id": "12345", "givenName": "Aroha", "familyName": "Ngata" },
    "entitlement": { "type": "jobseeker-support", "previousStatus": "under-review", "newStatus": "active" }
  }
}
```

Characteristics: consumers are fully decoupled from the provider, since they already hold the data they need; when multiple events for the same subject are processed in order, a consumer must account for the possibility it isn't using the very latest data due to processing delay; greater care is needed with event versioning and schema change; data is eventually consistent rather than instantaneously so. Thick events suit integrations using the Point to Point pattern, where the consumer is known and trusted, or where it's undesirable for the consumer to make additional calls back to the provider.

#### **Delta events**

A delta event details only what changed between one state and the next — the fields that changed, their new values, and optionally the reason for the change — without repeating unchanged data.

```json
{
  "specversion": "1.0",
  "type": "client_nextofkin_updated",
  "source": "case-management",
  "subject": "client/12345",
  "id": "5a5c049a-...",
  "time": "2026-07-13T09:12:00Z",
  "data": {
    "oldNextOfKin": { "givenName": "John", "familyName": "Roberts", "relation": "Spouse" },
    "currentNextOfKin": { "givenName": "Kaia", "familyName": "Nash", "relation": "Mother" }
  }
}
```

Delta events can reduce processing effort for consumers who don't otherwise know the prior state, and reduce payload size relative to a thick event.

#### **Message header fields**

Message headers (sometimes called message metadata) let a message broker perform routing and logging without inspecting the full payload. Where the CloudEvents specification is used, this metadata is expressed as Context Attributes — id, source, specversion and type are mandatory. Where a specification like CloudEvents isn't in use, the following minimal header set is suggested:

| Header | Example value | Description |
| :---- | :---- | :---- |
| Content-Type | application/json | Indicates the content type of the message. |
| Correlation-Id | 63841126-0aba-4e21-... | Unique identifier for the interaction. |
| Event-Id | 54e7587e-5a38-4c85-... | Unique identifier for this event, used for idempotency. |

### **Protocols and APIs**

<Standard id="MSDAS_SHOULD_API_PROVIDERS_AIM_SUPPORT_MANY" type="SHOULD">
API Providers SHOULD aim to support as many transport protocols as reasonably possible, so API Consumers can use whichever best suits their own infrastructure.
</Standard>

| Protocol | Description | Requirement |
| :---- | :---- | :---- |
| MQTT | Lightweight protocol for low-bandwidth, high-latency networks; supports all Async Patterns below. | SHOULD support |
| AMQP | Open-standard protocol for reliable, high-performance, interoperable messaging via brokers. | SHOULD support |
| WebSockets | Bidirectional, real-time communication over a single long-lived HTTP connection. | SHOULD support |
| HTTP | Limited scalability for async use; typically shifts long-polling from the API to the broker. | MAY support, e.g. for legacy integration |
| Proprietary (e.g. broker-specific formats) | Vendor-specific messaging protocols. | MAY be used, but MUST NOT be the only protocol offered |
| JMS (Java Message Service) | Common Java interface for creating, sending and receiving messages. | MAY be offered |

| RECOMMENDED | It's recommended to publish messages using JSON as the data serialisation format, given its low barrier to entry, human readability, and broad native language support, over alternatives like Protocol Buffers or FlatBuffers. |
| :---: | :---- |

### **Topics and subscriptions**

A Message Producer uses topics to route messages to interested API Consumers; an API Consumer uses topics within its subscriptions to filter the messages it wants to receive. Well-architected, consistent topic design is central to a reusable event-driven API.

<Standard id="MSDAS_MUST_TOPIC_DESIGN_APPLIED_CONSISTENTLY_ONCE" type="MUST">
Topic design MUST be applied consistently once agreed, and root levels of a topic MUST NOT change meaning. Topic levels MUST be separated by / rather than concatenation, to support subscription filtering.
</Standard>

A general topic design pattern: `{domain}/{action}/{identifier}` — for example:

| Topic level | Description | Example |
| :---- | :---- | :---- |
| Domain | The domain of the event. | entitlement, client, case |
| Action | The past-tense action that occurred. Avoid HTTP-verb style naming. | issued, updated, reassigned, closed |
| Identifier | An identifier for the subject of the event. | clientId, caseId |

Consider an entitlement\_status\_changed event. Multiple parties are likely interested — for example, a central reporting system that wants every such event, and a specific service centre that only wants events for its own caseload. A flat topic like entitlement/status-changed doesn't let the service centre filter to just its own clients. A richer hierarchy does:

```
entitlement/status-changed/{serviceCentreId}/{clientId}
```

A service centre could then subscribe using a filter such as entitlement/status-changed/porirua-sc/\*, receiving only events for its own clients, while a central reporting system subscribes more broadly to entitlement/status-changed/\> to receive everything. These specific wildcard characters (+, \# and \* are common examples) are illustrative of the capability required, not a mandate to use MQTT or any other specific broker technology — see the note below.

<Standard id="MSDAS_MUST_MESSAGE_PRODUCER_PROVIDE_MECHANISM_API" type="MUST">
A Message Producer MUST provide a mechanism for API Consumers to subscribe and unsubscribe from available channels, and MUST provide a way for a consumer to filter the topic hierarchy down to a relevant subset (e.g. events for one service centre only) rather than being limited to “all events on this topic” or “no events on this topic”. Whatever filtering mechanism the chosen broker technology provides to achieve this MUST be documented alongside the API.
</Standard>

| NOTE This requirement is about the filtering capability an API Consumer needs, not about mandating a specific broker or wildcard syntax. MQTT-style wildcards (+, \#) are one common way of meeting it, but other mechanisms — for example, correlation or SQL-style subscription filters, as used by Azure Service Bus, or subject-prefix filters, as used by Azure Event Grid — satisfy the same requirement and are equally acceptable. API Providers should choose whichever mechanism their broker technology supports, document it clearly, and ensure it lets consumers subscribe to a meaningful subset of a topic hierarchy rather than only the whole of it. |
| :---- |

### **API Design and Documentation**

<Standard id="MSDAS_MUST_API_PROVIDERS_ASYNCHRONOUS_API_DOCUMENT" type="MUST">
API Providers of an Asynchronous API MUST document the API using a combination of AsyncAPI (to describe API flows, access and behaviour) and JSON Schema (to describe message structures).
</Standard>

AsyncAPI extends the same design thinking as OpenAPI to cover asynchronous, event-driven interactions, which may not always use HTTP as the underlying transport.

| RECOMMENDED | APIs published by MSD are recommended to use the CloudEvents specification to structure event messages, giving consumers a consistent envelope (type, source, subject, etc.) across all published events. |
| :---: | :---- |

Using a consistent, well-documented event schema allows API Consumers and Publishers to design against a known message structure, accelerating integration on both sides. API Providers SHOULD validate outgoing messages against their published JSON Schema before publishing them.

<Standard id="MSDAS_MAY_API_PROVIDERS_CHOOSE_OFFER_EVENT" type="MAY">
API Providers MAY choose to offer an event catalog or schema registry, published via the MSD Developer Portal, so consumers can discover available event types without needing to contact the provider directly.
</Standard>

### **Data consistency models**

Data consistency describes how uniform, accurate and coherent data is across API Producers and Consumers. The right consistency model depends heavily on the use case — not just the type of data.

| EXAMPLE Scenario: a client is assessed as being at risk of serious harm, and a case manager flags a safety alert on their file. At the point of decision, other case managers and duty staff who might interact with that client MUST see this alert immediately — this calls for strong consistency. But if the same event is being used six months later for policy analysis of risk-assessment patterns, eventual consistency is perfectly sufficient. |
| :---- |

#### **Eventual consistency**

Guarantees updates will propagate through all integrated systems and become consistent, given enough time. Not suited to data requiring strict, immediate accuracy. Appropriate for events such as: a client's preferred name was updated; a client's contact details changed; a provider's accreditation was renewed.

#### **Strong consistency**

Ensures all API Consumers hold an accurate copy of the data without temporary inconsistency. Appropriate for events such as: a safety alert was flagged on a client's file; a benefit payment was issued; a client's case was escalated for urgent review.

### **Security**

Part B: API Security applies fully to Asynchronous APIs, in the same way it applies to REST APIs.

<Standard id="MSDAS_MUST_MESSAGES_USED_ASYNCHRONOUS_APIS_USE" type="MUST">
Messages used in Asynchronous APIs MUST use appropriate transport-level encryption, regardless of protocol. API Consumers MUST be authenticated and authorised using appropriate mechanisms, and authorisation MUST be used to restrict access to topics as appropriate. An appropriate Message Type MUST be selected to meet the use case's requirements alongside privacy and interoperability goals.
</Standard>

### **Async Patterns**

Asynchronous APIs support several communication patterns, each suited to different use cases.

#### **Publish/Subscribe (Pub/Sub)**

<Standard id="MSDAS_SHOULD_API_PROVIDERS_USE_PUB_SUB" type="SHOULD">
API Providers SHOULD use the Pub/Sub pattern for integration event messages published within the social sector, as it's best suited to increasing interoperability.
</Standard>

An API Provider publishes events to be delivered to none, one, or many consumers, decoupling the producer from consumers via a message broker. The provider has no concern with whether a message was received; each subscriber gets its own copy of the message. For example, when a client's entitlement status changes, the event might be routed to a central reporting system, the client's assigned service centre, and a partner agency system — each receiving its own copy.

Use this pattern when: broadcasting to a significant number of consumers; integrating independently-developed systems on different platforms; no real-time response is required from consumers; the systems involved support eventual consistency; or no acknowledgement of receipt is required.

#### **Point to point**

Delivers a message to a single API Consumer in a one-to-one exchange, typically via a queue: the message is received at most once. For example, a nightly reconciliation event queue consumed solely by MSD's own data warehouse.

Use this pattern when: there's only ever one consumer; fault tolerance matters, since a message stays on the queue until successfully processed; or high-concurrency processing is required, since competing consumer instances can share the load (each message processed by exactly one instance, often round-robin) — note that message ordering needs separate handling if it matters to the use case.

#### **Request/reply**

Used for “command” messages, where the sender expects a result or confirmation back. An API Consumer publishes a request (for example, generate\_client\_summary) to a request channel; a service processes it and publishes the result to a corresponding reply channel, which the original consumer subscribes to.

This is well suited to processing that may take longer than a typical HTTP request duration — for example, generating a complex case summary that aggregates data from multiple systems — or to downstream services that are rate-limited and can only process a constrained level of concurrency.

## **C.3 MCP APIs**

A growing category of integration doesn't fit the human-application-to-API model that Synchronous and Asynchronous APIs are designed for: AI agents and assistants that need to discover and invoke capabilities dynamically, on behalf of a case manager or other MSD staff member, in the course of a conversation or task. The Model Context Protocol (MCP) is the emerging standard for this kind of integration.

| INFO MCP is a young, fast-moving specification and is currently under active, sometimes substantial, revision. This section deliberately sets out durable principles rather than mechanism-level detail (specific message names, transport names, or endpoint paths), since those details are likely to change between specification revisions. Before building or updating an MCP Server, MSD API Developers MUST check the current published MCP specification for the exact mechanism in force at the time — message formats, transport requirements, session/statefulness model, and authorisation flow have all changed materially between revisions and should be expected to change again. |  |
| ----- | :---- |
| **SHOULD** | MCP SHOULD be used when the integration's primary consumer is an AI agent or assistant that needs to select and invoke capabilities dynamically. Where the consumer is a conventional application performing a known, fixed sequence of calls, a Synchronous or Asynchronous API remains the appropriate choice. |

### **Core concepts**

MCP defines three roles, which remain stable across specification revisions even as the mechanics of how they communicate evolve:

| Role | Description |
| :---- | :---- |
| MCP Host | The AI application a user interacts with directly — for example, an AI assistant embedded in a case management tool. The Host embeds one or more MCP Clients. |
| MCP Client | Connects to a single MCP Server on behalf of the Host, handling capability discovery and message exchange. |
| MCP Server | Exposes capabilities to Clients. An MSD MCP Server is analogous to an API Provider in Parts A–C, but exposes capabilities an agent selects dynamically, rather than a fixed contract a developer codes against in advance. |

Servers typically expose capabilities through a small set of primitives, which have been broadly consistent across specification revisions to date:

| Primitive | Description |
| :---- | :---- |
| Tools | Functions the agent can invoke to take action or retrieve information — for example, get-client-entitlements or create-case-note. Each tool declares a schema for its input and, where possible, its output. |
| Resources | Addressable data the agent can read — for example, a client's current support plan document. |
| Prompts | Reusable, parameterised prompt templates a Host can surface to a user — for example, a template for drafting a case review summary in MSD's standard format. |

MSD MCP Servers should expect this primitive set to be extended over time (for example, capabilities for longer-running tasks or richer server-to-client interaction have been proposed and adopted in various forms across revisions) and should design tool and resource naming so it can accommodate new primitive types without rework.

### **Message format, transport and state**

<Standard id="MSDAS_MUST_MCP_SERVERS_IMPLEMENT_MESSAGE_FORMAT" type="MUST">
MCP Servers MUST implement the message format, transport, and connection/session model defined by the current version of the Model Context Protocol specification that MSD has adopted — rather than any specific historical mechanism described in earlier drafts of this standard.
</Standard>

Two things are worth calling out because they have changed, or are in the process of changing, between MCP specification revisions and are likely to keep evolving: whether a Server maintains state for a connected Client across a session, versus treating each request independently; and which transport(s) a remote (internet- or network-exposed) Server is expected to support versus a purely local one. MSD API Developers should treat both as implementation details to confirm against the current specification, not fixed architectural assumptions.

<Standard id="MSDAS_SHOULD_REMOTE_MCP_SERVERS_FAVOUR_WHICHEVER" type="SHOULD">
Remote MCP Servers SHOULD favour whichever transport and connection model the current MCP specification designates as its standard for internet-facing deployment, and SHOULD avoid depending on session-held state that the current specification doesn't guarantee will persist, so the Server remains easy to scale and to migrate as the specification's connection model evolves.
</Standard>

### **Tool design**

<Standard id="MSDAS_MUST_EVERY_TOOL_DECLARE_MACHINE_READABLE" type="MUST">
Every Tool MUST declare a machine-readable schema for its input parameters, and SHOULD declare one for its output. Tool names MUST be unique within a Server and SHOULD use clear verb-noun naming, e.g. get-client-summary, create-case-note.
</Standard>

<Standard id="MSDAS_MUST_EVERY_TOOL_PROVIDE_CLEAR_COMPLETE" type="MUST">
Every Tool MUST provide a clear, complete natural-language description of what it does, including any side effects. This description is read by the agent (and, indirectly, by the person the agent is acting for) to decide when and how to use the tool — an ambiguous or incomplete description leads directly to incorrect or unintended use.
</Standard>

```json
{
  "name": "get-client-entitlements",
  "description": "Retrieve the current entitlement records for a specified client. Requires an active case assignment to the client. Returns entitlement type, status and effective dates. Does not return payment history.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "clientId": { "type": "string", "description": "The unique MSD client identifier" }
    },
    "required": ["clientId"]
  }
}
```

<Standard id="MSDAS_SHOULD_TOOLS_CREATE_UPDATE_DELETE_DATA" type="SHOULD">
Tools that create, update or delete data, or that trigger a real-world action (e.g. issuing a payment, sending a client communication), SHOULD be clearly distinguished — by name and description — from read-only tools, so Hosts can apply appropriate confirmation steps (see Security, below).
</Standard>

### **Resource design**

<Standard id="MSDAS_MUST_RESOURCES_ADDRESSABLE_STABLE_IDENTIFIER_DECLARE" type="MUST">
Resources MUST be addressable by a stable identifier and MUST declare an appropriate content type.
</Standard>

Where a Resource represents the same underlying data as an existing REST resource (see Part C.1), the MCP Resource identifier SHOULD reference or align with the equivalent REST resource identifier, so the same client or case record can be recognised consistently across integration styles.

### **Discovery and capability negotiation**

Clients discover a Server's available Tools, Resources and Prompts dynamically at connection time, rather than relying on a static, separately published specification document (contrast with OpenAPI in Part D). The precise mechanism for this discovery, and for notifying a connected Client when a Server's capabilities change, is defined by the MCP specification and has changed between revisions.

<Standard id="MSDAS_SHOULD_MCP_SERVERS_NOTIFY_CONNECTED_CLIENTS" type="SHOULD">
MCP Servers SHOULD notify connected Clients when their available capabilities change at runtime (for example, tools that become available only once a case is in a particular status), using whatever notification mechanism the current specification provides, so Hosts don't need to poll for changes.
</Standard>

### **Versioning**

<Standard id="MSDAS_MUST_MCP_SERVERS_DECLARE_VERSION_MCP" type="MUST">
MCP Servers MUST declare which version of the MCP specification, and which version of their own Tool/Resource contract, they implement. A Tool's input schema MUST NOT change in a breaking way without also changing the Tool's name or otherwise signalling the change to Clients. Non-breaking additions (new optional parameters) MAY be made without such a change.
</Standard>

### **Error handling**

<Standard id="MSDAS_MUST_TOOL_INVOCATION_ERRORS_RETURNED_WAY" type="MUST">
Tool invocation errors MUST be returned in a way that lets the calling agent distinguish “the tool ran and reported a failure” from “the protocol exchange itself failed”, using whichever mechanism the current MCP specification provides for that distinction.
</Standard>

As with REST error handling (see Error Handling, above), error messages returned to the agent SHOULD be informative without exposing internal system details, and MUST NOT confirm or deny sensitive information such as whether a specific client ID exists, since the agent may relay tool output directly into a user-facing response.

### **MCP security**

MCP introduces security considerations beyond those covered in Part B, because the consumer is an AI agent making autonomous decisions about which capabilities to invoke, often based on natural-language content it doesn't fully control. The specific authorisation flow MCP mandates has changed between specification revisions and should be expected to change again; the principles below should hold regardless of which flow is current.

<Standard id="MSDAS_MUST_AUTHENTICATION_AUTHORISATION_REMOTE_MCP_SERVERS" type="MUST">
Authentication and authorisation for remote MCP Servers MUST follow whichever authorisation flow the current MCP specification mandates, implemented consistently with the equivalent controls set out in Part B: API Security. MCP-specific access tokens MUST NOT be accepted by other MSD APIs, and vice versa (token audience MUST be validated), to prevent a compromised MCP Server or Client from being used to obtain access to unrelated MSD systems.
</Standard>

<Standard id="MSDAS_MUST_TOOLS_SCOPED_MINIMUM_DATA_ACTIONS" type="MUST">
Tools MUST be scoped to the minimum data and actions required, following the same least-privilege principle as REST API scopes (see Part B). A tool that reads client entitlements MUST NOT also carry the ability to update them.
</Standard>

<Standard id="MSDAS_SHOULD_TOOLS_WRITE_DATA_TRIGGER_REAL_2" type="SHOULD">
Tools that write data or trigger real-world actions on a client's record SHOULD require explicit human confirmation within the Host application before execution, particularly where the action is difficult to reverse (e.g. issuing a payment, closing a case).
</Standard>

| SECURITY NOTE Tool descriptions and resource content are a channel an attacker can use to influence agent behaviour — sometimes called indirect prompt injection. For example, a case note resource containing hidden instructions could attempt to manipulate an agent reading it into taking an unintended action. MCP Servers SHOULD treat all resource content and tool output as untrusted input from the agent's perspective, and MUST NOT rely on the agent alone to enforce access control decisions that the Server itself is capable of enforcing. |  |
| ----- | :---- |
| **MUST** | MCP Servers MUST NOT silently change a previously approved Tool's behaviour or description after a Client has connected, without notifying the Client of the change and, where the change is material, requiring the Host to re-confirm consent (guarding against so-called “rug-pull” attacks where a trusted tool's behaviour is altered post-approval). |

<Standard id="MSDAS_MUST_ALL_TOOL_INVOCATIONS_ACCESS_MODIFY_2" type="MUST">
All Tool invocations that access or modify client or whānau data MUST be logged with sufficient detail to identify the requesting agent, the authenticated user on whose behalf it acted, and the data accessed — consistent with MSD's audit logging obligations for client data generally.
</Standard>

### **Publishing MCP Servers**

MCP Servers don't have a static specification artefact in the way OpenAPI or AsyncAPI provide for other API types (see Part D) — capabilities are discovered dynamically at connection time. This doesn't remove the obligation to document the Server for prospective integrators.

<Standard id="MSDAS_MUST_API_PROVIDERS_MCP_SERVER_PUBLISH" type="MUST">
API Providers of an MCP Server MUST publish a capability catalogue — a human-readable list of available Tools, Resources and Prompts with their purpose, required scopes, and any side effects — via the MSD Developer Portal, in addition to the machine-readable discovery the protocol itself provides.
</Standard>

The Business Context, Diagrams, Terms and Conditions, Developer Onboarding and SLA requirements set out in Part D apply equally to MCP Servers as to REST and Asynchronous APIs.

*End of Part C — Part D (API Publishing) follows as a separate section of this standard.*