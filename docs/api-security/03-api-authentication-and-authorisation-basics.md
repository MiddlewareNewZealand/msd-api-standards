---
title: "API Authentication and Authorisation Basics"
---

Before looking at the technical solutions to API authentication and authorisation, this section will provide an introduction that illustrates some of the situations where authentication and authorisation are appropriate.

Authorisation and authentication are intrinsically linked within the OAuth 2.0 framework, which is itself widely regarded as synonymous with securing APIs. This section provides a high-level introduction to OAuth 2.0 and the authentication and authorisation patterns MSD APIs should follow.

## **Authentication**

<Standard id="MSDAS_MUST_APPROPRIATE_AUTHENTICATION_ACHIEVED_ACCESSING_APIS" type="MUST">
Appropriate authentication must be achieved when accessing APIs.
</Standard>

When securing APIs, authentication identifies the social sector participants and/or API Consumers who want to access or use an API. Authentication enables the API Provider to identify all consumers of an API and confirm that the consumer requesting access is who they say they are. This doesn't automatically authorise them to access the API or the underlying resources.

Providers should define a registration process for each category of API Consumer or social sector participant. Understanding who or what is using an API matters at every stage of the API lifecycle — including deprecation and outage notification — and lets the provider apply different service levels to different consumers. Requiring application developers to register also means they must agree to terms and conditions covering how they use API data, and commit to their consumer behaving in an acceptable, non-abusive way that preserves the privacy of the information owner.

### **Authentication mechanisms**

MSD APIs may use a range of authentication mechanisms, each suited to a different risk and consumer context:

| Mechanism | Recommended usage |
| :---- | :---- |
| Anonymous | Not recommended, except for genuinely low-risk, publicly available information. |
| Username and password (direct authentication) | Not recommended for production; may be used for testing and development only. |
| API Key | Recommended for all APIs, particularly system-to-system integration. |
| Mutual certificates (mTLS) | Common for business-to-business integration; in use across the NZ public sector for high-trust B2B channels. |
| OAuth 2.0 | Recommended for public and internal APIs. |
| OAuth 2.0 \+ OpenID Connect (OIDC) | Recommended wherever an OpenID Connect Provider is available, and required for any API exposing personal or sensitive client information. |

### **Anonymous authentication**

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

### **Username and password authentication**

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

### **API Key authentication**

<Standard id="MSDAS_SHOULD_API_KEYS_USED_UNIQUE_ASSIGNED" type="SHOULD">
API Keys should be used, and should be unique, assigned to an application, developer or organisation.
</Standard>

API Keys are a digital authentication mechanism, typically an opaque value such as a GUID. The usual practice is for an application developer to obtain a key for their API Consumer from the API Provider, through an onboarding process.

<Standard id="MSDAS_MUST_API_KEYS_USED_WHEREVER_SYSTEM" type="MUST">
API Keys must be used wherever system-to-system authentication is needed, especially for production-level APIs.
</Standard>

<Standard id="MSDAS_MAY_API_KEYS_USED_SIMPLE_PUBLIC_APIS" type="MAY">
API Keys may be used on their own for simple public APIs that don't need more complex authentication models.
</Standard>

The risk is that anyone holding a copy of the API Key can use it as though they were the legitimate API Consumer. All communications must therefore be over TLS to protect the key in transit, and application developers are responsible for protecting their copy of the key.

<Standard id="MSDAS_SHOULD_API_KEY_EMBEDDED_API_CONSUMER" type="SHOULD">
If the API Key is embedded in the API Consumer, it should be protected.
</Standard>

<Standard type="INFO">
API Keys are recommended because they provide a level of security to public APIs, helping protect against screen-scraping and providing a basis for throttling or billing access to data. MSD should carry out a risk analysis of possible threats against the classification of the data an API exposes, to decide whether API Keys alone are sufficient.
</Standard>

### **Certificate (mutual) authentication**

<Standard id="MSDAS_MAY_MODEL_USED_API_DEPENDS_LEGACY" type="MAY">
This model may be used where the API depends on legacy authentication mechanisms requiring mutual certificates.
</Standard>

In mutual (certificate) authentication, both the API Consumer and the API Provider hold a digital certificate issued by a mutually trusted Certificate Authority. When the API Consumer makes a request, the server hosting the API presents its certificate; the consumer verifies it and presents its own certificate in turn. Once both sides verify each other's certificate, mutual trust is established and the API Consumer can use the API.

