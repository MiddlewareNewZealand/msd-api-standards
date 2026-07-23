---
title: Glossary of Terms
---

- **Authentication** is the process of verifying the identity of a
  consumer (or device) who presents identity credentials and
  authentication key(s);

- **Authentication Authority –** is a system entity that provides
  authentication services to ensure only permitted consumers (or
  devices) gain access

- **Authorisation** is the process of verifying that a consumer (or
  device) has the right to perform an action and what they are allowed
  to access;

- **Availability** is the ability to minimise API downtime by
  implementing threat protection;

- **Confidentiality** is the ability to ensure information that is
  sent between consumers, Applications and Servers is only visible to
  those authorised to use it;

- **Delegation** is when a consumer authorises another consumer (or device) to
  serve as his or her representative for a particular task;

- **Delegated Authorisation** is a framework that defines how an owner
  of a set of resources can grant (delegate) access to a designated
  consumer or consuming application to perform actions on some of those
  resources on the owner’s behalf, but without sharing their
  credentials;

- **Federation** is the process that allows for the leverage and reuse
  of identity credentials across multiple Authentication Authorities for
  authentication and/or Single Sign On;

- **Integrity** is the ability to ensure that information received has
  not been modified by a third party, also providing non-repudiation
  services;

- **Personally Identifiable Information** is defined in section 7(1) of the Privacy Act 2020 as:<br/>
 (a) information about an identifiable individual; and<br/>
 (b) includes information relating to a death that is maintained by the Registrar-General under the Births, Death, Marriages, and Relationships Registration Act 2021 or any former Act (as defined in Schedule 1 of that Act).<br/><br/>
 Individual means a natural person, other than a deceased natural person.

- **Provisioning** is the automated or manual service for aggregating
  and correlating identity data resulting in the creation of consumer (IT)
  accounts and the delivery of consumer meta data used by systems to
  define access policies and controls for services.

- **Threat protection** is the service for protecting APIs (at the
  ingress and egress points of an organisation) from known threats
  (e.g. the OWASP top 10) by preventing misuse or loss of
  availability. Note: Threat protection should also be addressed at
  the OS hardening level and should be an integral part of the API
  software development;

- **User Managed Access** has been developed to provide a user data
  delegation model that enables a resource owner to control the
  authorisation of data sharing and other protected-resource access
  made between online services on the owner’s behalf or with the
  owner’s authorisation by an autonomous requesting party;

- **Consent Management** is the process that manages the collection of
  consumer data, ensuring that the required policies are applied, and the
  required consent has been obtained from the consumer, allowing the consumer
  to understand how the data is used and to be able to opt out if
  required. This is being driven by many global Privacy Laws.

- **Zero Trust (ZT)** is the term for an evolving set of cybersecurity
  paradigms that move network defences from static, network-based
  perimeters to focus on consumers, assets, and resources. A zero-trust
  architecture (ZTA) uses zero-trust principles to plan enterprise
  infrastructure and workflows. Zero trust assumes there is no
  implicit trust granted to assets or consumer accounts based solely on
  their physical or network location

## Roles and components

- **API Provider** is a software application that produces a REST or
  Asynchronous API, publishes it via the Developer Portal, and has
  completed the applicable provider onboarding process;

- **API Consumer** is a software application that consumes a REST,
  Asynchronous or MCP API, having completed an approved consumer
  onboarding process;

- **API Designer** is a developer or architect who designs usable,
  efficient and secure APIs, combining software design skill with
  knowledge of the business context the API serves;

- **API Developer** is a software engineer who designs, builds and
  maintains APIs so that other developers can access data and
  functionality without needing to understand the underlying
  implementation;

- **Application Developer** is a software engineer who designs, builds,
  tests and deploys end-user software applications (e.g. mobile, web or
  enterprise applications) that typically consume APIs rather than
  produce them;

- **Message Producer** is a software application that publishes data
  (events) to API Consumers via an Asynchronous API, for example
  publishing an event when a client's case status changes;

- **Message Broker** is middleware that receives published events or
  messages from a Message Producer and routes them to one or more
  subscribing API Consumers;

