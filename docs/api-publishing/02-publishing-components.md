---
title: "Publishing Components"
---

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

The API Provider can choose the diagram type that best represents their API, though UML sequence diagrams are recommended. Diagrams <Standard inline id="MSDAS_SHOULD_DIAGRAMS_AVAILABLE_WEB_EXPERIENCE" type="SHOULD" toolTip="API diagrams should be available via a web experience.">SHOULD</Standard> be available via a web experience.

### **Developer documentation**

<Standard id="MSDAS_MUST_API_PROVIDERS_PUBLISH_DEVELOPER_DOCUMENTATION" type="MUST">
API Providers MUST publish developer documentation covering the technical constructs of their API — for example, where API Consumers are required to behave in a certain way when accessing the API.
</Standard>

For example, an API supporting field-level encryption of sensitive client data should clearly document both the mechanism and the effect of that encryption. Code snippets are useful wherever complex consumer-side logic is required. Developer documentation <Standard inline id="MSDAS_SHOULD_DEVELOPER_DOCUMENTATION_AVAILABLE_WEB" type="SHOULD" toolTip="Developer documentation should be available via a web experience.">SHOULD</Standard> be available via a web experience.

## **Terms and conditions**

<Standard id="MSDAS_MUST_API_PROVIDERS_PUBLISH_TERMS_CONDITIONS" type="MUST">
API Providers MUST publish terms and conditions that set out the rules API Consumers must agree to when using the API. These SHOULD be available via a web experience.
</Standard>

## **Developer onboarding**

<Standard id="MSDAS_MUST_API_PROVIDERS_PROVIDE_DEVELOPER_ONBOARDING" type="MUST">
API Providers MUST provide a developer onboarding function enabling API Consumer developers to create and manage client application credentials and request application-level access to APIs.
</Standard>

This <Standard inline id="MSDAS_SHOULD_DEVELOPER_ONBOARDING_AUTHENTICATED_WEB" type="SHOULD" toolTip="The developer onboarding function should be made available via an authenticated web experience — the MSD Developer Portal is the preferred mechanism.">SHOULD</Standard> be made available via an authenticated web experience — the MSD Developer Portal is the preferred mechanism.

## **Service level agreements (SLA)**

<Standard id="MSDAS_MUST_API_PROVIDERS_PUBLISH_SERVICE_LEVEL" type="MUST">
API Providers MUST publish service level agreements defining their commitments and the corresponding expectations for API Consumers.
</Standard>

Common SLAs include: API availability (uptime); latency; and request throughput (requests permitted in a given timeframe).

<Standard id="MSDAS_MAY_API_PROVIDERS_OFFER_SLA_TIERING" type="MAY">
API Providers MAY offer SLA tiering, applying different SLAs to different consumers — for example, a higher tier for a client-facing application, and a lower tier for a non-critical back-office integration.
</Standard>

SLAs <Standard inline id="MSDAS_SHOULD_SLAS_AVAILABLE_WEB_EXPERIENCE" type="SHOULD" toolTip="SLAs should be available via a web experience.">SHOULD</Standard> be available via a web experience.
