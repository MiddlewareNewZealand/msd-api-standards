---
title: "API Design"
---

This section sets out the standards required to support MSD and its delivery partners in designing, developing and governing APIs. It's aimed at API developers and API designers.

When reading this section, consider the implications for your team. Fundamentally, APIs should make integration with MSD's systems simple, but more importantly consistent. Application developers invest heavily in using an API — in learning its design and behaviour, in developing and testing around it, and sometimes in building an entire service on top of it. Good API design attracts developers and reduces support burden; poor API design drives away developers and drives up support, maintenance and operating costs.

## **When is an API appropriate?**

The default reaction to a requirement for capability has often been to develop a web application. This is gravitating towards APIs as the default. Below are some situations where an API may be more appropriate than a standalone web application:

- When applications are screen-scraping data from a website

- When MSD holds a single authoritative source of truth for the information

- Where there is a need for real or near-real-time information exchange with a delivery partner

- When parts of a business process are (or may be) outsourced

- When MSD data or a service can be included as part of a larger, cross-agency business process

- When there's a requirement for internal systems to interact with cloud-based SaaS solutions

- Where clients, whānau or providers require easy access to public information

- Where community or delivery partner organisations want to build capability into their own applications that benefits clients (mobile/web apps)

- If other parties are expected to act as agents or intermediaries for services MSD provides

- When multiple service delivery channels are in use

Developing a bespoke application for each of these situations would be expensive and time-consuming. Developing an API instead lets MSD focus on access, quality, integrity and security of its data, while other teams and delivery partners develop applications specific to their own needs. This represents a shift in thinking, from building functionality and applications, to making data available for others to build with.

## **Types of API**

There are several different types of API, and the type chosen may depend on the technical use case applied to both consumption and provision.

| API type | Description | Requirement |
| --- | --- | --- |
| REST | The most common and well-understood API type; an architectural style for building distributed, hypermedia-driven systems, typically with a strongly typed OpenAPI schema. Best suited to synchronous interactions and resource creation/modification (POST, PUT, DELETE) at medium latency. | MAY support |
| GraphQL | An open query and manipulation language letting consumers request exactly the data they need, avoiding REST's tendency to “over-fetch” a whole resource. Well suited to a widely distributed client set with varying data needs, particularly high-read (GET) clients. | MAY support |
| AsyncAPI (Asynchronous APIs) | An open initiative bringing OpenAPI-style standardisation and tooling to event-driven APIs. Suited to asynchronous interactions, event-driven architectures, and APIs fronting workflows or long-running orchestrations — see Part C.2, Asynchronous APIs. | MAY support |
| gRPC | A high-performance RPC framework using Protocol Buffers by default, letting a client call a method on a remote server as if it were local, via a formal Interface Definition Language. | MUST NOT support |
| SOAP | An XML-based protocol from the late 1990s, still in some use. Suited to stateful operations needing contextual and conversational state management, via the WS* structure (security, transactions, coordination) — which a REST approach would otherwise require custom-building. | MAY support, but is deprecated for new NZ Government work — see API Development Industry Standards |

| SCOPE The requirements in this table govern the API surface MSD exposes to API Consumers — the protocol a consuming application is required to speak to integrate with an MSD API. They don't reach into the internal implementation of an API Provider's backend. For example, if a platform vendor's internal event-streaming mechanism happens to use gRPC behind the scenes, that's an internal implementation detail of the platform and isn't itself a breach of the gRPC prohibition — the prohibition applies to MSD publishing a gRPC interface for API Consumers to call directly. Where a platform's only consumer-facing option for a given capability is a protocol this table marks MUST NOT, that capability needs to be fronted by an API Gateway or facade presenting a compliant interface (see API Consumption Patterns, Proxy) rather than exposed as-is. |
| --- |

## **API design principles**

### **Future-focused design**

<Standard id="MSDAS_SHOULD_NOT_APIS_EXPOSE_OBSOLETE_LEGACY_STRUCTURES" type="SHOULD NOT">
APIs SHOULD NOT expose obsolete or legacy structures or functions.
</Standard>