## Access control

- **Role Based Access Control (RBAC)** is an authorisation approach
  where access rights are granted based on the roles (often mapped to
  directory groups) that a consumer or account holds;

- **Attribute Based Access Control (ABAC)** is an authorisation approach
  where access is granted based on policies evaluated against
  attributes of the consumer, the resource and the context (e.g. team,
  role, time of day);

- **Discretionary Access Control** is an access model where the owner
  of a resource (or their delegate) decides who is granted access to
  it;

- **Policy Enforcement Point (PEP), Policy Decision Point (PDP), Policy
  Administration Point (PAP) and Policy Information Point (PIP)** are
  the reference-architecture roles defined by XACML: the PEP intercepts
  and enforces access requests, the PDP evaluates policy to reach a
  decision, the PAP authors and manages policies, and the PIP supplies
  the attribute data used in decisions;

## OAuth2 and OIDC flows

- **Authorisation Code Flow** is the OAuth2/OIDC flow where the
  resource owner authenticates and consents, the client receives a
  one-time authorisation code, and then exchanges that code
  server-side for tokens; when combined with PKCE (Proof Key for Code
  Exchange) it is the recommended flow for most MSD APIs;

- **Client Credentials Flow** is an OAuth2 grant used for
  server-to-server (machine-to-machine) access, where the client
  authenticates with its own credentials and receives a token without
  any end-user interaction;

- **Hybrid Flow** is an OIDC flow that combines the Authorisation Code
  Flow with the immediate return of an ID Token (and/or access token)
  from the authorise endpoint;

- **JWT Bearer Assertion Flow** is an OAuth2 extension where a signed
  JWT, created by the client or an Identity Provider, is used to
  authenticate the client and/or obtain a token;

- **SAML Assertion Flow** is functionally equivalent to the JWT Bearer
  Assertion Flow but uses a SAML assertion in place of a JWT;

- **Backend for Frontend (BFF)** is an architecture pattern where a
  backend service proxies all OAuth2/OIDC and resource calls for a
  single-page or native application, keeping tokens out of the browser;

- **Token-Mediating Backend** is a lighter-weight variant of the
  Backend for Frontend pattern where only the OAuth2 token calls, not
  the resource calls, are proxied through a backend;

- **Pushed Authorisation Request (PAR)** is a mechanism where the
  client sends its authorisation request parameters to a dedicated
  back-channel endpoint and receives a short-lived `request_uri` to use
  in place of a long, exposed authorisation URL;

- **JWT Secured Authorisation Response Mode (JARM)** is a mechanism,
  defined by the OpenID Foundation within the Financial-grade API
  (FAPI) working group, that returns the
  authorisation response as a signed and/or encrypted JWT instead of as
  plain query parameters;

## Tokens and session handling

- **Bearer Token** is a token type, typically an access token, that
  grants access to whoever presents it, without requiring further
  proof of ownership;

- **Opaque Token** is a token format that is a random reference string
  carrying no embedded information, requiring the server to look up its
  meaning, for example via Token Introspection;

- **Token Introspection** is the process of checking a token's validity
  and details, for example by calling an introspection endpoint, rather
  than relying on the contents of the token itself;

- **Level of Assurance (LoA)** is a measure of confidence in a claimed
  identity, based on the strength of the authentication and
  identity-verification processes used to establish it;

- **Token Claims (acr, amr, azp)** are claims carried in a token that
  describe the authentication context: `acr` (Authentication Context
  Class Reference) expresses the Level of Assurance achieved, `amr`
  (Authentication Methods Reference) lists which authentication methods
  were actually used (e.g. password, OTP, biometrics), and `azp`
  (Authorised Party) identifies which client is authorised to use a
  token when multiple consumers share a resource owner;

## Architecture and lifecycle

- **Idempotency** is the property of an operation where repeating the
  same request produces the same result as calling it once, a
  requirement for safe retries of GET, PUT and DELETE requests;

- **Optimistic Concurrency Control** is a concurrency strategy that
  checks for conflicts before committing an update, rather than locking
  the resource first;

