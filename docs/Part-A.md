---
title: "API Concepts and Management"
sidebar_label: "API Concepts and Management"
sidebar_position: 2
---
# Part A: API Concepts and Management

*DRAFT v0.1*


These standards give MSD's API providers and API consumers a shared, practical reference for designing, building, securing and publishing APIs. They exist to help teams across MSD — and the partner agencies, community providers and vendors who integrate with us — build APIs that are consistent, secure, easy to consume and fit for a social sector context.

## **Introduction**

The standards and guidelines are split into the following parts:

### **Part A: API Concepts and Management**

Part A sets out the business context for APIs and their use within MSD. It covers the principles and considerations involved in producing or consuming APIs, the benefits and pitfalls of doing so, and their value in supporting service delivery and innovation across the social sector.

### **Part B: API Security**

Part B sets out the API security reference architecture and the technical detail needed to implement API security. It lays out the minimum security requirements for both API providers and consumers, and gives guidance on security best practice — particularly important given the volume of personal and sensitive client information exchanged across MSD's APIs.

### **Part C: API Development**

Part C sets out technical standards for API development, covering implementation standards for both API developers and the developers of consuming applications.

### **Part D: API Publishing Standards**

Part D sets out standards and guidance for publishing APIs, including onboarding, documentation and lifecycle management.

These standards and guidelines:

* are intended to apply to all API standards and protocols used at MSD, though much of the detailed guidance is oriented towards REST (Representational State Transfer) APIs;

* use hypothetical or illustrative use cases from the social sector — income support, employment services, housing assistance, care and protection — to demonstrate practical application of the concepts described. Examples do not represent MSD's actual API design or data content, and are for illustration only.

## **Target audience**

### **Part A: API concepts and management**

Part A is aimed primarily at technical business people who need to understand the value and benefit of APIs and gain an appreciation of what's involved and what needs to be in place. It also provides context for Parts B and C, for enterprise architects, solution architects and API developers.

It may also be of interest to commercial entities, NGOs, iwi and community providers, or other third parties developing — or planning to develop — applications that use MSD or wider government APIs.

### **Parts B and C: API security and API development**

Parts B and C are aimed primarily at solution designers and API developers working within MSD and its delivery partners. Compliance and assurance staff may also be interested, in terms of assessing alignment with the standards and guidelines.

The main purpose of these standards is to give teams common, default guidance on API implementation that accelerates delivery. Most technical guidance is marked 'recommended' rather than mandatory; exceptions tend to sit in areas of security, authorisation and referenced-standards compliance, where the sensitivity of social sector data leaves little room for discretion.

Teams with existing APIs and established patterns are encouraged to review their current approach against this guidance and consider whether any discrepancies represent a material business or privacy risk. Where change is warranted, a phased approach may be appropriate, balancing the cost of change against the benefit of alignment.

### **Part D: API Publishing**

Part D is aimed primarily at API providers, and sets out guidance and standards for appropriate API publication.

## **Documentation terminology**

To improve precision and consistency, these standards adopt the terminology defined in RFC 2119\. The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY” and “OPTIONAL” in this document are to be interpreted as described in RFC 2119\.

## **Part A: API Concepts**

Welcome to MSD's API Design and Development Standards. This section is informational and introduces the high-level concepts used throughout the rest of the standards.

This section is relevant to you if you are:

* an API Provider

* an API Consumer

* an API Developer

* an Application Developer

### **1\. Introduction**

The intent of this section is to provide the high-level introductory concepts used throughout these standards.

#### **Scope**

This section contains the business context for API standards and their use within MSD. It describes the value of API standards in supporting consistent, joined-up service delivery across the social sector.

#### **Target audience**

This section is aimed at technical and non-technical people who are developing, or planning to develop, software for MSD and the wider social sector, including:

* API Providers

* API Consumers

* API Developers

* Application Developers

#### **Definitions**

##### **API**

An API is an interface that allows one software application to communicate with another. The communication protocol of APIs is usually agnostic, but the APIs discussed in this document are either:

* Web APIs, or

* APIs accessed via the http(s) protocol.

| INFO An API should not be confused with a service. Web services are APIs, but not all APIs are web services. This document is concerned with web APIs that support interoperability, not with software engineering principles generally. |
| :---- |

##### **Interoperability**

Service delivery across the social sector improves when information is provided or shared seamlessly between the agencies, providers and community organisations working with the same clients and whānau. Interoperability is a key enabler of the connected government New Zealand is building towards. It supports information about a client or whānau being accessible — with appropriate authorisation — to the right people, in the right service, at the right time, reducing the number of times a person has to retell their story to different parts of government. API’s are a key tool to achieve interoperability.

##### **Standards**

A standard is a documented set of the following items that, when used consistently, ensure that products, processes and services developed are fit for purpose and aligned with others across the sector:

* Requirements

* Specifications

* Agreed terms, rules and definitions

* Guidelines

* Characteristics

Standards can be compulsory when referenced in Acts, regulations, or other legislative instruments.

### **2\. Why use standards?**

Standards exist because people across an industry or sector have got together and asked: “what is the best way to do this?” They are developed and agreed so that everyone building supplies, products, processes and services shares the same references, tools, language and taxonomy.

#### **Benefits**

Widespread adoption and use of standards:

* Allows technology to work seamlessly across MSD, partner agencies and community providers.

* Establishes a common language to measure and evaluate performance.

* Means agreements don't just span one team or business unit, but are consistent across MSD and, where relevant, across government.

* Helps ensure MSD is not creating bespoke or proprietary technologies that are costly to maintain and hard to integrate with.

