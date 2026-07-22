---
title: "API Governance"
---

API governance ensures MSD's APIs are built proactively to achieve specific goals and deliver value to both providers and consumers. It also helps MSD make informed decisions about its API programme and establish consistent practice for building, deploying and consuming APIs.

MSD API governance should include:

- Specification and resource definitions — governing API contracts and resource definitions to improve consistency and reuse.

- Style and pattern guidelines — standardising API design so APIs remain consistent and usable.

- Automation — templates and pipelines that make it easier to comply with policy than not (for example, scaffolding that automatically wires in security and audit logging, or pipelines that enforce coding standards and security scans).

- Lifecycle management — governing an API from publication through versioning, deprecation and retirement.

- Tracking and analytics — visibility into where APIs are deployed, who is using them and how.

- A robust code review process — development using a branch strategy with at least one peer review required before merge and deployment.

Governance works best as a collaborative process: the more aligned MSD's API designers and developers are on these standards, the more efficient and successful the API programme will be. This is particularly important given MSD's API programme spans multiple business groups (income support, employment, housing, and care and protection) and delivery partners.

****** Include this in governance playbook section as well as reference architecture

Dogfooding is a well-established, practical principle which earns its place for concrete reasons:

- **Quality forcing function** — if MSD's own case management tools have to consume the same client/entitlement APIs as external delivery partners, any friction, gap or bad design gets felt and fixed internally before it becomes a delivery partner's problem.  
- **Holistic demand management** — if internal traffic bypasses the gateway (e.g. direct database or service calls), MSD loses visibility into true combined load, and capacity/throttling decisions made against external-only metrics will be wrong.  
- **No back-door security posture** — internal consumption through the same authenticated, audited path as external consumption means there's one security model to reason about, not two.  
- **Better prioritisation signal** — usage analytics (Part D, Publishing Components) actually reflect total demand, not just external demand, which matters for SLA and roadmap decisions.

*******