Good API design seeks to avoid future breakage in dependent consumer applications by minimising the functions, data structures and behaviour exposed, while planning for — or at least signalling — foreseeable future change. As with any interface that has to be maintained, less is more when it comes to what's exposed.

### **Layering**

An API is made up of distinct functional layers: security, caching, and representation.

Every API has a security component. This isn't only authentication and authorisation for access to the API; it also includes threat protection (DDoS, SQL injection, cross-site scripting, etc.) and availability/quality of service. It's often cost-effective to build a common framework that handles security across all of MSD's APIs — see Part B: API Security.

Caching can dramatically improve an API's performance. When designing an API, consider what, when and where to cache; understanding how and how often data changes, and which layer is most appropriate to cache at, are both important considerations — see Caching, below.

### **Standards-based**

Web standards have rapidly become powerful agreements spanning not just local regions but international acceptance, enabling commonality and consistency. Using standard HTTP and URLs — the core technologies of the web — along with standards such as JSON and OAuth 2.0, ensures MSD isn't creating bespoke or proprietary technologies. The principle is to build to the latest versions of existing open, accepted standards: HTTP, OpenAPI, AsyncAPI, REST, JSON, OAuth 2.0, and OIDC. See API Development Industry Standards, below, for detail on relevant standards.

## **Designing an API**

When designing an API, perform business process analysis first, so API development is business-driven rather than technology-driven — technology-driven projects rarely meet client or delivery-partner needs in the long run. Co-design with representatives of likely API Consumers is fundamental to getting this right. To identify potential partners to involve, consider: processes that currently depend on information the API could expose; and processes that require a capability the API could expose.

Focus early conversations on extracting true requirements through functional analysis (use cases) and data flow analysis, rather than getting drawn into developers' proposed technical solutions. Security and information privacy impacts — particularly important given the sensitivity of client and whānau information — must be identified up front and addressed early in the design process.

A common pitfall is mapping existing data tables directly onto resources and building CRUD operations over them; this usually produces a poor API design tightly coupled to the underlying data structure. Another is designing an API as a thin extension of a monolithic legacy system, which tightly couples the API to that system. Both pitfalls create long-term problems for API Providers and Consumers alike.

Agility matters more than completeness early on: share draft interface specifications with delivery partner developers and iterate quickly on their feedback. The right design will likely not please every developer — a reasonable rule of thumb is that the design is on the right track if most developers are a little unhappy but all can still achieve their aims. Start simple, focused on a single channel or interaction, and let the API evolve towards broader capability over time rather than trying to build for every use case from day one.

## **Design-driven development**

<Standard id="MSDAS_MUST_BUILDING_APIS_DESIGN_DRIVEN_APPROACH" type="MUST">
When building APIs, a design-driven approach MUST be taken, comprising: interface specification first; an iterative design approach; and continuous integration/deployment/testing.
</Standard>

### **Interface specification first**

The best way to design an API is in collaboration with potential API Consumers. Creating the interface specification first makes it easier for application developers to see what the API will offer and how it could be used, and their early feedback confirms the design is heading in the right direction. See Interface Specification, below.

### **Iterative approach**

Big-bang releases rarely deliver business or client benefit. An iterative approach, with ongoing releases offering gradual improvement, gives a better sense of momentum, illustrates progress, and lets delivery partners coordinate their own efforts with MSD's API development. The API is a product whose capabilities should undergo continuing improvement based on consumer feedback, performance analytics and emerging needs.

### **Automation first**

Automation gives fast turnaround on informing API developers about breaking changes as code is submitted to a shared codebase, via an automated, integrated build process that flags anything broken. Tests written against the interface specification early in development — using stubs or mocks — can be incorporated into this automated build, giving early warning of regressions. API code <Standard inline id="MSDAS_SHOULD_NOT_API_CODE_PROGRESS_UNTIL_PASSES_TESTS" type="SHOULD NOT" toolTip="API code should not progress through delivery environments until it passes automated tests.">SHOULD NOT</Standard> progress through delivery environments until it passes automated tests.

## **Granularity**

