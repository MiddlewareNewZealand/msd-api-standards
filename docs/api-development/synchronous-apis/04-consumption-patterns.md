---
title: "API Consumption Patterns"
---

<Standard type="INFO">
The patterns documented here reflect a small number of patterns MSD is expected to use initially. This list is expected to grow as MSD's API programme matures.
</Standard>

## **Direct**

The API service is hosted and published from the primary environment in which the MSD Developer Portal capability is implemented. MSD internal application developers,  social sector participant application developers or delivery partner application developer accesses the API directly via MSD's API Gateway; MSD's own operations team manages the API Management and Developer Portal components; and MSD API developers use the Developer Portal to publish and maintain their APIs.

## **Proxy**

An API service hosted and published by an external delivery partner, using API management they own, is republished via MSD's Developer Portal, which routes (proxies) incoming traffic through to the partner's service under MSD's governance. In this pattern, both MSD's own API Gateway/Developer Portal and the delivery partner's API Gateway/service implementation are involved: consumers connect to MSD's Gateway as normal, and MSD's API Management routes and monitors traffic through to the partner's implementation, while the partner's own developers and operations staff manage their side directly.

The Proxy pattern lets MSD present a consistent, governed front door to consumers even where the underlying capability is actually delivered by a delivery partner, community provider, or other agency system.

```plantuml alt="Diagram contrasting the Direct and Proxy consumption pattern topologies"
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

rectangle "Direct Pattern" {
    actor "Application Developer" as AD1
    component "MSD API Gateway" as GW1
    component "MSD Developer Portal" as DP1
    component "MSD-owned API Provider" as AP1
    AD1 .[#green,dashed,thickness=8].> GW1
    GW1 .[#green,dashed,thickness=8].> AP1
    DP1 .[#green,dashed,thickness=8].> AP1
}

rectangle "Proxy Pattern" {
    actor "Application Developer" as AD2
    component "MSD API Gateway" as GW2
    component "Delivery Partner API Gateway" as PGW
    component "Delivery Partner Service" as PS
    AD2 .[#green,dashed,thickness=8].> GW2
    GW2 .[#green,dashed,thickness=8].> PGW
    PGW .[#green,dashed,thickness=8].> PS
}
@enduml
```

<DetailedDescription text="In the Direct pattern, consumers reach an MSD-owned API Provider entirely through MSD's own API Gateway and Developer Portal. In the Proxy pattern, consumers still connect to MSD's API Gateway, but MSD routes traffic through to the delivery partner's own API Gateway and service, so MSD's governance boundary stops at the front door." />
