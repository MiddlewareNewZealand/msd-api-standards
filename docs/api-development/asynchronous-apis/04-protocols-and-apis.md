---
title: "Protocols and APIs"
---

<Standard id="MSDAS_SHOULD_API_PROVIDERS_AIM_SUPPORT_MANY" type="SHOULD">
API Providers SHOULD aim to support as many transport protocols as reasonably possible, so API Consumers can use whichever best suits their own infrastructure.
</Standard>

| Protocol | Description | Requirement |
| --- | --- | --- |
| MQTT | Lightweight protocol for low-bandwidth, high-latency networks; supports all Async Patterns below. | SHOULD support |
| AMQP | Open-standard protocol for reliable, high-performance, interoperable messaging via brokers. | SHOULD support |
| WebSockets | Bidirectional, real-time communication over a single long-lived HTTP connection. | SHOULD support |
| HTTP | Limited scalability for async use; typically shifts long-polling from the API to the broker. | MAY support, e.g. for legacy integration |
| Proprietary (e.g. broker-specific formats) | Vendor-specific messaging protocols. | MAY be used, but MUST NOT be the only protocol offered |
| JMS (Java Message Service) | Common Java interface for creating, sending and receiving messages. | MAY be offered |

<Standard id="MSDAS_SHOULD_PUBLISH_MESSAGES_USING_JSON" type="RECOMMENDED">
It's recommended to publish messages using JSON as the data serialisation format, given its low barrier to entry, human readability, and broad native language support, over alternatives like Protocol Buffers or FlatBuffers.
</Standard>
