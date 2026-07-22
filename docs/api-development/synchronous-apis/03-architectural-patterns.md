---
title: "API Architectural Patterns"
---

The table below identifies architectural and deployment patterns that bear further investigation for MSD's API landscape. There are vendor-specific implementations of most of these; this standard does not recommend any particular one.

| Pattern | Description |
| --- | --- |
| Microservices | Independently deployable services, each exposing a narrow, well-defined API, composed to deliver broader capability. |
| API Management | The combined discipline of API gateways and API managers used to publish, secure and govern APIs — see Part B: API Security, Security Reference Architecture. |
| Observability | Structured approaches to monitoring, logging and tracing that let API Providers understand the real-world behaviour of a distributed API landscape. |
| API Publication / Discovery | Approaches for making APIs discoverable to prospective consumers — see Part D: API Publishing. |
| Hybrid Deployments | Patterns for APIs that span on-premises and multiple cloud environments. |
| Service Mesh | Infrastructure-layer handling of service-to-service communication (routing, retries, encryption) independent of application code, typically used within microservice architectures. |
