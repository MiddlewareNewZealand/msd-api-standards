---
title: "API Security"
sidebar_label: "API Security"
sidebar_position: 3
---
# Part B: API Security

*DRAFT v0.1*

This section is aimed at API Providers and API Consumers. It provides detailed standards to help teams build and publish secure APIs, and sets out the rules for API consumption.

This section is relevant to you if you are:

* an API Provider

* an API Consumer

* an API Developer

* an Application Developer

| INFO A client or whānau member may be using an MSD self-service channel directly, interacting with MSD staff in person or via a communication channel, using an external self-service API consumer application, or interacting with an external person who uses an external API consumer application.    |
| :---- |

## **1\. Introduction to API Security**

According to Gartner, API abuses are one of the most frequent attack vectors for enterprise web application data breaches. Securing RESTful APIs is therefore fundamental to any API strategy, and any approach should include three key areas: the Domain of Consideration, the Domain of Control, and an identity-centric, holistic view.

### **Domain of Consideration**

Developing and securing RESTful APIs is more than just applying standards; it's a framework and a state of mind that must be understood and followed jointly by API Providers and API Consumers. The API security framework must be defined at the organisation and business level, and should always consider who, how and what clients, whānau and applications (both internal and external to MSD) will interact with the APIs.

These considerations should be defined at the start of any project and driven from a desired business outcome — for example, providing real-time information about the nearest Work and Income service centre and its opening hours.

The Domain of Consideration involves three actors — the Application Developer, the API Developer, and the Social Sector Participant (client, whānau member, provider or social sector worker) — who collaborate within the overall social sector digital ecosystem.

\*\*Add diagram?

### **Domain of Control**

The Domain of Control contains the components that need to be developed, deployed and work together to provide API security, supporting:

* Registered application developer access to the API

* Authenticated and authorised consuming application access to the API or its events

* Protected communication between the API, the event broker and the consuming application, ensuring confidentiality and integrity

* The ability for applications to act on behalf of a client or whānau member

Within the Domain of Control, the key components are: the API Consumer (the client-facing application); the API Developer Portal (where developers register and access documentation); the API Manager (used to configure and deploy APIs); the API Gateway (which routes requests and enforces access control); and the backend application or service that holds the underlying business logic and data.

### **Identity-centric and holistic view**

The security of APIs shouldn't be seen as a bounded solution — that is, limited only to the components listed above — but needs to be seen from a holistic perspective. Security design must take into account the full context that exists around the domain of control, especially the different contexts on the API consumer side. It must do this appropriately and proportionately to the functionality and information that the API provides.

Authentication and authorization of user identities remains the key control plane for API’s \- those disciplines as appropriate point both at the API consumer application/organisation and at the individual end user.

Access to APIs that handle non-public information should not be provided to all comers, assurance can be achieved by measuring the trustworthiness of potential api consumer organisations. Audit can also be valuable as a technique in this area.

## **2\. Security Reference Architecture**

This section describes an API Security Reference Architecture and its component parts, to inform the construction of an API security framework.

REST, GraphQL and AsyncAPI (see Part C) are different architectural models for building synchronous and asynchronous APIs that can all leverage the security controls (e.g. OAuth 2.0 and OpenID Connect) defined in this Part; but each also has its own intrinsic security model (e.g. throttling considerations specific to GraphQL) that isn't covered here.

### **Actors and security functional capabilities**

Identity and access management defines the actors (users and devices) who interact with system components that manage and expose APIs. A typical model of API components (the “support stack”) and actors groups into: Social Sector Participants — clients, whānau, providers and social sector workers; API Consumers — the browser-based, mobile and server applications used to access MSD's APIs; API Monitoring, Analytics and Policy Definition — the API Developer Portal, API Manager and API Gateway used to manage and govern APIs; API Documentation — the AsyncAPI and OpenAPI specifications published for developers; and Internal Staff and External Developers — the application developers, API developers, and business and security owners who build and consume MSD's APIs.

The components defined remain valid regardless of the API hosting architecture used (internal, cloud, or hybrid).

| Core component | Description |
| :---- | :---- |
| API Portal | Provides discovery of APIs, analytics to monitor usage, access to specifications and SLAs, and support for the development, build and test of consuming applications. |
| API Manager | Provides centralised API administration and governance for API catalogues, registration and onboarding of API developer communities, API lifecycle management, and security policy definition and evaluation. |
| API Gateway | Acts as the point of access for exposed APIs. Enforces threat protection, throttling and quota management; provides authentication and authorisation services; enforces security policy; and provides monitoring and analytics. |
| Event Broker | Responsible for receiving events (messages) from publishers and delivering them to subscribers who have registered interest — see Part C, Asynchronous APIs. Brokers often store events until delivered, making event-driven architectures resilient to failure. Examples include RabbitMQ, Apache Kafka and Solace. |
| API Documentation | OpenAPI (REST APIs) and AsyncAPI (message and event-based APIs) documentation specifications in a machine-readable format — see Part D, API Publishing. |
| API Monitoring and Analytics | Lets business owners and security specialists monitor uptake of API services, decide when to deprecate an old version, profile usage for business and security baselines, and detect and respond to security events. |
| Credential Stores | Identity and key stores used to securely store internal and external user objects (and groups), API keys, secrets and certificates. Used by the API Gateway for authorisation and authentication services. |

These functions can be delivered via discrete applications, bespoke code, commercial off-the-shelf products, or by leveraging existing devices configured to provide them — some functionality may overlap or be combined depending on the vendor. Not every function is required for every API: for example, a purely public, read-only API may only need threat protection (denial-of-service prevention), delivered via an existing service protection capability.

<Standard id="MSDAS_MUST_API_PROVIDERS_IMPLEMENT_DEVELOPER_AUTHENTICATION" type="MUST">
API Providers must implement Developer Authentication, together with authentication and authorisation services to control access to APIs (see API Authentication and Authorisation Basics, below).
</Standard>

The support stack may also be split, with one set of components supporting internal API usage and a separate set supporting external use, depending on individual circumstances — for example, where API development is outsourced, the ‘internal’ functional stack may sit with the outsourcer.

The decision to split the support stack should take into account dogfooding \- the principle that internal developers should use the same API’s that external consumers use.

## **3\. API Authentication and Authorisation Basics**

Before looking at the technical solutions to API authentication and authorisation, this section will provide an introduction that illustrates some of the situations where authentication and authorisation are appropriate.

Authorisation and authentication are intrinsically linked within the OAuth 2.0 framework, which is itself widely regarded as synonymous with securing APIs. This section provides a high-level introduction to OAuth 2.0 and the authentication and authorisation patterns MSD APIs should follow.

### **Authentication**

<Standard id="MSDAS_MUST_APPROPRIATE_AUTHENTICATION_ACHIEVED_ACCESSING_APIS" type="MUST">
Appropriate authentication must be achieved when accessing APIs.
</Standard>

When securing APIs, authentication identifies the social sector participants and/or API Consumers who want to access or use an API. Authentication enables the API Provider to identify all consumers of an API and confirm that the consumer requesting access is who they say they are. This doesn't automatically authorise them to access the API or the underlying resources.

Providers should define a registration process for each category of API Consumer or social sector participant. Understanding who or what is using an API matters at every stage of the API lifecycle — including deprecation and outage notification — and lets the provider apply different service levels to different consumers. Requiring application developers to register also means they must agree to terms and conditions covering how they use API data, and commit to their consumer behaving in an acceptable, non-abusive way that preserves the privacy of the information owner.

#### **Authentication mechanisms**

MSD APIs may use a range of authentication mechanisms, each suited to a different risk and consumer context:

