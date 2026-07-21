---
title: "API Publishing"
sidebar_label: "API Publishing"
---

**Ministry of Social Development**

**API Design and Development Standards**

Part D: API Publishing

*DRAFT v0.1*

# **Contents**

# **Part D: API Publishing**

This section is aimed primarily at API Providers, and sets out guidance and standards for appropriately publishing APIs so that API Consumers — across MSD, delivery partners, and the wider social sector — can discover, understand and safely integrate with them.

# **1\. Introduction**

API publishing is the process of making an API available to API Consumers — developers, delivery partners, and third-party providers — for consumption. It means exposing the functionality of a system or service in a structured, accessible way, so other applications can interact with it programmatically.

Publishing an API well matters for several reasons:

## **Interoperability**

APIs let different and multiple systems communicate regardless of their underlying technology, promoting the integrated, cohesive social sector digital ecosystem MSD is building towards.

## **Scalability and flexibility**

Exposing functionality through APIs lets MSD and its delivery partners scale services more efficiently — adapting and evolving offerings by building on existing infrastructure rather than redesigning systems from scratch.

## **Innovation and collaboration**

Publishing APIs empowers developers — within MSD, at partner agencies, and at community and iwi providers — to build new applications and services on existing capability, fostering collaboration and faster delivery.

## **Improved client and staff experience**

APIs enable richer, more joined-up experiences for clients, whānau and frontline staff by combining functionality from multiple sources into a single interface or application.

## **Delivery partner ecosystem**

Publishing APIs encourages a community of other agencies, delivery partners and developers to form around MSD's platform — contributing complementary applications, sharing knowledge, and feeding back into continuous improvement.

## **Standardisation and best practice**

Well-designed APIs that follow established standards and best practice are easier to integrate, understand and use — reducing development time and cost for MSD and for the partners building on top of its APIs.

## **Enhanced security and control**

Publishing APIs through a managed process lets MSD maintain control over how its services are accessed. Security measures — authentication, authorisation, rate limiting — protect against unauthorised access. Onboarding processes ensure API Consumers agree to terms of use, and can include conformance or compliance testing. Service level agreements, such as request quotas and rate limiting, protect against abuse.

# **2\. Publishing Components**

## **API specification**

An API specification is the blueprint for an API: a document, or collection of documents, describing how it functions and how applications can interact with it. It's both a technical reference for API Consumer developers and a design, implementation and testing artefact for the API Provider.

<Standard id="MSDAS_MUST_API_PROVIDERS_FOLLOW_SPECIFICATION_DRIVEN" type="MUST">
API Providers MUST follow a specification-driven development approach (see Part C, API Design).
</Standard>

See OpenAPI Specifications and AsyncAPI Specifications below.

## **API documentation**

An API specification goes a long way toward documenting an API, but consumers typically also need contextual information to build effectively on top of it.

### **Business context**

<Standard id="MSDAS_MUST_API_PROVIDERS_CAPTURE_BUSINESS_CONTEXT" type="MUST">
API Providers MUST capture the business context of a published API — how it fits into MSD's broader business processes and use cases — to help consumers use it effectively.
</Standard>

<Standard id="MSDAS_SHOULD_BUSINESS_CONTEXT_AVAILABLE_VIA_WEB" type="SHOULD">
Business context SHOULD be available via a web experience, e.g. the MSD Developer Portal.
</Standard>

### **Diagrams**

<Standard id="MSDAS_MUST_API_PROVIDERS_PROVIDE_DIAGRAMS_DESCRIBING" type="MUST">
API Providers MUST provide diagrams describing an API Consumer's journey when interacting with the published API.
</Standard>

The API Provider can choose the diagram type that best represents their API, though UML sequence diagrams are recommended. Diagrams SHOULD be available via a web experience.

### **Developer documentation**

<Standard id="MSDAS_MUST_API_PROVIDERS_PUBLISH_DEVELOPER_DOCUMENTATION" type="MUST">
API Providers MUST publish developer documentation covering the technical constructs of their API — for example, where API Consumers are required to behave in a certain way when accessing the API.
</Standard>

For example, an API supporting field-level encryption of sensitive client data should clearly document both the mechanism and the effect of that encryption. Code snippets are useful wherever complex consumer-side logic is required. Developer documentation SHOULD be available via a web experience.

## **Terms and conditions**

<Standard id="MSDAS_MUST_API_PROVIDERS_PUBLISH_TERMS_CONDITIONS" type="MUST">
API Providers MUST publish terms and conditions that set out the rules API Consumers must agree to when using the API. These SHOULD be available via a web experience.
</Standard>