APIs <Standard inline id="MSDAS_SHOULD_APIS_DESIGNED_LOWEST_PRACTICAL_GRANULARITY" type="SHOULD" toolTip="APIs should be designed at the lowest practical level of granularity.">SHOULD</Standard> be designed at the lowest practical level of granularity, since this makes each resource simpler and allows resources to be combined in ways that suit the application developer, rather than tying them to a specific sequence of calls just because that's how the back end happens to be built.

Too fine-grained a resource forces consuming applications to make many more calls to collect the information they need (“chatty” communication). Too coarse-grained a resource (returning everything about it) can produce enormous response payloads that may not suit every consumer's needs, and become cumbersome to maintain. Varying granularity may be needed within a single API depending on purpose — for example, a coarse-grained resource for posting a new case file as a bundle of content (notes, documents, keywords, supporting information), but separate, fine-grained sub-resources for adding comments to that file.

Aim for a granularity that prevents business logic leaking into the API — for example, requiring calls to be made in a specific sequence to satisfy an internal business process. This puts the onus on the application developer to get the sequence right, risks inconsistent data if they don't, and tightly couples the consuming application to MSD's internal process, so that any future change to that process has a downstream impact on every application developer.

General guidelines: don't aim for the finest possible granularity — build around each discrete, updatable resource; there doesn't need to be a one-to-one mapping between a manual service and a corresponding API, since APIs should support a process rather than encapsulate it; a rough guide is one API operation per entity lifecycle state transition; resources can be identified by reviewing a business process and identifying the key entities that underpin it; there should be only one API operation for one business outcome (e.g. change an address); and query parameters can be used to vary the granularity returned from a single resource (e.g. /appointments returns a list, while /appointments?$summary returns a summarised view).

## **Interface specification**

An API represents a contract between the API Provider and API Consumer for access to the provider's resources. Because API consumption is a programmatic exercise, a clear definition of what the API offers and how those resources are accessed — the interface specification — is essential.

The specification <Standard inline id="MSDAS_SHOULD_SPECIFICATION_DESIGNED_ADVANCE_DEVELOPING_API" type="SHOULD" toolTip="The interface specification should be designed in advance of developing the API.">SHOULD</Standard> be designed in advance of developing the API: working through it typically surfaces issues that would otherwise affect the underlying resource-handling code, and it lets application developers review the capabilities on offer against their needs before they start building. Where API development is outsourced, the interface specification can be written in abstract as a means of defining what the vendor should build; it's version-controllable and can serve as the primary API documentation.

<Standard id="MSDAS_MUST_OPENAPI_SWAGGER_USED_INTERFACE_SPECIFICATION" type="MUST">
OpenAPI/Swagger MUST be used as the interface specification language for all synchronous APIs being developed.
</Standard>

Several API modelling languages exist — some proprietary (RAML, API Blueprint), some machine-readable but not human-readable (WADL) — but OpenAPI is the most widely used open standard, offering a programming-language-agnostic (JSON/YAML) interface that both humans and computers can use to discover and understand an API's capabilities.

## **Orchestration**

As a general rule, using APIs as an orchestration tool isn't recommended, due to the architectural complexity this can introduce. That said, simple orchestration may sometimes be appropriate — for example, a “mashup” API creating a new logical resource by combining related data held in two or more backend systems. A mashup isn't appropriate where it merges two genuinely distinct API products together; if a consumer needs that functionality, the mashup should be performed by the consuming application instead. Other simple orchestration examples include mediation such as message transformation (JSON to XML, or canonical message model transformation).

## **Software Development Kits (SDKs)**

<Standard id="MSDAS_SHOULD_API_PROVIDERS_OFFER_SDK" type="RECOMMENDED">
It's recommended that API Providers offer an SDK to developers of consuming applications.
</Standard>

An SDK is the implementation toolset for using MSD's APIs: it lets developers build applications faster without needing to understand every detail of the API, and should include sample code demonstrating the API's functionality.

<Standard id="MSDAS_SHOULD_ONCE_API_FIT_STATE_OFFERED" type="SHOULD">
Once an API is in a fit state to be offered to consumers, the API definition SHOULD be published to the MSD Developer Portal or equivalent social sector capability. The primary way developers discover an API is via this catalogue, so an external API MUST be well documented there, with accurate and up-to-date guidance.
</Standard>