| Mechanism | Recommended usage |
| :---- | :---- |
| Anonymous | Not recommended, except for genuinely low-risk, publicly available information. |
| Username and password (direct authentication) | Not recommended for production; may be used for testing and development only. |
| API Key | Recommended for all APIs, particularly system-to-system integration. |
| Mutual certificates (mTLS) | Common for business-to-business integration; in use across the NZ public sector for high-trust B2B channels. |
| OAuth 2.0 | Recommended for public and internal APIs. |
| OAuth 2.0 \+ OpenID Connect (OIDC) | Recommended wherever an OpenID Connect Provider is available, and required for any API exposing personal or sensitive client information. |

#### **Anonymous authentication**

<Standard id="MSDAS_SHOULD_NOT_ANONYMOUS_ACCESS_USED_OTHER_THAN" type="SHOULD NOT">
Anonymous access should not be used other than for genuinely low-risk, public information.
</Standard>

Anonymous authentication is where the client and the API Consumer they're using can access APIs without authenticating in any way.

<Standard id="MSDAS_MAY_ANONYMOUS_ACCESS_USED_RISK_ASSOCIATED" type="MAY">
Anonymous access may be used when the risk associated with the API is negligible — for example, an API offering publicly available service-centre location information.
</Standard>

The downside of this model is that it makes it difficult to gather effective analytics, and therefore to understand the implications of proposed changes to, or deprecation of, an API.

<Standard id="MSDAS_MUST_USING_ANONYMOUS_AUTHENTICATION_MODEL_API" type="MUST">
If using the anonymous authentication model, the API must implement appropriate protection against typical API vulnerabilities and threats, as listed on the OWASP API Security site — in particular, throttling to prevent denial-of-service attacks, and payload, header and query-parameter analysis to block attacks such as cross-site scripting, SQL injection, command injection and cross-site request forgery.
</Standard>

#### **Username and password authentication**

<Standard id="MSDAS_SHOULD_NOT_USERNAME_PASSWORD_DIRECT_AUTHENTICATION_USED" type="SHOULD NOT">
Username and password (direct) authentication should not be used for production APIs.
</Standard>

In this model — also known as HTTP Basic or Digest Auth — the user authenticates via an identity store using username and password credentials over HTTPS.

<Standard id="MSDAS_MAY_THERE_POSSIBLY_SOME_LEGACY_SITUATIONS" type="MAY">
There are possibly some legacy situations where an API Provider may implement this pattern, but this must be treated as an exception and recorded appropriately.
</Standard>

This model has significant limitations: it requires a full registration process for every user type; it can't leverage a federated authentication model (no single sign-on); passwords travel and may be stored in ways vulnerable to brute-force attack; and passwords have low entropy, must be reset and managed, and are hard to revoke at a granular level.

