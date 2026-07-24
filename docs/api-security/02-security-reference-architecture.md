---
title: "Security Reference Architecture"
---

This section describes an API Security Reference Architecture and its component parts, to inform the construction of an API security framework.

REST, GraphQL and AsyncAPI (see Part C) are different architectural models for building synchronous and asynchronous APIs that can all leverage the security controls (e.g. OAuth 2.0 and OpenID Connect) defined in this Part; but each also has its own intrinsic security model (e.g. throttling considerations specific to GraphQL) that isn't covered here.

## **Actors and security functional capabilities**

Identity and access management defines the actors (users and devices) who interact with system components that manage and expose APIs. A typical model of API components (the “support stack”) and actors groups into: Social Sector Participants — clients, whānau, providers and social sector workers; API Consumers — the browser-based, mobile and server applications used to access MSD's APIs; API Monitoring, Analytics and Policy Definition — the API Developer Portal, API Manager and API Gateway used to manage and govern APIs; API Documentation — the AsyncAPI and OpenAPI specifications published for developers; and Internal Staff and External Developers — the application developers, API developers, and business and security owners who build and consume MSD's APIs.

The components defined remain valid regardless of the API hosting architecture used (internal, cloud, or hybrid).

```plantuml alt="Diagram showing the API Security Reference Architecture components and actors"
@startuml

skinparam {
    defaultFontColor #1c5773
    defaultBackgroundColor #d7f8ff
    defaultComponentColour #61d9de
    defaultActorColour #61d9de
    defaultFontSize 16
    defaultArrowThickness 6
    actorStyle awesome
    linetype polyline
}

rectangle "API Security Reference Architecture" {
    actor "Internal Staff and\nExternal Developers" as DEV
    actor "Social Sector Participants" as SSP
    component "API Consumer" as AC
    component "API Portal" as PORTAL
    component "API Manager" as MANAGER
    component "API Gateway" as GATEWAY
    component "Event Broker" as BROKER
    component "Credential Stores" as CREDS

    DEV .[#green,dashed,thickness=8].> PORTAL
    SSP .[#green,dashed,thickness=8].> AC
    AC .[#green,dashed,thickness=8].> GATEWAY
    MANAGER .[#green,dashed,thickness=8].> GATEWAY
    GATEWAY .[#green,dashed,thickness=8].> CREDS
    GATEWAY .[#green,dashed,thickness=8].> BROKER
}
@enduml
```

<DetailedDescription text="This shows Social Sector Participants using an API Consumer to send requests to the API Gateway, which enforces policy configured via the API Manager, looks up credentials in the Credential Stores, and routes events to the Event Broker, while Internal Staff and External Developers register and discover APIs through the API Portal." />

| Core component | Description |
| :---- | :---- |
| API Portal | Provides discovery of APIs, analytics to monitor usage, access to specifications and SLAs, and support for the development, build and test of consuming applications. |
| API Manager | Provides centralised API administration and governance for API catalogues, registration and onboarding of API developer communities, API lifecycle management, and security policy definition and evaluation. |
| API Gateway | Acts as the point of access for exposed APIs. Enforces threat protection, throttling and quota management; provides authentication and authorisation services; enforces security policy; and provides monitoring and analytics. |
| Event Broker | Responsible for receiving events (messages) from publishers and delivering them to subscribers who have registered interest — see Part C, Asynchronous APIs. Brokers often store events until delivered, making event-driven architectures resilient to failure. Examples include RabbitMQ, Apache Kafka and Solace. |
| API Documentation | OpenAPI (REST APIs) and AsyncAPI (message and event-based APIs) documentation specifications in a machine-readable format — see Part D, API Publishing. |
| API Monitoring and Analytics | Lets business owners and security specialists monitor uptake of API services, decide when to deprecate an old version, profile usage for business and security baselines, and detect and respond to security events. |
| Credential Stores | Identity and key stores used to securely store internal and external user objects (and groups), API keys, secrets and certificates. Used by the API Gateway for authorisation and authentication services. |

These functions can be delivered via discrete applications, bespoke code, commercial off-the-shelf products, or by leveraging existing devices configured to provide them — some functionality may overlap or be combined depending on the vendor. Not every function is required for every API: for example, a purely public, read-only API may only need threat protection (denial-of-service prevention), delivered via an existing service protection capability.

<Standard id="MSDAS_MUST_API_PROVIDERS_IMPLEMENT_DEVELOPER_AUTHENTICATION" type="MUST">
API Providers must implement Developer Authentication, together with authentication and authorisation services to control access to APIs (see API Authentication and Authorisation Basics, below).
</Standard>

The support stack may also be split, with one set of components supporting internal API usage and a separate set supporting external use, depending on individual circumstances — for example, where API development is outsourced, the ‘internal’ functional stack may sit with the outsourcer.

The decision to split the support stack should take into account dogfooding \- the principle that internal developers should use the same API’s that external consumers use.
