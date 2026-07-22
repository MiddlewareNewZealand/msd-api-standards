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