## **Developer onboarding**

<Standard id="MSDAS_MUST_API_PROVIDERS_PROVIDE_DEVELOPER_ONBOARDING" type="MUST">
API Providers MUST provide a developer onboarding function enabling API Consumer developers to create and manage client application credentials and request application-level access to APIs.
</Standard>

This SHOULD be made available via an authenticated web experience — the MSD Developer Portal is the preferred mechanism.

## **Service level agreements (SLA)**

<Standard id="MSDAS_MUST_API_PROVIDERS_PUBLISH_SERVICE_LEVEL" type="MUST">
API Providers MUST publish service level agreements defining their commitments and the corresponding expectations for API Consumers.
</Standard>

Common SLAs include: API availability (uptime); latency; and request throughput (requests permitted in a given timeframe).

<Standard id="MSDAS_MAY_API_PROVIDERS_OFFER_SLA_TIERING" type="MAY">
API Providers MAY offer SLA tiering, applying different SLAs to different consumers — for example, a higher tier for a client-facing application, and a lower tier for a non-critical back-office integration.
</Standard>

SLAs SHOULD be available via a web experience.

# **3\. OpenAPI Specifications**

| INFO All components of the OpenAPI Specification are supported by this standard and should be interpreted as a MAY unless stated otherwise below. |
| :---- |

OpenAPI Specification Structure:

| Component | Description | Requirement |
| :---- | :---- | :---- |
| OpenAPI specification | The core specification. | All mandatory fields defined in the specification itself |
| Property descriptions | Human-readable description of each property. Should be verbose enough for a reader to understand the property's purpose. | MUST be provided for all properties |

## **Servers property**

<Standard id="MSDAS_MUST_SERVERS_PROPERTY_DEFINING_LIST_ENDPOINTS" type="MUST">
The servers property, defining the list of endpoints where the API can be accessed, MUST be included.
</Standard>

| servers:   \- url: https://api.msd.govt.nz/income-support/v1     description: MSD Income Support API   \- url: https://api-test.msd.govt.nz/income-support/v1     description: MSD Income Support API (test) |
| :---- |

## **Info section**

The info section of an OpenAPI specification contains details on the API Provider.

| Property | Description | Requirement |
| :---- | :---- | :---- |
| info.title |  | MUST |
| info.description | See Property Descriptions. | MUST |
| info.license |  | info.license.name MUST; info.license.url MUST |
| info.version | The version of the OpenAPI document (not the API or OpenAPI spec version). | MUST |
| info.contact | Mechanism for contacting the API Provider. | info.contact.name MUST; info.contact.url MUST |
| info.termsOfService | Link to the API's terms of service. | SHOULD |

## **External documentation**

<Standard id="MSDAS_SHOULD_EXTERNALDOCS_PROPERTY_REFERENCING_SUPPORTING_DOCUMENTATION" type="SHOULD">
The externalDocs property, referencing supporting documentation for the API, SHOULD be included.
</Standard>

## **Paths section**

The paths section is a parent property containing the resource paths in the API and the properties associated with each.

| Property | Description | Requirement |
| :---- | :---- | :---- |
| `{path}.summary` | Short, human-readable summary of the resource's purpose. | MUST |
| `{path}.description` | See Property Descriptions. | MUST |
| `{path}.{verb}.summary` | Short summary of the operation's purpose. | MUST |
| `{path}.{verb}.security` | The security scheme appropriate for the path/verb. | MUST |
| `{path}.{verb}.operationId` | A unique string identifying the operation. | MUST |
| `{path}.{verb}.requestBody` | The request body for the operation. | MUST for POST/PUT/PATCH; MUST NOT for GET/DELETE/HEAD/OPTIONS |
| `{path}.{verb}.responses` | The responses an API Consumer can expect. | MUST |

### **Security**

<Standard id="MSDAS_MUST_OPENAPI_SPECIFICATIONS_DEFINE_APPROPRIATE_SECURITY" type="MUST">
OpenAPI Specifications MUST define appropriate security mechanisms. Security schemes MUST be defined in components.securitySchemes and referenced in all API operations.
</Standard>

Even a public operation (e.g. a health-check or metadata endpoint) SHOULD still carry a security property, set explicitly to empty.

```yaml
paths:
  /status:
    summary: Service status endpoint
    get:
      security: []
      summary: Return the service's current status
```

Example security schemes:

```yaml
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: x-api-key
      in: header
    oauth-client-credentials:
      type: oauth2
      description: Client credentials flow for system-to-system auth
      flows:
        clientCredentials:
          tokenUrl: https://auth.msd.govt.nz/realms/msd-integration/protocol/openid-connect/token
          scopes:
            system/Client.r: Grant read access to Client resources
            system/Client.c: Grant create access to Client resources
            system/Client.u: Grant update access to Client resources
            system/Client.rs: Grant read and search access to Client resources
```

