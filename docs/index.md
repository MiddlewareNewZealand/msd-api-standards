---
title: "Ministry of Social Development API Standards"
sidebar_label: "MSD API Standards"
sidebar_position: 1
slug: /
---

*DRAFT v0.1*

These standards give MSD's API providers and API consumers a shared, practical reference for designing, building, securing and publishing APIs. They exist to help teams across MSD — and the partner agencies, community providers and vendors who integrate with us — build APIs that are consistent, secure, easy to consume and fit for a social sector context.

## Introduction

The standards and guidelines are split into the following parts:

[**Part A: API Concepts and Management**](./api-concepts/index.md)

Part A sets out the business context for APIs and their use within MSD. It covers the principles and considerations involved in producing or consuming APIs, the benefits and pitfalls of doing so, and their value in supporting service delivery and innovation across the social sector.

[**Part B: API Security**](./api-security/index.md)

Part B sets out the API security reference architecture and the technical detail needed to implement API security. It lays out the minimum security requirements for both API providers and consumers, and gives guidance on security best practice — particularly important given the volume of personal and sensitive client information exchanged across MSD's APIs.

[**Part C: API Development**](./api-development/index.md)

Part C sets out technical standards for API development, covering implementation standards for both API developers and the developers of consuming applications.

[**Part D: API Publishing Standards**](./api-publishing/index.md)

Part D sets out standards and guidance for publishing APIs, including onboarding, documentation and lifecycle management.

These standards and guidelines:

- are intended to apply to all API standards and protocols used at MSD, though much of the detailed guidance is oriented towards REST (Representational State Transfer) APIs;

- use hypothetical or illustrative use cases from the social sector — income support, employment services, housing assistance, care and protection — to demonstrate practical application of the concepts described. Examples do not represent MSD's actual API design or data content, and are for illustration only.

## Target audience

### Part A: API concepts and management

Part A is aimed primarily at technical business people who need to understand the value and benefit of APIs and gain an appreciation of what's involved and what needs to be in place. It also provides context for Parts B and C, for enterprise architects, solution architects and API developers.

It may also be of interest to commercial entities, NGOs, iwi and community providers, or other third parties developing — or planning to develop — applications that use MSD or wider government APIs.

### Parts B and C: API security and API development

Parts B and C are aimed primarily at solution designers and API developers working within MSD and its delivery partners. Compliance and assurance staff may also be interested, in terms of assessing alignment with the standards and guidelines.

The main purpose of these standards is to give teams common, default guidance on API implementation that accelerates delivery. Most technical guidance is marked 'recommended' rather than mandatory; exceptions tend to sit in areas of security, authorisation and referenced-standards compliance, where the sensitivity of social sector data leaves little room for discretion.

Teams with existing APIs and established patterns are encouraged to review their current approach against this guidance and consider whether any discrepancies represent a material business or privacy risk. Where change is warranted, a phased approach may be appropriate, balancing the cost of change against the benefit of alignment.

### Part D: API Publishing

Part D is aimed primarily at API providers, and sets out guidance and standards for appropriate API publication.

## Documentation terminology

To improve precision and consistency, these standards adopt the terminology defined in RFC 2119. The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY” and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.