<Standard id="MSDAS_MAY_MODEL_USED_TESTING_DEVELOPMENT_PURPOSES" type="MAY">
This model may be used for testing and development purposes. Note the related [SHOULD NOT guidance](#MSDAS_SHOULD_NOT_MODEL_USED_PRODUCTION_APIS) below — it should not be used for production APIs.
</Standard>

<Standard id="MSDAS_SHOULD_NOT_MODEL_USED_PRODUCTION_APIS" type="SHOULD NOT">
This model should not be used for production APIs. Note the related [MAY guidance](#MSDAS_MAY_MODEL_USED_TESTING_DEVELOPMENT_PURPOSES) above — it may be used for testing and development purposes.
</Standard>

#### **API Key authentication**

<Standard id="MSDAS_SHOULD_API_KEYS_USED_UNIQUE_ASSIGNED" type="SHOULD">
API Keys should be used, and should be unique, assigned to an application, developer or organisation.
</Standard>

API Keys are a digital authentication mechanism, typically an opaque value such as a GUID. The usual practice is for an application developer to obtain a key for their API Consumer from the API Provider, through an onboarding process.

<Standard id="MSDAS_MUST_API_KEYS_USED_WHEREVER_SYSTEM" type="MUST">
API Keys must be used wherever system-to-system authentication is needed, especially for production-level APIs.
</Standard>
| **MAY**  API Keys may be used on their own for simple public APIs that don't need more complex authentication models. |

The risk is that anyone holding a copy of the API Key can use it as though they were the legitimate API Consumer. All communications must therefore be over TLS to protect the key in transit, and application developers are responsible for protecting their copy of the key.

<Standard id="MSDAS_SHOULD_API_KEY_EMBEDDED_API_CONSUMER" type="SHOULD">
If the API Key is embedded in the API Consumer, it should be protected.
</Standard>
| **INFO** API Keys are recommended because they provide a level of security to public APIs, helping protect against screen-scraping and providing a basis for throttling or billing access to data. MSD should carry out a risk analysis of possible threats against the classification of the data an API exposes, to decide whether API Keys alone are sufficient. |

#### **Certificate (mutual) authentication**

<Standard id="MSDAS_MAY_MODEL_USED_API_DEPENDS_LEGACY" type="MAY">
This model may be used where the API depends on legacy authentication mechanisms requiring mutual certificates.
</Standard>

In mutual (certificate) authentication, both the API Consumer and the API Provider hold a digital certificate issued by a mutually trusted Certificate Authority. When the API Consumer makes a request, the server hosting the API presents its certificate; the consumer verifies it and presents its own certificate in turn. Once both sides verify each other's certificate, mutual trust is established and the API Consumer can use the API.

### **Authorisation**

<Standard id="MSDAS_MUST_APPROPRIATE_AUTHORISATION_APPLIED" type="MUST">
Appropriate authorisation must be applied.
</Standard>

Authorisation is the act of performing access control on a resource: defining access rules and policies, and enforcing them. It's the foundation on which a provider grants or denies a consuming application and/or client access to a resource, at whatever level of granularity is appropriate.

Authentication on its own doesn't grant permission to access an API or application — it only validates that a party is who they claim to be. Once a party is authenticated, an authorisation process grants or denies them the right to perform an action or access information. Normally this is applied using either coarse-grained access (typically at the API or API Gateway request point) or fine-grained access (typically at the API Provider's service implementation).

#### **Role Based Access Control (RBAC)**

<Standard id="MSDAS_SHOULD_RBAC_USED" type="SHOULD">
RBAC should be used.
</Standard>

In many organisations a directory service provides authentication, and directory groups then provide authorisation — a form of discretionary access control, where access is granted by applying access control lists directly to users or the groups they belong to. Directory (or LDAP) groups are synonymous with roles and can be used to provide coarse-grained authorisation for MSD APIs.

#### **Scopes (limited fine-grained access)**

<Standard id="MSDAS_MUST_APPROPRIATE_SCOPES_PRESENT_ACCESS_TOKENS" type="MUST">
Appropriate scopes must be present in access tokens when accessing APIs.
</Standard>
| **MAY**  OAuth 2.0 scopes may be used to limit the authorisation granted to the API Consumer by the resource owner. |

Based on the services an API exposes, additional access controls can be applied using scopes — for example, a data service might expose separate read and write scopes, granted to a user based on their directory group. The developer must ensure the minimum privileges are granted to API Consumers needed to complete the requests the user wants carried out.

An API Consumer may invite a client or social sector worker to authorise the application to act on their behalf.

<Standard id="MSDAS_MUST_ORDER_OCCUR_API_CONSUMER_PROVIDE" type="MUST">
In order for this to occur, the API Consumer must provide the authorisation server with the intent of its request.
</Standard>

#### **Attribute Based Access Control (ABAC)**

<Standard id="MSDAS_MAY_API_PROVIDERS_UTILISE_ABAC" type="MAY">
API Providers may utilise ABAC.
</Standard>

ABAC defines an access control process where access is granted based on policies built from attributes — for example, a policy might state that access to a specified resource is only permitted for users in a particular team, who hold a particular role, during business hours. ABAC provides fine-grained authorisation and lets access decisions take account of context, such as the IP address or operating system of the requesting device.

<Standard id="MSDAS_MAY_API_PROVIDERS_IMPLEMENT_ABAC_USING" type="MAY">
API Providers may implement ABAC using XACML, the recognised standard, which provides a reference architecture, a request/response protocol and a policy language built around four services: a Policy Enforcement Point (PEP), Policy Decision Point (PDP), Policy Administration Point (PAP) and Policy Information Point (PIP).
</Standard>

#### **API Gateway**

<Standard id="MSDAS_MAY_API_PROVIDERS_IMPLEMENT_API_GATEWAY" type="MAY">
API Providers may implement API Gateway technology.
</Standard>

Most API Gateways on the market support OAuth 2.0 and can provide authorisation (and authentication) services via a direct connection to an identity store, an identity access management system, or a policy server.

#### **Developer authentication**

<Standard id="MSDAS_MUST_API_PROVIDERS_IMPLEMENT_DEVELOPER_AUTHENTICATION_2" type="MUST">
API Providers must implement Developer Authentication.
</Standard>

Developer authentication should take place at an API Portal (see Security Reference Architecture, above). An API Portal offers an authentication solution for developers to log in with a username and password; once logged in, a developer should be able to browse and discover the APIs available.

API Portals normally require the consuming application developer to provide contact details (e.g. an email address) and register the application they're developing. The Portal should provide registration services for the client application to use, including: API Keys for basic authentication and monitoring; OAuth 2.0 client registration, including management of Client ID and Client Secret; and additional production authentication and authorisation mechanisms as required (e.g. certificate-based).

## **4\. Building Secure APIs**

### **Design principles**

API designers and developers must consider the OWASP Security By Design Principles, and document how these are implemented by their API.

| OWASP principle | Summary |
| :---- | :---- |
| Minimise attack surface area | Every feature added to an application adds risk. Secure development aims to reduce overall risk by reducing the attack surface area. |
| Establish secure defaults | By default, the experience should be secure; it should be up to the user to reduce their security, if they're allowed to at all. |
| Principle of least privilege | Accounts should have the minimum privileges required to perform their business processes. |
| Defence in depth | Where one control would be reasonable, more controls approaching risk from different angles are better. |
| Fail securely | Applications regularly fail to process transactions for many reasons. How they fail determines whether the application is secure. |
| Don't trust services | Do not implicitly trust services or functions supplied from outside the API application boundary. |
| Separation of duties | Administrators should not be users of the application, and vice versa. |
| Avoid security by obscurity | Security through obscurity is a weak control and nearly always fails when it's the only control in place. |
| Keep security simple | Favour straightforward, simple code over overly complex approaches. |
| Fix security issues correctly | Once a security issue is identified, develop a test for it and understand its root cause before fixing it. |

### **General technical security requirements**

API designers and developers must ensure the API implementation adheres to the following best practices.

| Requirement | Description |
| :---- | :---- |
| Encryption of data in transit | All communication between API Consumers and API Providers must be over TLS, to address eavesdropping and man-in-the-middle attacks. |
| Validate all incoming data | All content of all incoming messages must be validated by the API implementation and/or its supporting infrastructure. |
| Forbidden OAuth 2.0 grant types | APIs must not allow use of the OAuth 2.0 Implicit or Resource Owner Password Credential grant types. |
| Validate redirects | OAuth 2.0-protected API servers must check that the redirect\_uri of received authorisation requests is identical to the redirection URI registered for the client, to mitigate redirection to unauthorised URIs. |
| Validate OIDC ID tokens | Consumers of OIDC-secured APIs must validate ID tokens obtained from an authorisation server. |
| Validate OAuth 2.0 access tokens | Consumers of OAuth-protected APIs must validate the issuer, signature, claims and scopes of an access token before use. |
| Short-lived tokens | APIs requiring OAuth 2.0 tokens must issue each token with a short lifetime (in the order of 30 minutes) to minimise the risk from stolen tokens. Where longer access is required, the API must require the use of refresh tokens. |
| Minimal scopes | In line with least privilege, OAuth 2.0 API Consumers should request only the scopes needed for a particular solution domain and context of use. |
| Encrypted token storage | Where an OAuth-protected API Consumer needs to store a token, this must only be done in encrypted local storage. |
| PKCE | OAuth 2.0 API Consumers must use PKCE to prevent cross-site request forgery and authorisation-code injection attacks, where the API Client is a Public Client (a client incapable of maintaining the confidentiality of its credentials, e.g. a browser or mobile app). |

### **Reference resources**

The following are recommended reading for anyone new to API implementation: the OWASP Top Ten (a summary of standard attacks and mitigations); the OWASP REST Security Cheat Sheet (REST-specific risks and how to prevent them); and the OWASP API Security Project (the top 10 API-specific risks). Where an API accepts input parameters, the OWASP Input Validation, Cross-Site Scripting Prevention, SQL Injection Prevention and Query Parameterisation Cheat Sheets are also worth reviewing.

## **5\. Cloud API Security**

| INFO ‘Cloud API’ here means any API which is intended to handle MSD client or whānau information and provides or exposes cloud-deployed data or functions. |
| :---- |

A cloud API's primary purpose may be to expose a specific commercial service, serve as a cross-platform integration point across diverse cloud services, or proxy for an application or service running in a legacy environment. Regardless of purpose, cloud APIs generally involve communication between an API Provider implementation running on shared, as-a-service public infrastructure, and API Consumers sending requests across a public network — which is why the measures below are needed to mitigate the risks inherent in cloud API provision and consumption.

### **Applicability**

This standard applies to all cloud APIs which provide storage and access to MSD information classified above UNCLASSIFIED (see Security Controls, Information Classification), and which provide or expose application functionality or services executing in a commercial cloud computing environment (e.g. AWS, Google Cloud Platform, Microsoft Azure) accessed through public infrastructure.

### **Requirements**

<Standard id="MSDAS_MUST_CLOUD_API_DESIGNERS_DEVELOPERS_ENSURE" type="MUST">
Cloud API designers and developers must ensure the implementation achieves all of the following: robust authentication and authorisation (OAuth 2.0, SSO with OpenID Connect, request-level authorisation); validation of all incoming requests; throttling of API requests and quotas on endpoints that could consume substantial human, compute or data resources; logging of API activity; dependence only on trusted code libraries and packages; a zero-trust model (no session-based authentication such as cookies); filtering of traffic traversing public networks (WAFs and API gateways controlling internet-routed requests); and specific identity and access management policies controlling access to sensitive resources such as credentials, keys and configuration.
</Standard>

### **Further reading**

Recommended references for designing and implementing cloud APIs: the New Zealand Information Security Manual (NZISM); the Protective Security Requirements (PSR); the Center for Internet Security (CIS); the Cloud Security Alliance (CSA); and CERT NZ's Critical Controls.

## **6\. Mapping Standards Components to API Security Framework**

Part A, Standards Component Definitions defines the following components: API Provider, API Consumer, Social Sector Participant, Social Sector Organisation, Social Sector Worker, API Designer, and API Developer.

The two standards MSD should use to protect and secure API resources are OAuth 2.0 and OpenID Connect. OpenID Connect adds identity to the mix and is built on OAuth 2.0, but uses different naming to describe similar capabilities. On top of these, additional standards address further security features and enhancements (see Alternative OAuth 2.0 Grant Flow Extensions, and PAR, JARM and Session Management, below).

### **OAuth 2.0**

OAuth 2.0 defines a foundation for delegated authority that designers and implementers of MSD API solutions should build on. OAuth 2.0 leverages external authentication and authorisation services to let mobile and web applications act with the delegated authority of a client, using security tokens to authorise access to a protected resource without the resource owner having to share their credentials directly.

Although OAuth 2.0 is used in consent and delegation flows, it expects two areas to be covered outside the standard itself: authentication of the end user/resource owner when they log in to provide consent (normally via a redirect), and capture and management of the consent request and approval process, which defines the specific permissions (e.g. read) granted to the client application.

Selecting the right API security architecture should account for: the type of resource being protected (e.g. a client record versus a list of public service centre locations); the risk involved (exposure of personal information); and the application architecture the API is being called from (mobile, native, or web).

#### **OAuth 2.0 versions**

| Version | Summary | When to use |
| :---- | :---- | :---- |
| 1.0a | Derived from the original OAuth 1.0 specification (RFC 5849); an authentication framework for exchange of signed tokens. | Obsolete. Must not be used by MSD APIs. |
| 2.0 | An open standard framework for delegated authorisation based on token exchange (RFC 6749). Not backward-compatible with 1.0; mandates TLS on all connections rather than digital signatures. | The current standard. MSD APIs should use this as the base framework for their API security architecture. |
| 2.1 | Tightens the flows supported by 2.0 and applies additional security by default. | Expected to become the standard. MSD APIs should review and support this specification, and follow its recommendations where it disambiguates 2.0. |

### **OpenID Connect (OIDC)**

OpenID Connect is the recommended security profile for OAuth 2.0 when an API requires stronger authentication — for example, where data flows two ways between the consuming application and the API. It introduces the concept of identity via an ID Token containing information about the end user, which can enhance the onboarding experience, provide single sign-on, secure the transfer of user data, and provide a trust framework for Service and Identity Providers to share consented user data.

OpenID Connect's fundamental security components mirror OAuth 2.0's, just with different names; the significant addition is the ID Token.

| OAuth 2.0 component | OpenID Connect component | MSD standards component | Description |
| :---- | :---- | :---- | :---- |
| Resource Owner | End User | Social Sector Participant | The person with the right to grant an API Consumer access to a protected resource (e.g. information about themselves). |
| Client (Application) | Relying Party | API Consumer | A consuming or third-party application requesting access to a protected resource on behalf of the resource owner, with their consent. |
| OAuth 2.0 / Authorisation Server | OpenID Provider / Authorisation Server | Owned by MSD or a delivery partner | Issues and tracks authorisation codes, access tokens, refresh tokens and ID tokens. |
| Authentication Server | Authentication Server | Owned by MSD or a delivery partner | Not itself an OAuth 2.0/OIDC component, but needed to complete the framework. Responsible for the login page, credential capture, and consent capture and management. |
| Resource Server/Provider | Resource Server/Provider | API Provider | Hosts protected resources and only allows authenticated, authorised clients access, by checking and validating the access token on each incoming request. |

## **7\. Using OAuth 2.0 and OpenID Connect to Secure Your API**

OAuth 2.0 and OpenID Connect are both token-based authorisation frameworks, defined and implemented using grant flow patterns. These define the different types of interaction a client application can perform to gain an access token, and thus access to a protected API.

### **Token types**

| Token type | Description | Requirement |
| :---- | :---- | :---- |
| Authorisation Code | Sent to the API Consumer after the resource owner has authenticated and consented; exchanged with the API Provider for an Access Token. | Must be protected with TLS; must be encrypted when stored; must not be stored once used. |
| Access Token (Bearer) | Returned to the API Consumer and sent to the resource server when requesting a protected resource. | Must be protected with TLS; must be encrypted when stored; should have a lifetime under 60 minutes. |
| Refresh Token | Used to obtain a new Access Token (and possibly a new Refresh Token) once the Access Token has expired. | Must be protected with TLS; must be encrypted when stored; if used in single-page applications, must have a lifetime of 24 hours or less. |
| ID Token | A signed JWT used in OpenID Connect flows, containing metadata used to enhance the security of the token exchange. | Must be used as a detached signature; must be signed with an approved algorithm. |
| API Key | A string used in some scenarios to authenticate the client application to the API. | Should be a 40+ character random string; should have an associated rotation policy (e.g. 6–12 month lifecycle). |

### **Token formats**

| Format | Where used | Recommendation |
| :---- | :---- | :---- |
| Opaque | Authorisation Code, Access Token, Refresh Token | A random, unique string with no embedded user information, mapped by the OAuth 2.0 server to stored information. May be used with UNCLASSIFIED or IN-CONFIDENCE data; if supported, must be used together with the token issuer's /tokeninfo endpoint. |
| JWT | Access Token, Refresh Token, ID Token | Self-contained, storing identity and access information as claims. May be used with UNCLASSIFIED or IN-CONFIDENCE data. |
| JWE (encrypted JWT) | Access Token, Refresh Token, ID Token | A JWT encrypted per RFC 7516\. May be used with UNCLASSIFIED or IN-CONFIDENCE data; must be used where the token itself contains sensitive information or personal data. |

A JWT is made up of three sections separated by a period: a header (token type, signing algorithm, key identifier), a payload (including claims such as subject, issuer, audience, scope and expiry), and a signature used to validate the token. JWTs are preferred where possible because they support client-side introspection without a call back to the authorisation server, carry identity and expiry claims that support fine-grained access control, are digitally signed to prevent tampering, follow a standard cross-vendor format, and can be encrypted where they contain personal information.

### **OAuth 2.0 and OpenID Connect endpoints**

Depending on the grant flow in use, some or all of the following endpoints are exposed by the API Provider.

| Endpoint | Purpose | Key requirements |
| :---- | :---- | :---- |
| /authorize | Redirects the resource owner to the authentication server to log in and consent to the client accessing a protected resource. | Must be protected with TLS; the API Consumer must have registered and been allocated a client ID; PKCE must be used for authorisation code flows; PAR and JARM may be used. |
| /token | Authenticates the API Consumer and, subject to validation, issues Access/Refresh/ID Tokens. | Should be protected with mTLS; proof of possession should be used; client\_secret\_post, client\_secret\_jwt, private\_key\_jwt or tls\_client\_auth should be applied. |
| Redirect endpoint | Receives the response from the authorisation endpoint via HTTP redirect (302). | Must be protected with TLS; PKCE must be used for authorisation code flows; redirect URI validation must be carried out; state and nonce parameters must be included. |
| /revoke | Lets the API Consumer revoke tokens. | Must be provided by the API Provider; must be protected with TLS. |
| /introspect | Lets the resource server or client check whether a token has expired and retrieve other token details. | Should be provided by the API Provider; must be protected with TLS. |
| /userinfo | Uses an access token to retrieve information about the authenticated social sector participant. | Should be provided by the API Provider; must be protected with TLS; the access token used must be validated for validity, issuer and signature. |
| /jwks | Retrieves the API Provider's public keys, used to verify issued token signatures and encrypt ID Tokens. | Must be implemented by the API Provider; is a public endpoint and must be protected with TLS. |
| /par | Pushed Authorisation Request endpoint (see PAR, JARM and Session Management, below). | May be used. |
| /bc-authorize | Client-Initiated Backchannel Authentication (CIBA) endpoint for decoupled authentication. | May be used. |
| /register | Lets relying parties register a client on the authorisation server. | — |
| /.well-known/openid-configuration | Returns the API Provider's OAuth 2.0/OIDC configuration and capabilities, including endpoints, algorithms and grant types. | — |

<Standard id="MSDAS_MUST_API_PROVIDERS_CLEARLY_DEFINE_DOCUMENT" type="MUST">
API Providers must clearly define and document their API Consumer onboarding process and requirements.
</Standard>

### **OpenID Connect**

OpenID Connect adds two capabilities on top of OAuth 2.0: an ID Token, and a Userinfo endpoint. It's invoked using the openid request scope in the initial authorisation call.

<Standard id="MSDAS_MUST_OPENID_CONNECT_USED_ALL_APIS" type="MUST">
OpenID Connect must be used with all APIs that expose IN-CONFIDENCE or more sensitive client and whānau information.
</Standard>

#### **ID Token**

<Standard id="MSDAS_MUST_ID_TOKEN_USED_ALL_APIS" type="MUST">
The ID Token must be used with all APIs exposing IN-CONFIDENCE or more sensitive information.
</Standard>

The ID Token is a JWT containing authenticated user information provided by the OpenID Connect server to the API Consumer. It may be used to enforce finer-grained access controls via additional claims; must be signed by an approved algorithm; should include claims that hash the code, state and access token to protect user integrity; may carry additional non-identity metadata (e.g. session details); must have its issuer, audience, nonce and expiry validated by the API Consumer; and may be encrypted.

<Standard id="MSDAS_MUST_API_PROVIDERS_ENSURE_MINIMUM_NUMBER" type="MUST">
API Providers must ensure only the minimum number of identity attributes needed to meet the API Consumer's request are provided, and must ensure that any ID Token transmitted over TLS via the authorise endpoint does not contain personal or highly sensitive client information (ID Tokens may be returned from the authorise endpoint over TLS, or the token endpoint over mTLS).
</Standard>

#### **Userinfo endpoint and scopes**

The Userinfo endpoint may be exposed by the API Provider, callable with an access token to obtain the same claims provided in the ID Token, or configured to provide additional claims. OpenID Connect introduces additional scopes (e.g. profile, name, email) detailing specific attributes that can be presented in an ID Token.

<Standard id="MSDAS_MUST_API_PROVIDER_ENSURE_CONSENT_SHARE" type="MUST">
The API Provider must ensure consent to share this information has been given by the information owner — typically the client or their authorised representative — and must record any consent and its associated parameters.
</Standard>

### **Grant types**

OAuth 2.0 and OpenID Connect support two client types — Confidential and Public — and eleven grant/response types, each suited to different situations.

<Standard id="MSDAS_MUST_API_PROVIDER_LIMIT_GRANT_TYPES" type="MUST">
The API Provider must limit grant types to those agreed and documented for a given API; the API Consumer indicates its desired grant type via the response\_type parameter in its initial authorisation call.
</Standard>

Confidential clients are websites and services that make secure server-side connections to the OAuth 2.0 server, and can securely store a client secret or JWT; they must be used to secure IN-CONFIDENCE APIs. Public clients — single-page applications, applications running on devices, and applications that cannot protect secrets — may only be used for UNCLASSIFIED APIs.

| Grant / response type | Recommendation |
| :---- | :---- |
| Authorisation Code (OAuth 2.0) | May be used for Confidential Clients; must not be used for Public Clients. |
| Authorisation Code (OIDC) with PKCE | May be used for UNCLASSIFIED APIs, with Native or Single Page Applications. Where a SPA or mobile app lacks a secure Backend for Frontend, PKCE prevents malicious interception of the authorisation code. |
| Hybrid (OIDC) code id\_token token | Should not be used. |
| Hybrid (OIDC) code id\_token | Must be used with IN-CONFIDENCE APIs, with a web application (confidential client). |
| Hybrid (OIDC) code token | Should not be used. |
| Implicit (OAuth 2.0) | Should not be used. |
| Implicit (OIDC) id\_token token, with PKCE | Should not be used. |
| Implicit (OIDC) id\_token | Should not be used. |
| Resource Owner Password Credential | Must not be used. |
| Client Credentials | Should only be used for system-to-system integration; supports confidential clients only. |

#### **Authorisation Code Flow with PKCE**

<Standard id="MSDAS_MUST_OIDC_AUTHORISATION_CODE_FLOW_CODE" type="MUST">
The OIDC Authorisation Code flow (code id\_token) with PKCE must be used when securing IN-CONFIDENCE APIs, together with JWT access and refresh tokens.
</Standard>

This is the most frequently used, and most secure, model for public-facing consumer applications, and can also be used for internal APIs. It's a two-step process: the resource owner authenticates to the API Provider and authorises the API Consumer over TLS; the API Consumer receives a temporary authorisation code; and the API Consumer exchanges that code for an access (and refresh) token over a secure back channel, which may use mTLS.

#### **PKCE**

<Standard id="MSDAS_MUST_PKCE_USED_SECURING_CONFIDENCE_APIS" type="MUST">
PKCE must be used when securing IN-CONFIDENCE APIs.
</Standard>

PKCE (Proof Key for Code Exchange) mitigates man-in-the-middle attacks against the authorisation code flow. The API Consumer creates a random code verifier, applies a hash to produce a code challenge, and sends the code challenge (with hash method) to the API Provider, which stores it. When the API Consumer later exchanges the authorisation code for a token, it includes the original code verifier; the API Provider validates this against the stored code challenge before issuing the access token — confirming the token request came from the original client, not an intercepting party.

For confidential clients using the code flow with PKCE, the refresh token is exchanged over a secure server-side backchannel. For public clients (native or mobile applications), MSD should not use the refresh token flow, since the refresh token would otherwise have to be managed in the browser.

#### **Client Credentials**

The Client Credentials flow should be used for server-to-server integration — for a client that is also the resource owner, needing to access its own data rather than acting on behalf of a client or whānau member (for example, a batch job updating its own configuration). It supports confidential clients only: the client authenticates directly to the /token endpoint with its own credentials and receives an access token without any user interaction, then uses that token to call the resource server, which validates it with the authorisation server on each call. It's recommended for the Authorised Consuming Application pattern (device to API) and for server-to-server (B2B) integration using signed tokens without user interaction.

#### **Client Initiated Backchannel Authentication (CIBA)**

CIBA adds a “decoupled” authorisation flow: rather than redirecting through a browser, a client or whānau member's authentication device (e.g. their phone) is decoupled from the client application and used to perform authentication and consent independently — the client application and authorisation service don't need to run on, or be linked to, the same device.

In CIBA, the initial authorisation call goes to the backchannel authentication endpoint (/bc-authorize); the authorisation server then delegates authentication and consent to the user's authentication device, which accepts or denies the request. The resulting token can be delivered to the client via one of three sub-flows: Poll (the client polls the authorisation server until approval is received), Ping (the client waits to be notified, then requests the token), or Push (the authorisation server pushes the tokens to the client once approval is received).

| INFO CIBA is not yet widely used, and is included here as forward guidance. It's likely to become more common — it's already used in the Payments NZ API Centre Standards — and MSD should watch for adoption in other parts of the NZ public and financial sectors as a signal for when to invest in it. |
| :---- |

## **8\. Alternative OAuth 2.0 Grant Flow Extensions and Web Application Patterns**

### **Assertion grant flows**

The OAuth 2.0 framework has been extended to support authenticating a client to the API Provider's token endpoint using an assertion — a signed package containing identity and security information usable across security domains, both to authenticate the API Consumer and to obtain an access token. Two assertion grant flows are defined: the JWT Bearer Assertion flow and the SAML Bearer Assertion flow.

#### **JWT Assertion Grant Flow**

This flow relies on a trust relationship between the API Provider and the creator of the JWT assertion, which may either be created by the API Consumer itself, or by an Identity Provider.

| JWT creation | Issues | Recommendation |
| :---- | :---- | :---- |
| API Consumer-created JWT | Risk of private key compromise; ongoing key management and rotation burden. | May be used for server-to-server flows, for UNCLASSIFIED APIs. |
| Identity-Provider-created JWT | Requires a trust relationship to be established. | May be used for UNCLASSIFIED APIs where consent isn't required. |

The jwt-bearer flow may also be used alongside authorisation code flows, in which case the JWT is used only to authenticate the client to the API Provider, rather than to obtain the token directly.

#### **SAML Assertion Grant Flow**

Functionally similar to the JWT flow, but using a SAML assertion in place of a JWT.

<Standard id="MSDAS_SHOULD_NOT_SAML_ASSERTION_FLOWS_USED_SERVER" type="SHOULD NOT">
SAML assertion flows should not be used for server-to-server flows, and should not use a client-created assertion model. Note the related [MAY guidance](#MSDAS_MAY_SAML_ASSERTION_FLOWS_USED_UNCLASSIFIED_APIS) below for when they may be used.
</Standard>

<Standard id="MSDAS_MAY_SAML_ASSERTION_FLOWS_USED_UNCLASSIFIED_APIS" type="MAY">
SAML assertion flows may be used for UNCLASSIFIED APIs, and may be used with authorisation code flows for IN-CONFIDENCE APIs where a SAML token-endpoint authorisation model is specifically required. Note the related [SHOULD NOT guidance](#MSDAS_SHOULD_NOT_SAML_ASSERTION_FLOWS_USED_SERVER) above.
</Standard>

### **Web application (browser-based) patterns**

Emerging guidance for OAuth 2.0 in browser-based applications — particularly single-page applications — covers three models: a Backend for Frontend, where all OAuth 2.0 and resource calls are proxied through a backend service; a Token-Mediating Backend, where only the OAuth 2.0 calls are proxied; and a browser-only client, using PKCE with the authorisation code flow rather than the Implicit flow.

#### **Backend for Frontend (BFF)**

<Standard id="MSDAS_MAY_MSD_USE_BACKEND_FRONTEND_PATTERN" type="MAY">
MSD may use the Backend for Frontend pattern for single-page applications that need to support IN-CONFIDENCE APIs, while this guidance remains in draft at the IETF.
</Standard>

In this pattern, a user interacts with the API Consumer application, which communicates with a Backend for Frontend service sitting within the API Provider's (or the consumer's own) infrastructure. The BFF service requests authorisation from the authorisation server, redirecting the user to grant consent; on receiving an authorisation code, it exchanges this for access and refresh tokens on the user's behalf, then uses the access token to retrieve the requested resource, which it returns to the API Consumer application. This keeps tokens out of the browser entirely, closing off the main risk PKCE alone doesn't fully address for sensitive, IN-CONFIDENCE data.

## **9\. Client Authentication and Token Protection**

The role of client authentication in OAuth 2.0 and OpenID Connect is to maintain the integrity and security of the authentication flow, ensuring only authorised API Consumers can interact with API Providers.

<Standard id="MSDAS_SHOULD_ALL_CONFIDENCE_MORE_SENSITIVE_APIS" type="SHOULD">
All IN-CONFIDENCE or more sensitive APIs should be secured using Client Authentication to protect the API endpoints. Tokens issued must be bound to the client.
</Standard>

Four authentication models can be applied to secure the confidential client connection between the API Consumer and the API Provider's token endpoint: Shared Client Secret, JWT-based authentication, Private Key JWT, and Mutual TLS.

### **Shared Client Secret method**

An API Consumer creates a client with an API Provider and is issued a Client ID (used on both the authorise and token endpoints) and a Client Secret (used with the Client ID when exchanging a code for an access token). Both parties must store the shared secret. Two methods exist:

| Method | Description | Recommendation |
| :---- | :---- | :---- |
| client\_secret\_basic | The client ID and secret are Base64-encoded and sent using HTTP Basic authentication. | May be used for UNCLASSIFIED APIs; should not be used for IN-CONFIDENCE APIs or with Public Clients. Confidential clients must securely store these credentials. |
| client\_secret\_post | The client ID and secret are sent in the POST body, perceived as more secure than client\_secret\_basic. | May be used for UNCLASSIFIED APIs; should not be used for IN-CONFIDENCE APIs or with Public Clients. Confidential clients must securely store these credentials. |

### **JWT-based authentication methods**

Two JWT authentication methods provide a higher level of security than the shared-secret methods above.

| Method | Description | Recommendation |
| :---- | :---- | :---- |
| client\_secret\_jwt | Still requires a managed client ID and secret, but the secret is never sent directly — it's used as a symmetric key to sign a JWT (containing the client ID and an expiry) which is presented instead. | May be used for UNCLASSIFIED and IN-CONFIDENCE APIs; may be used with Confidential Clients; should not be used with Public Clients. |
| private\_key\_jwt | Uses asymmetric cryptography rather than a shared secret: the API Consumer holds a private signing key and registers the corresponding public key with the API Provider, which validates the signed JWT. | Should be used when protecting IN-CONFIDENCE APIs via a confidential client; should not be used with Public Clients. Simpler to operate than tls\_client\_auth. |

### **Mutual TLS method**

Two variants add mTLS-based trust between the API Consumer and API Provider: self\_signed\_tls\_client\_auth (a self-signed client X.509 certificate) and tls\_client\_auth (a client X.509 certificate issued by a trusted certificate authority). Both add security by establishing two-way trust, at the cost of additional design complexity.

<Standard id="MSDAS_MAY_SELF_SIGNED_TLS_CLIENT_AUTH_USED_TESTING_DEVELOPMENT_ENVIRON" type="MAY">
self\_signed\_tls\_client\_auth may be used in testing and development environments. tls\_client\_auth may be used in production with a confidential client. Note the related [SHOULD NOT guidance](#MSDAS_SHOULD_NOT_SELF_SIGNED_TLS_CLIENT_AUTH_USED_PRODUCTION) below on when these methods should not be used.
</Standard>

<Standard id="MSDAS_SHOULD_NOT_SELF_SIGNED_TLS_CLIENT_AUTH_USED_PRODUCTION" type="SHOULD NOT">
self\_signed\_tls\_client\_auth should not be used in production. Public clients should not use either mTLS method (self\_signed\_tls\_client\_auth or tls\_client\_auth). Note the related [MAY guidance](#MSDAS_MAY_SELF_SIGNED_TLS_CLIENT_AUTH_USED_TESTING_DEVELOPMENT_ENVIRON) above on when these methods may be used.
</Standard>

### **Token protection**

A major risk with OAuth 2.0 and OpenID Connect is token theft — where a captured access token is used to obtain information from a protected resource. OpenID Connect provides Demonstrating Proof of Possession (DPoP), which strengthens client authentication by linking the access token to the client presenting it via a cryptographic key, rather than treating it as a plain bearer token anyone holding it can use.

| DPoP method | Description |
| :---- | :---- |
| JWK-based Proof of Possession | The API Consumer generates a public/private key pair and a signed DPoP JWT containing its public key. This is sent alongside the token request; the returned access token carries token\_type \= DPoP, binding it to the consumer's public key. The consumer includes a fresh DPoP header (plus the Authorization header) on each resource request, which the provider validates. |
| Certificate-based Proof of Possession | The API Consumer establishes mTLS with the API Provider when requesting the access token; the provider validates the client certificate and issues the token with a claim containing a hash of that certificate. The resource server validates both the token and the client's certificate on each call. This offers a higher level of security than JWK-based PoP, since it also requires mTLS. |
| **MAY**  A DPoP model may be used when protecting IN-CONFIDENCE APIs. Selection of certificate-based or JWK-based PoP should be based on a risk assessment that accounts for the sensitivity of the information exposed by the API. |  |

## **10\. Level of Assurance**

Level of Assurance (LoA) supports the OpenID Connect API security framework by capturing how much confidence an API Provider can have in the identity of the client accessing their service, based on the strength of the authentication and the verification methods used. OIDC communicates LoA to API Providers using the Authentication Context Class Reference (acr) token claim — in effect, a confidence score for identity, with a low LoA appropriate for low-stakes interactions and a high LoA required before, say, changing bank account details for a benefit payment.

An LoA (or acr claim) model helps: mitigate the risk of exposing sensitive data to unauthorised users, by defining a required authorisation strength; provide a stronger authentication model that reduces the attack surface; provide a trust model between API Consumers and API Providers; grant granular access to sensitive data, since higher LoA is required for more sensitive data; and ensure the API Consumer has appropriate authorisation to act on behalf of the client.

<Standard id="MSDAS_MUST_API_PROVIDERS_ADOPT_LEVEL_ASSURANCE" type="MUST">
API Providers must adopt a Level of Assurance model, applied wherever API Consumers access client or whānau records classified as IN-CONFIDENCE or higher, and must indicate the LoA associated with a client's authentication and authorisation process in any issued tokens.
</Standard>

### **LoA claims**

Issued tokens can carry the following claims relating to the strength of user authentication, which the API Provider uses to confirm the level of trust that the user is who they say they are, and what access to grant on that basis.

| Claim | Description | Application |
| :---- | :---- | :---- |
| acr | Authentication Context Class Reference — LoA based on a pre-defined, ordered set of values. | 0 \= no authentication performed, or 1 \= credential only, or 2 \= credential, password and OTP: may be applied to UNCLASSIFIED information, must not be applied to IN-CONFIDENCE information. 3 \= password, OTP and multi-factor authentication required: must be applied to IN-CONFIDENCE information. |
| amr | Authentication Methods References — details the authentication method(s) used, e.g. password, OTP, biometrics. | API Providers define their acr requirements based on this information, enforced by API Consumers. |
| azp | Authorised party — the client ID of the API Consumer. | Used where a single resource owner may be served by multiple API Consumer services. |

### **Aotearoa New Zealand LoA standards**

| INFO MSD should apply the Department of Internal Affairs' Identification Management Standards directly, since these are whole-of-government standards rather than sector-specific. This avoids the need for a bespoke MSD assurance framework and keeps MSD aligned with the rest of the public sector. |
| :---- |

Two key Level of Assurance standards are in use in Aotearoa: the New Zealand Department of Internal Affairs' Identification Management Standards, which define four components — Information Assurance (IA), Binding Assurance (BA), Authentication Assurance (AA) and Federation Assurance (FA); and the US National Institute of Standards and Technology (NIST) Digital Identity Guidelines, which define three levels of confidence — Identity Assurance Level, Authenticator Assurance Level, and Federation Assurance Level.

OpenID Connect and the Financial-Grade API (FAPI) profile also define a Level of Assurance model that API Providers may use to implement the standards above.

## **11\. Consideration of Risks**

| INFO An API offers a direct channel into part of an organisation's resources and information. Most organisations are accustomed to exposing a website with good control over what information is released via that interface; API access is not as visible, so it cannot as easily be observed when information is being incorrectly exposed. |
| :---- |

It's therefore important that API Providers consider their consumers — and the consumers of those consumers — to determine risks and what information should be accessible via APIs.

<Standard id="MSDAS_MUST_API_DESIGNERS_IMPLEMENTERS_SHOW_HOW" type="MUST">
API designers and implementers must show how they have assessed and managed risks associated with their API solution. This assessment should be conducted during API design and be part of ongoing risk assessment of the API and its products. Records of risk assessment, current status and mitigation should be maintained in MSD's risk management systems.
</Standard>

This standard calls for API designers and implementers to show they've considered API security risk mitigation — generally demonstrated by design documentation, or, where mitigations are reused from other solutions, by reference to that solution's documentation or certification.

| Risk category | Consideration that must be shown |
| :---- | :---- |
| Identity & access management | Authentication; authorisation and delegated authority; federation. |
| Confidentiality | How is it assured that a consuming application accesses only permitted API resources? How are consumers assured they're communicating with the intended API Provider? What per-consumer or per-user-per-consumer data access controls does the API need to apply? |
| Integrity | How will the API assure the accuracy, completeness and quality of data, and maintain that over time? How does the solution ensure message content hasn't been tampered with between consumer and provider? |
| Availability / threat protection | What availability service level is required? What threats have been identified? What is the risk assessment of those threats, and what measures will mitigate or manage them? |
| Logging and alerting | How will fraudulent or malicious use of the API be detectable? How will MSD be alerted to malicious use or misuse? How will a trail of an attacker's activity be observed or obtained? |
| Incident management | How will incidents be reported and managed? What protective actions will be available if an incident occurs? |

Evidence of consideration is typically drawn from: API solution architecture documentation, API solution design and/or specification documentation, and operational management plans.

### **API-related risks**

Compared to a web channel, APIs can increase information security risk in a number of ways, including: an expanded attack surface (another way in, and multiple services to potentially exploit); increased consequences of inadvertent exposure of internal data, application functions and architecture; greater consequences if an API is compromised or hijacked and serves malicious payloads to consumers; elevated privacy concerns wherever APIs give access to personally identifiable information; and the potential for bulk retrieval of resources, which, if uncontrolled, could allow large-scale extraction of client or whānau data.

Other API-specific risks include: malware or ransomware uploaded via unvalidated incoming requests; risks relating to lax security practice in cloud and container-based systems; use of resource-create/update operations to introduce misinformation or overload MSD's services (denial of service); wildcard search parameters flowing through to backend datastores, causing excessive load or over-disclosure; cross-site scripting and SQL injection via unvalidated inputs; HTTP Parameter Pollution and other parameter attacks; man-in-the-middle interception of requests or responses; subversion of authentication or authorisation mechanisms to spoof legitimate consumers; credential leakage or token theft; system information leakage through overly detailed error messages; and broken session IDs, keys or authentication mechanisms that create unintended access.

Exposing too much information through generic, one-size-fits-all resource APIs — rather than APIs tailored to specific circumstances — is itself a risk worth calling out separately, since it tends to accumulate quietly as an API's consumer base grows.

### **Towards zero trust and decoupled environments**

| INFO Zero trust (ZT) describes an evolving set of cybersecurity paradigms that move defences from static, network-based perimeters to focus on users, assets and resources. A zero trust architecture assumes no implicit trust is granted to assets or accounts based solely on physical or network location, or on asset ownership. (Definition adapted from NIST.) |
| :---- |

Zero trust architecture removes the concept of trusted internal versus untrusted external networks, focusing instead on “never trust, always verify”. The shift to cloud services has brought this model to the fore: every actor — staff, delivery partners and others — requires access controls regardless of location or device.

<Standard id="MSDAS_SHOULD_MSD_CONSIDER_FOLLOWING_PLANNING_ZERO" type="SHOULD">
MSD should consider the following when planning a Zero Trust architecture: apply strong identification and authentication; build a dynamic digital trust model, valid only for the current session; constantly evaluate and always authenticate; apply contextual authorisation (attributes, consent, location, time, behaviour); build in a digital risk capability that maps to a level of confidence and constantly re-evaluates; incorporate endpoint (device) security; apply transaction-level verification and continuous session validation; apply data security via encryption and user privacy controls, including consent management; implement strong auditing, logging, event reporting and forensics; use automated analytics for threat detection; inject identity context into API traffic (user, application, device); apply fine-grained access control at egress points to modify or block responses; propagate identity through to backend services to inform decisions; and secure all APIs as if they were public.
</Standard>

## **12\. PAR, JARM and Session Management**

### **Pushed Authorisation Request (PAR)**

The standard authorisation request sends all parameters in the URL query string, which creates several issues: complex authorisation requests can exceed URL length limitations; parameters are exposed in browser history and logs, raising privacy concerns for the client; and tampering attacks on the content rely on the API Provider and Consumer independently validating it.

PAR addresses this by introducing a dedicated PAR endpoint: the API Consumer pushes the authorisation request (as a signed JWT) to this secured back-channel endpoint, and receives a request\_uri in return, which is then used in the (much shorter) authorise request.

<Standard id="MSDAS_MAY_PAR_APPLIED_CONFIDENCE_APIS_SOLUTIONS" type="MAY">
PAR may be applied for IN-CONFIDENCE APIs, or solutions that require complex authorisation requests.
</Standard>

### **JWT Secured Authorisation Response Mode (JARM)**

Where PAR addresses the authorise request, JARM addresses the authorise response, letting the API Consumer specify (via a response\_mode parameter) that the response should be returned as a signed — and optionally encrypted — JWT rather than plain query parameters. JARM originates from the banking industry as part of the Financial-Grade API (FAPI) profile.

<Standard id="MSDAS_MAY_JARM_USED_CONFIDENCE_APIS" type="MAY">
JARM may be used for IN-CONFIDENCE APIs.
</Standard>

### **Session management**

<Standard id="MSDAS_SHOULD_MSD_IMPLEMENT_SESSION_MANAGEMENT_DEFINED" type="SHOULD">
MSD should implement session management as defined in the relevant OpenID Connect standards.
</Standard>

Four OpenID Connect specifications address session management: OpenID Connect Session Management 1.0 (session state); OpenID Connect Front-Channel Logout 1.0 (session and session ID); OpenID Connect Back-Channel Logout 1.0 (logout token); and OpenID Connect RP-Initiated Logout 1.0 (logout endpoint, hosted by the OpenID Provider).

## **13\. Security Controls**

### **Transport security**

<Standard id="MSDAS_MUST_ALL_COMMUNICATIONS_API_UTILISE_TRANSPORT" type="MUST">
All communications to or from an API must utilise Transport Layer Security (TLS) 1.3 or higher. *See the New Zealand Information Security Manual (NZISM) for detail.*
</Standard>
| **SHOULD**  Other versions of TLS and SSL should be disabled. |
| **MUST**  API Consumer applications must validate TLS certificate chains when making requests to protected resources, including checking the Certificate Revocation List. |

Confidentiality and integrity cover the handling of request and response data, both in transit and at rest, protecting payload content from unauthorised access, manipulation or spoofing. An API request needs to be received intact, with validation of its source; an untampered API response needs to be received by the consuming application with confirmation it legitimately came from the API.

### **Content encryption and signing**

| REQUIRED  Any content encryption must adhere to the standard algorithms set out in the New Zealand Information Security Manual (HMAC algorithms). |
| :---- |

Content signing assures content integrity and proof of authorship, and can apply to an entire payload or to specific elements (for example, bank account details). Signing has a lower computational overhead than encryption but can still affect performance, so should be used only where needed.

<Standard id="MSDAS_MUST_BEARER_TOKENS_USED_THEY_JSON" type="MUST">
Where bearer tokens are used, they must be JSON Web Tokens (JWT) signed using JSON Web Signature.
</Standard>

While TLS protects the payload in transit, it only applies point-to-point (for example, mobile app to API gateway). Where transit components aren't fully under MSD's control, payload encryption may be worthwhile — for example, encrypting bank account details passed between an API Consumer and MSD's backend systems. Data-at-rest encryption is generally good practice and commonly offered as standard by cloud providers; see the NZISM for detail. Encryption is only worth implementing where data sensitivity or protection requirements drive it, since it can be computationally intensive and can make it harder for protection mechanisms such as API gateways to validate and transform content.

### **Information classification**

MSD handles large volumes of highly sensitive personal information about clients and whānau — including information about income, employment, housing, family circumstances and, in some cases, care and protection. The primary reference for classification in these standards is the New Zealand Government Protective Security Requirements (PSR), which classifies information according to the harm its unauthorised disclosure would cause.

<Standard id="MSDAS_MUST_API_PROVIDERS_CORRECTLY_CLASSIFY_INFORMATION" type="MUST">
API Providers must correctly classify the information exposed by an API using the PSR classification levels (e.g. UNCLASSIFIED, IN-CONFIDENCE, SENSITIVE, RESTRICTED), applying the appropriate endorsement where MSD- or social-sector-specific handling requirements apply.
</Standard>

Where information is classified above UNCLASSIFIED, unauthorised disclosure won't be permitted unless the client (or their authorised representative) has consented, another person is authorised to receive it, or disclosure is authorised by statute or a legal instrument such as an Approved Information Sharing Agreement (AISA) under Part 9A of the Privacy Act 2020\.

## **14\. MCP API Security**

The Model Context Protocol (MCP) — covered from a design perspective in Part C, MCP APIs — introduces security considerations beyond the REST- and event-oriented guidance above, because the consumer is an AI agent making autonomous, in-the-moment decisions about which capabilities to invoke, often influenced by natural-language content it doesn't fully control.

The baseline requirements set out earlier in this Part — authentication, transport encryption, token handling, information classification — apply in full to MCP Servers. This section sets out additional controls specific to the agentic consumption model.

### **Authentication and authorisation**

<Standard id="MSDAS_MUST_REMOTE_MCP_SERVERS_AUTHENTICATION_REQUIRED" type="MUST">
Remote MCP Servers when authentication is required, must use the OAuth 2.1 mechanisms set out earlier in this Part, including PKCE, rather than a bespoke or simplified authentication scheme.
</Standard>
| **MUST**  Access tokens issued for MCP use must be audience-restricted to the specific MCP Server, and must not be accepted by other MSD APIs, or vice versa. This prevents a compromised MCP Client or Server from being used as a stepping stone to unrelated MSD systems. |
| **MUST**  Tools must be scoped to the minimum data and actions required, following the same least-privilege principle applied to REST API scopes. A tool that reads client entitlements must not also carry the ability to update them. |

### **Consent and human oversight**

<Standard id="MSDAS_SHOULD_TOOLS_WRITE_DATA_TRIGGER_REAL" type="SHOULD">
Tools that write data, or trigger a real-world action on a client's record, should require explicit human confirmation within the host application before execution — particularly where the action is difficult to reverse, such as issuing a payment or closing a case.
</Standard>

Because MCP Servers expose their capability list dynamically rather than through a specification a developer reviews in advance, the practical safeguard against unintended tool use shifts from design-time review to runtime consent and confirmation.

### **Tool integrity (“rug-pull” protection)**

<Standard id="MSDAS_MUST_MCP_SERVER_SILENTLY_CHANGE_PREVIOUSLY" type="MUST">
An MCP Server must not silently change a previously approved tool's behaviour or description once a client has connected. Any material change must trigger a listChanged notification and require the host to obtain renewed consent before the changed tool can be used again.
</Standard>
| **INFO** This guards against so-called “rug-pull” attacks, where a tool that was reviewed and approved in one form is later altered — for example, to broaden the data it accesses or the actions it performs — without the change being surfaced for re-approval. |

### **Untrusted content and indirect prompt injection**

| SECURITY NOTE Tool descriptions and resource content are a channel an attacker can use to influence agent behaviour — sometimes called indirect prompt injection. For example, a case note resource containing hidden instructions could attempt to manipulate an agent reading it into taking an unintended action, such as exfiltrating other clients' data. |
| :---- |
| **MUST**  MCP Servers must treat all resource content and tool output as untrusted from the agent's perspective, and must not rely on the agent to correctly enforce an access control decision that the server itself is capable of enforcing directly. |

### **Audit logging**

<Standard id="MSDAS_MUST_ALL_TOOL_INVOCATIONS_ACCESS_MODIFY" type="MUST">
All tool invocations that access or modify client or whānau data must be logged with sufficient detail to identify the requesting agent, the authenticated MSD staff member on whose behalf it acted, and the specific data accessed or changed — consistent with MSD's audit logging obligations for client data generally.
</Standard>

## **15\. Related Standards**

These MSD API Security standards draw on, and should be read alongside, current internet and New Zealand standards, including:

| Standard | Relevance |
| :---- | :---- |
| RFC 6749 – The OAuth 2.0 Authorization Framework | Core authorisation framework used throughout this standard. |
| RFC 6750 – OAuth 2.0 Bearer Token Usage | How bearer tokens must be used to access protected resources. |
| RFC 7519 – JSON Web Token (JWT) | Token format used for ID Tokens, access tokens and signed assertions. |
| RFC 7800 – Proof-of-Possession Key Semantics for JWTs | Underpins content-signing and proof-of-possession approaches referenced above. |
| OpenID Connect Core 1.0 | Identity layer on top of OAuth 2.0, required for APIs exposing client identity information. |
| New Zealand Information Security Manual (NZISM) | Baseline government security requirements for cryptography, TLS and related controls. |
| Protective Security Requirements (PSR) | Government-wide information classification and protection framework, used for MSD's information classification (in place of the health-sector-specific HISO 10029 framework). |
| DIA Identification Management Standards (incl. Authentication Assurance Standard) | Whole-of-government Level of Assurance framework, applied directly by MSD. |
| Privacy Act 2020 (incl. Part 9A – Approved Information Sharing Agreements) | Legal basis for client information collection, use, and cross-agency sharing. |

*End of Part B — Part C (API Development) and Part D (API Publishing) follow as separate sections of this standard.*