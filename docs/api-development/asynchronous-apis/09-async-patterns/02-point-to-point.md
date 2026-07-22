---
title: "Point to point"
---

Delivers a message to a single API Consumer in a one-to-one exchange, typically via a queue: the message is received at most once. For example, a nightly reconciliation event queue consumed solely by MSD's own data warehouse.

Use this pattern when: there's only ever one consumer; fault tolerance matters, since a message stays on the queue until successfully processed; or high-concurrency processing is required, since competing consumer instances can share the load (each message processed by exactly one instance, often round-robin) — note that message ordering needs separate handling if it matters to the use case.
