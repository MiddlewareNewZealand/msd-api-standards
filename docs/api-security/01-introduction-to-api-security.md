---
title: "Introduction to API Security"
---

According to Gartner, API abuses are one of the most frequent attack vectors for enterprise web application data breaches. Securing RESTful APIs is therefore fundamental to any API strategy, and any approach should include three key areas: the Domain of Consideration, the Domain of Control, and an identity-centric, holistic view.

## **Domain of Consideration**

Developing and securing RESTful APIs is more than just applying standards; it's a framework and a state of mind that must be understood and followed jointly by API Providers and API Consumers. The API security framework must be defined at the organisation and business level, and should always consider who, how and what clients, whānau and applications (both internal and external to MSD) will interact with the APIs.

These considerations should be defined at the start of any project and driven from a desired business outcome — for example, providing real-time information about the nearest Work and Income service centre and its opening hours.

The Domain of Consideration involves three actors — the Application Developer, the API Developer, and the Social Sector Participant (client, whānau member, provider or social sector worker) — who collaborate within the overall social sector digital ecosystem.

```plantuml alt="Diagram showing the actors within the Domain of Consideration"
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

rectangle "Social Sector Digital Ecosystem" {
    component "API" as API
    actor "Application Developer" as APPD
    actor "API Developer" as APID
    actor "Social Sector Participant" as SSP
    APPD .[#green,dashed,thickness=8].> API
    APID .[#green,dashed,thickness=8].> API
    SSP .[#green,dashed,thickness=8].> API
}
@enduml
```

<DetailedDescription text="This shows the three actors in the Domain of Consideration — the Application Developer, the API Developer, and the Social Sector Participant — who each interact with the API within the overall social sector digital ecosystem." />

## **Domain of Control**

The Domain of Control contains the components that need to be developed, deployed and work together to provide API security, supporting:

* Registered application developer access to the API

* Authenticated and authorised consuming application access to the API or its events

* Protected communication between the API, the event broker and the consuming application, ensuring confidentiality and integrity

* The ability for applications to act on behalf of a client or whānau member

Within the Domain of Control, the key components are: the API Consumer (the client-facing application); the API Developer Portal (where developers register and access documentation); the API Manager (used to configure and deploy APIs); the API Gateway (which routes requests and enforces access control); and the backend application or service that holds the underlying business logic and data.

## **Identity-centric and holistic view**

The security of APIs shouldn't be seen as a bounded solution — that is, limited only to the components listed above — but needs to be seen from a holistic perspective. Security design must take into account the full context that exists around the domain of control, especially the different contexts on the API consumer side. It must do this appropriately and proportionately to the functionality and information that the API provides.

Authentication and authorization of user identities remains the key control plane for API’s \- those disciplines as appropriate point both at the API consumer application/organisation and at the individual end user.

Access to APIs that handle non-public information should not be provided to all comers, assurance can be achieved by measuring the trustworthiness of potential api consumer organisations. Audit can also be valuable as a technique in this area.