* Makes interoperability between components built by different teams, vendors and agencies possible.

* Protects clients and whānau by embedding best practice around safety, privacy and quality.

The best standards are:

* Focused on people.

* Supportable.

* Appropriate to the context they're applied in.

* Adaptive to present and future needs.

#### **Outcomes**

People are empowered by evidence-based standards with explicit expectations embedded in them, changing behaviour and practice to achieve better outcomes, including:

* Partnering with clients and whānau.

* Working with partner agencies, community and iwi providers, the software industry, and international jurisdictions where relevant.

* Honouring Te Tiriti o Waitangi and its principles of tino rangatiratanga, equity, active protection, options and partnership in the design and governance of data and digital services.

* Encouraging environmental sustainability and meeting climate resilience priorities.

### **3\. Value of API standards**

The full value of API standards is realised when everyone is aligned to them — which is why MSD, its delivery partners and the wider social and government sector need to work together on their adoption.

Facilitating seamless co-operation on providing services via technology is a key enabler  for improving outcomes across the social sector, and for meeting MSD's obligations as a steward of highly sensitive personal data.

#### **MSD's standards kaitiaki**

* Add content here about the entity which governs these standards


#### **Alignment with cross-government interoperability initiatives**

Add content here about alignment

### **4\. Partners**

#### **Standards bodies and agencies**

| Partner | Description |
| :---- | :---- |
| Government Digital Delivery Agency (GDDA) | Sits within the Public Service Commission and holds the Government Chief Digital Officer (GCDO) function (transitioned from the Department of Internal Affairs on 1 April 2026). Sets government-wide digital and data standards, including the Government API Standards and Guidelines that these MSD standards align with. |

#### **Pivotal standards and frameworks**

| Framework | Description |
| :---- | :---- |
| New Zealand Government API Standards and Guidelines | Cross-government standards for designing, securing and publishing APIs, maintained by the Government Digital Delivery Agency (GDDA), which now holds the Government Chief Digital Officer (GCDO) function. These MSD standards are a sector-specific implementation of that guidance. |
| Protective Security Requirements (PSR) / NZISM | Baseline government security requirements that inform MSD's approach to API and information security (see Part B). |

#### **Products and tools**

| Product / tool | Description |
| :---- | :---- |
| Add standards chosen here |  |

### **5\. Standards Component Definitions**

This section provides a list of common API standards components and their associated definitions, adapted for an MSD and social sector context.

#### **API Provider**

An API Provider, in the context of these standards, is a software application:

* That produces a REST or Asynchronous API.

* That can be published via the MSD Developer Portal or an equivalent sector capability.

* That has completed an appropriate API Provider onboarding process.

#### **API Consumer**

An API Consumer, in the context of these standards, is a software application:

* That consumes a REST, Asynchronous or MCP AP provided by MSD.

* That has completed an approved API Consumer onboarding and certification process.

#### **Social Sector Clients and Whānau**

A social sector client, in the context of these standards, is a person interacting — via a software application — with an API Consumer that is consuming an API published on the MSD Developer Portal or equivalent sector capability. This includes individuals accessing income support, employment services, housing assistance or care and protection services, and their whānau.

#### **Social Sector Organisations**

A social sector organisation, in the context of these standards, is any organisation that provides or supports social services. This includes government agencies, community and iwi providers, NGOs, and contracted service providers. Participants in these organisations may use a software application that consumes API’s on behalf of a client or whanau.

#### **Social Sector Workers**

A social sector worker, in the context of these standards, is any person who provides or supports social services. This includes case managers, employment consultants, social workers, community support workers, and other frontline and back-office MSD and partner-agency staff.

#### **API Designers**

An API Designer, in the context of these standards, is a software developer or architect who specialises in designing APIs. API designers work to create APIs that are easy to use, efficient and secure, and typically have a strong understanding of software development principles as well as a good working knowledge of the business context they're designing for.

#### **API Developers**

An API Developer, in the context of these standards, is a software engineer who designs, builds and maintains APIs — the sets of rules that allow different software applications to communicate with each other. API developers create APIs that let other developers access data and functionality without needing to know the underlying implementation.

#### **Application Developers**

An Application Developer, in the context of these standards, is a software engineer who designs, develops, tests and deploys software applications, typically specialising in a particular type of development such as mobile, web or enterprise software.

| Characteristic | API Developer | Application Developer |
| :---- | :---- | :---- |
| Primary focus | Developing APIs | Developing software applications |
| Audience | Other developers | Social sector workers, clients and whānau |
| Example tasks | Design and develop new APIs; maintain and update existing APIs; create API documentation | Gather and analyse user requirements; design and develop software applications; write and test code; debug and fix defects; deploy and maintain applications |

#### **Message Producer**

A Message Producer, in the context of these standards, is a software application that publishes data to API Consumers using Asynchronous APIs — for example, publishing an event when a client's case status changes.

#### **How these components relate**

At a social sector organisation, an API Developer builds and operates an API Provider; an Application Developer builds and operates an API Consumer. The API Developer works through the MSD Developer Portal to publish their API, which is then discoverable and consumable by Application Developers across MSD and its delivery partners.

Social sector clients, whānau, iwi and community providers interact with API Consumers — the applications built on top of MSD's published APIs — rather than with the underlying APIs directly. A Message Producer at a social sector organisation publishes data (for example, a change of circumstances event) to a message broker, which is then consumed by one or more API Consumers.

*End of Part A — Parts B (API Security), C (API Development) and D (API Publishing) follow as separate sections of this standard.*