### **Responses**

<Standard id="MSDAS_SHOULD_PATH_VERB_RESPONSES_INCLUDE_ALL" type="SHOULD">
`{path}.{verb}.responses` SHOULD include ALL responses by HTTP status code, and MUST include error responses, referring to an error schema where possible.
</Standard>

```yaml
responses:
  '200':
    description: Request succeeded
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Client'
  '400':
    description: Bad request - validation failed
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
  '404':
    description: Client not found
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
```

<Standard id="MSDAS_SHOULD_NOT_API_PROVIDERS_INCLUDE_DEFAULT_RESPONSE" type="SHOULD NOT">
API Providers SHOULD NOT include a default response. Although OpenAPI supports it, an explicit, complete response list is preferred.
</Standard>

### **Request body**

<Standard id="MSDAS_MUST_OPENAPI_SPECIFICATION_DEFINES_POST_PUT" type="MUST">
Where an OpenAPI Specification defines a POST, PUT, or PATCH operation, it MUST include a requestBody property, which SHOULD reference a schema defined in components.
</Standard>

## **Components section**

### **Parameters**

<Standard id="MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_DEFINE_REUSABLE_PARAMETERS" type="SHOULD">
OpenAPI specifications SHOULD define reusable parameters under components.parameters.
</Standard>

```yaml
components:
  parameters:
    clientId:
      name: clientId
      in: path
      description: Unique identifier for a client, host/clients/{clientId}
      required: true
      schema:
        type: string
```

### **Schemas**

<Standard id="MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_USE_SCHEMA_REFERENCES" type="SHOULD">
OpenAPI specifications SHOULD use schema references under components.schemas to define content, and MAY use nested schema references for reusable elements.
</Standard>

### **Examples**

<Standard id="MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_DEFINE_REUSABLE_EXAMPLES" type="SHOULD">
OpenAPI specifications SHOULD define reusable examples under components.examples.
</Standard>

## **Property descriptions**

Property descriptions are for API Consumer developers to understand the purpose of a specification property. Description fields support CommonMark syntax, which SHOULD be used, as it renders correctly in most OpenAPI tooling.

## **OpenAPI validation**

<Standard id="MSDAS_MUST_OPENAPI_DOCUMENT_PASS_VALIDATION_AGAINST" type="MUST">
The OpenAPI document MUST pass validation against the OpenAPI specification, e.g. using the Swagger Editor or an equivalent tool, ideally as part of an automated pipeline or developer IDE integration.
</Standard>

# **4\. AsyncAPI Specifications**

The AsyncAPI Specification describes and documents message-driven APIs in a machine-readable, protocol-agnostic format — usable for APIs over AMQP, MQTT, WebSockets, Kafka, HTTP and more (see Part C, Asynchronous APIs, Protocols and APIs).

AsyncAPI specification structure:

| Component | Description | Requirement |
| :---- | :---- | :---- |
| AsyncAPI specification | The core specification. | All mandatory fields defined in the specification itself |
| Property descriptions | Human-readable description of each property. | MUST be provided for all properties |

## **AsyncAPI section**

<Standard id="MSDAS_MUST_ASYNCAPI_PROPERTY_INDICATING_SPECIFICATION_VERSION" type="MUST">
The asyncapi property, indicating the specification version in use, MUST be included.
</Standard>

## **Info section**

| Property | Description | Requirement |
| :---- | :---- | :---- |
| info.title | The title of the API. | MUST |
| info.description | See Property Descriptions. | MUST |
| info.license |  | info.license.name MUST; info.license.url MUST |
| info.version | The version of the API. | MUST |
| info.contact | Mechanism for contacting the API Provider. | info.contact.name MUST; info.contact.url MUST |

## **Servers section**

| Property | Description | Requirement |
| :---- | :---- | :---- |
| servers.url | The API Provider host. | MUST |
| servers.protocol | The protocol supported by this host. | MUST |
| servers.security | The security mechanisms usable with this server. | MUST |
| servers.description | Additional information, e.g. the environment. | SHOULD |

## **Channels section**

Holds the relative paths to individual channels and their operations — channels are also known as topics, routing keys, event types, or paths (see Part C, Topics and Subscriptions). Note that the structure of this section changed significantly between AsyncAPI versions 2 and 3\.

* The address field (v3+) MUST contain the topic name. In v2, this MUST be included in the description field instead.

