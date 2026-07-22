---
title: "Publish/Subscribe (Pub/Sub)"
---

<Standard id="MSDAS_SHOULD_API_PROVIDERS_USE_PUB_SUB" type="SHOULD">
API Providers SHOULD use the Pub/Sub pattern for integration event messages published within the social sector, as it's best suited to increasing interoperability.
</Standard>

An API Provider publishes events to be delivered to none, one, or many consumers, decoupling the producer from consumers via a message broker. The provider has no concern with whether a message was received; each subscriber gets its own copy of the message. For example, when a client's entitlement status changes, the event might be routed to a central reporting system, the client's assigned service centre, and a partner agency system — each receiving its own copy.

Use this pattern when: broadcasting to a significant number of consumers; integrating independently-developed systems on different platforms; no real-time response is required from consumers; the systems involved support eventual consistency; or no acknowledgement of receipt is required.