- **Pessimistic Concurrency Control** is a concurrency strategy that
  locks a resource before an update to prevent conflicting concurrent
  writes;

- **Semantic Versioning (SemVer)** is a version-numbering scheme in the
  form MAJOR.MINOR.PATCH, where each part signals whether a change is
  breaking, additive or a fix;

- **API Gateway / API Management** is the technology and discipline of
  publishing, securing, routing and governing APIs at a central point
  of entry;

## Messaging and async patterns

- **Publish/Subscribe (Pub/Sub)** is a messaging pattern where a
  producer publishes a message once and a broker delivers independent
  copies to any number of decoupled subscribers;

- **Point-to-Point messaging** is a messaging pattern that delivers a
  message to exactly one consumer, often via a queue, with multiple
  consumer instances able to compete for messages to share load;

- **Competing Consumers pattern** is a named pattern where multiple
  instances of a consumer pull from the same queue, so that each
  message is processed once by whichever instance picks it up,
  improving scalability;

- **Request/Reply pattern** is an asynchronous messaging pattern where
  a request is published to one channel and a correlated result is
  returned via a separate reply channel;

- **Eventual Consistency** is a consistency model that guarantees data
  will converge across systems given enough time, without guaranteeing
  it is immediately up to date;

- **Strong Consistency** is a consistency model that ensures all
  consumers see an accurate, up-to-date copy of data with no delay;

- **Event Notification (thin event)** is an event that carries little
  or no data beyond a pointer back to the resource that changed;

- **Event-Carried State Transfer (thick event)** is an event that
  carries enough state for a consumer to act on it without needing to
  query the source system;

- **Delta Event** is an event that describes only the fields that
  changed between two states of a resource, rather than the full
  record;

- **Domain Event and Integration Event** distinguish between events
  intended for internal use only within a system (Domain Event) and
  events designed and published for consumption by external systems
  (Integration Event);

- **CloudEvents** is a CNCF specification that provides a standard
  event envelope (including fields such as id, source, type and
  subject) for interoperable event messages;

## Model Context Protocol (MCP)

- **Model Context Protocol (MCP)** is a protocol that lets AI agents
  dynamically discover and invoke tools, resources and prompts exposed
  by a server, rather than relying on a static specification document;

- **MCP Host, MCP Client and MCP Server** are MCP's three core roles:
  the Host is the AI application the user interacts with, the Client is
  the connector through which the Host talks to a server, and the
  Server is the capability provider;

- **Tools, Resources and Prompts** are MCP's standard capability types:
  Tools are invocable functions, Resources are addressable pieces of
  readable data, and Prompts are reusable, parameterised prompt
  templates;

- **Capability Negotiation** is the dynamic, connection-time process by
  which an MCP Client discovers a Server's available Tools, Resources
  and Prompts;

- **Capability Catalogue** is a human-readable published listing of an
  MCP Server's Tools, Resources and Prompts, their purpose, required
  scopes and side effects, distinct from the machine-readable discovery
  performed via Capability Negotiation;

- **Rug-pull Attack** is a security risk where a previously reviewed
  and approved MCP tool's behaviour or description is silently changed
  after approval, so that it does something different from what was
  trusted;

- **Indirect Prompt Injection** is an attack where malicious
  instructions hidden in content an AI agent reads, rather than
  instructions from its operator, manipulate the agent into taking
  unintended actions;

## Publishing and specifications

- **OpenAPI Specification (OAS)** is the industry-standard,
  machine-readable format for describing the structure, operations and
  schemas of a REST API;

- **AsyncAPI Specification** is a protocol-agnostic, machine-readable
  format for describing message-driven and event-based APIs, analogous
  to the OpenAPI Specification for REST APIs;

- **GraphQL Schema Definition Language (SDL)** is the declarative
  language used to define a GraphQL API's types, fields and structure
  in its self-describing schema;

- **GraphQL Introspection** is a built-in GraphQL capability that lets
  clients query the schema itself, its types and fields, at runtime;
