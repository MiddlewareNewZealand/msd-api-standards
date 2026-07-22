---
title: "Synchronous vs. asynchronous interaction"
---

A typical synchronous REST interaction is a request/response exchange: an API Consumer sends a request and waits for the API Provider to respond, usually within a few seconds, and there is only ever one consumer per request.

An asynchronous interaction is different: it's typically a “fire and forget” model, where an API Provider publishes an event to an intermediary — a message broker or queue — and one or more API Consumers process that event later, often in near real-time. The API Provider publishes once; the broker is responsible for routing the event to every interested consumer.

<Standard id="MSDAS_SHOULD_PUBLISH_SUBSCRIBE_RECOMMENDED_DEFAULT" type="RECOMMENDED">
For MSD's social sector data-sharing use cases, the Publish/Subscribe pattern is the recommended default — see Async Patterns.
</Standard>
