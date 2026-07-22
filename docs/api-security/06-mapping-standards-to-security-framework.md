---
title: "Mapping Standards Components to API Security Framework"
---

Part A, Standards Component Definitions defines the following components: API Provider, API Consumer, Social Sector Participant, Social Sector Organisation, Social Sector Worker, API Designer, and API Developer.

The two standards MSD should use to protect and secure API resources are OAuth 2.0 and OpenID Connect. OpenID Connect adds identity to the mix and is built on OAuth 2.0, but uses different naming to describe similar capabilities. On top of these, additional standards address further security features and enhancements (see Alternative OAuth 2.0 Grant Flow Extensions, and PAR, JARM and Session Management, below).

## **OAuth 2.0**

OAuth 2.0 defines a foundation for delegated authority that designers and implementers of MSD API solutions should build on. OAuth 2.0 leverages external authentication and authorisation services to let mobile and web applications act with the delegated authority of a client, using security tokens to authorise access to a protected resource without the resource owner having to share their credentials directly.

Although OAuth 2.0 is used in consent and delegation flows, it expects two areas to be covered outside the standard itself: authentication of the end user/resource owner when they log in to provide consent (normally via a redirect), and capture and management of the consent request and approval process, which defines the specific permissions (e.g. read) granted to the client application.

Selecting the right API security architecture should account for: the type of resource being protected (e.g. a client record versus a list of public service centre locations); the risk involved (exposure of personal information); and the application architecture the API is being called from (mobile, native, or web).

### **OAuth 2.0 versions**

| Version | Summary | When to use |
| :---- | :---- | :---- |
| 1.0a | Derived from the original OAuth 1.0 specification (RFC 5849); an authentication framework for exchange of signed tokens. | Obsolete. Must not be used by MSD APIs. |
| 2.0 | An open standard framework for delegated authorisation based on token exchange (RFC 6749). Not backward-compatible with 1.0; mandates TLS on all connections rather than digital signatures. | The current standard. MSD APIs should use this as the base framework for their API security architecture. |
| 2.1 | Tightens the flows supported by 2.0 and applies additional security by default. | Expected to become the standard. MSD APIs should review and support this specification, and follow its recommendations where it disambiguates 2.0. |

## **OpenID Connect (OIDC)**

OpenID Connect is the recommended security profile for OAuth 2.0 when an API requires stronger authentication — for example, where data flows two ways between the consuming application and the API. It introduces the concept of identity via an ID Token containing information about the end user, which can enhance the onboarding experience, provide single sign-on, secure the transfer of user data, and provide a trust framework for Service and Identity Providers to share consented user data.

OpenID Connect's fundamental security components mirror OAuth 2.0's, just with different names; the significant addition is the ID Token.

| OAuth 2.0 component | OpenID Connect component | MSD standards component | Description |
| :---- | :---- | :---- | :---- |
| Resource Owner | End User | Social Sector Participant | The person with the right to grant an API Consumer access to a protected resource (e.g. information about themselves). |
| Client (Application) | Relying Party | API Consumer | A consuming or third-party application requesting access to a protected resource on behalf of the resource owner, with their consent. |
| OAuth 2.0 / Authorisation Server | OpenID Provider / Authorisation Server | Owned by MSD or a delivery partner | Issues and tracks authorisation codes, access tokens, refresh tokens and ID tokens. |
| Authentication Server | Authentication Server | Owned by MSD or a delivery partner | Not itself an OAuth 2.0/OIDC component, but needed to complete the framework. Responsible for the login page, credential capture, and consent capture and management. |
| Resource Server/Provider | Resource Server/Provider | API Provider | Hosts protected resources and only allows authenticated, authorised clients access, by checking and validating the access token on each incoming request. |