## **Authorisation**

<Standard id="MSDAS_MUST_APPROPRIATE_AUTHORISATION_APPLIED" type="MUST">
Appropriate authorisation must be applied.
</Standard>

Authorisation is the act of performing access control on a resource: defining access rules and policies, and enforcing them. It's the foundation on which a provider grants or denies a consuming application and/or client access to a resource, at whatever level of granularity is appropriate.

Authentication on its own doesn't grant permission to access an API or application — it only validates that a party is who they claim to be. Once a party is authenticated, an authorisation process grants or denies them the right to perform an action or access information. Normally this is applied using either coarse-grained access (typically at the API or API Gateway request point) or fine-grained access (typically at the API Provider's service implementation).

### **Role Based Access Control (RBAC)**

<Standard id="MSDAS_SHOULD_RBAC_USED" type="SHOULD">
RBAC should be used.
</Standard>

In many organisations a directory service provides authentication, and directory groups then provide authorisation — a form of discretionary access control, where access is granted by applying access control lists directly to users or the groups they belong to. Directory (or LDAP) groups are synonymous with roles and can be used to provide coarse-grained authorisation for MSD APIs.

### **Scopes (limited fine-grained access)**

<Standard id="MSDAS_MUST_APPROPRIATE_SCOPES_PRESENT_ACCESS_TOKENS" type="MUST">
Appropriate scopes must be present in access tokens when accessing APIs.
</Standard>

<Standard id="MSDAS_MAY_OAUTH_SCOPES_LIMIT_AUTHORISATION" type="MAY">
OAuth 2.0 scopes may be used to limit the authorisation granted to the API Consumer by the resource owner.
</Standard>

Based on the services an API exposes, additional access controls can be applied using scopes — for example, a data service might expose separate read and write scopes, granted to a user based on their directory group. The developer must ensure the minimum privileges are granted to API Consumers needed to complete the requests the user wants carried out.

An API Consumer may invite a client or social sector worker to authorise the application to act on their behalf.

<Standard id="MSDAS_MUST_ORDER_OCCUR_API_CONSUMER_PROVIDE" type="MUST">
In order for this to occur, the API Consumer must provide the authorisation server with the intent of its request.
</Standard>

### **Attribute Based Access Control (ABAC)**

<Standard id="MSDAS_MAY_API_PROVIDERS_UTILISE_ABAC" type="MAY">
API Providers may utilise ABAC.
</Standard>

ABAC defines an access control process where access is granted based on policies built from attributes — for example, a policy might state that access to a specified resource is only permitted for users in a particular team, who hold a particular role, during business hours. ABAC provides fine-grained authorisation and lets access decisions take account of context, such as the IP address or operating system of the requesting device.

<Standard id="MSDAS_MAY_API_PROVIDERS_IMPLEMENT_ABAC_USING" type="MAY">
API Providers may implement ABAC using XACML, the recognised standard, which provides a reference architecture, a request/response protocol and a policy language built around four services: a Policy Enforcement Point (PEP), Policy Decision Point (PDP), Policy Administration Point (PAP) and Policy Information Point (PIP).
</Standard>

### **API Gateway**

<Standard id="MSDAS_MAY_API_PROVIDERS_IMPLEMENT_API_GATEWAY" type="MAY">
API Providers may implement API Gateway technology.
</Standard>

Most API Gateways on the market support OAuth 2.0 and can provide authorisation (and authentication) services via a direct connection to an identity store, an identity access management system, or a policy server.

### **Developer authentication**

<Standard id="MSDAS_MUST_API_PROVIDERS_IMPLEMENT_DEVELOPER_AUTHENTICATION_2" type="MUST">
API Providers must implement Developer Authentication.
</Standard>

Developer authentication should take place at an API Portal (see Security Reference Architecture, above). An API Portal offers an authentication solution for developers to log in with a username and password; once logged in, a developer should be able to browse and discover the APIs available.

API Portals normally require the consuming application developer to provide contact details (e.g. an email address) and register the application they're developing. The Portal should provide registration services for the client application to use, including: API Keys for basic authentication and monitoring; OAuth 2.0 client registration, including management of Client ID and Client Secret; and additional production authentication and authorisation mechanisms as required (e.g. certificate-based).
