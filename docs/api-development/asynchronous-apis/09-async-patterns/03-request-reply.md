---
title: "Request/reply"
---

Used for “command” messages, where the sender expects a result or confirmation back. An API Consumer publishes a request (for example, generate_client_summary) to a request channel; a service processes it and publishes the result to a corresponding reply channel, which the original consumer subscribes to.

This is well suited to processing that may take longer than a typical HTTP request duration — for example, generating a complex case summary that aggregates data from multiple systems — or to downstream services that are rate-limited and can only process a constrained level of concurrency.