* The servers field MUST indicate which servers the channel is available on.

* The messages field (v3+) MUST represent the messages published to a channel. In v2, the message field under publish or subscribe MUST be used.

## **External docs section**

<Standard id="MSDAS_MUST_EXTERNALDOCS_URL_LINK_FURTHER_DOCUMENTATION" type="MUST">
externalDocs.url, a link to further documentation about the API, MUST be provided.
</Standard>

## **AsyncAPI validation**

<Standard id="MSDAS_MUST_ASYNCAPI_DOCUMENT_PASS_VALIDATION_AGAINST" type="MUST">
The AsyncAPI document MUST pass validation against the AsyncAPI specification, ideally as part of an automated pipeline or developer IDE integration.
</Standard>

# **5\. Diagrams**

Effective use case diagrams document an API's behaviour in an easily human-readable way. Technical components and the parties involved in the API's execution are shown as actors, so the reader can focus on the overall flow and the interactions between them.

When creating use case diagrams, consider:

* Actors — the people, systems and organisations involved in the use case.

* Relationships — how the actors relate to one another.

* Purpose — the role each actor plays.

## **Example**

The table below sets out an example use case for an MSD Entitlement Status API, helping delivery partner developers understand the API's overall purpose.

| Actor | Relationship | Purpose |
| :---- | :---- | :---- |
| Aroha Ngata | The MSD client | Aroha applies for and receives a change to her Jobseeker Support entitlement |
| Case Manager | Aroha's assigned case manager at her local service centre | Assesses and updates Aroha's entitlement status |
| MSD Case Management System | The system used by the case manager | Publishes entitlement status change events to the API |
| Entitlement Status API | Interface for accessing entitlement status information | The MSD API exposing entitlement status to authorised consumers |

<Standard id="MSDAS_SHOULD_DIAGRAM_TYPE_AT_API_PROVIDER" type="SHOULD">
The diagram type is at the API Provider's discretion, though UML sequence diagrams are recommended (see Publishing Components, Diagrams).
</Standard>

**\*\*\*\*add sequence diagram example**

# **6\. Business Context**

The business context section of an API's documentation sets out the business outcomes achieved through use of the API, its value proposition, and the wider context for developers and integrating parties. It can include background information useful to consumers, and typically links forward to relevant use case diagrams.

## **Example**

**\*\*\*Add business context diagram**

The following illustrates business context provided alongside an MSD Client Support Plan API.

| EXAMPLE This project established an API to serve as the system of record for Client Support Plans and related case management resources. The API stores information for clients receiving a planned, tailored programme of employment or income support — covering the core resource types Client, SupportPlan, CaseNote, and Consent. Support Plans are authored by case managers, starting from a standard MSD baseline plan template then tailored to the specific needs of the client and their circumstances. Once stored, the Support Plan can be accessed by other members of the client's case team as needed, via any system or application authorised to consume the API. The initial source of this data is MSD's core Case Management System. |
| :---- |

# **7\. Publishing MCP Servers**

MCP Servers (see Part C, MCP APIs) don't have a static specification artefact in the way OpenAPI and AsyncAPI provide for REST and event-driven APIs — an MCP Client discovers a Server's Tools, Resources and Prompts dynamically at connection time, rather than reading a specification document in advance. This doesn't remove the obligation to document the Server for the people building on it.

## **Capability catalogue**

<Standard id="MSDAS_MUST_API_PROVIDERS_MCP_SERVER_PUBLISH_2" type="MUST">
API Providers of an MCP Server MUST publish a capability catalogue — a human-readable listing of available Tools, Resources and Prompts, each with its purpose, required scopes, and any side effects (particularly for Tools that write data or trigger real-world actions) — via the MSD Developer Portal, in addition to the protocol's own machine-readable discovery.
</Standard>

The catalogue serves the same purpose for MCP that an OpenAPI specification serves for a REST API: it lets a prospective integrator or reviewer understand what the Server can do, and what it would mean to grant an agent access to it, without needing to connect a live Client first.

## **Existing publishing components still apply**

The remaining Publishing Components set out earlier in this Part apply equally to MCP Servers as to REST and Asynchronous APIs:

* Business Context — what business outcome the Server's capabilities support, and for whom.

* Diagrams — a sequence diagram showing a typical agent interaction is particularly valuable for MCP, since the flow (discovery, tool selection, invocation, confirmation) is less familiar to reviewers than a REST request/response.

* Terms and Conditions and Developer Onboarding — including any additional attestations required before an MCP Client is authorised to connect, given the broader autonomy an agent has relative to a conventional application.

* Service Level Agreements — published as for any other API Provider.

