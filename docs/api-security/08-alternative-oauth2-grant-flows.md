---
title: "Alternative OAuth 2.0 Grant Flow Extensions and Web Application Patterns"
---

## **Assertion grant flows**

The OAuth 2.0 framework has been extended to support authenticating a client to the API Provider's token endpoint using an assertion — a signed package containing identity and security information usable across security domains, both to authenticate the API Consumer and to obtain an access token. Two assertion grant flows are defined: the JWT Bearer Assertion flow and the SAML Bearer Assertion flow.

### **JWT Assertion Grant Flow**

This flow relies on a trust relationship between the API Provider and the creator of the JWT assertion, which may either be created by the API Consumer itself, or by an Identity Provider.

| JWT creation | Issues | Recommendation |
| :---- | :---- | :---- |
| API Consumer-created JWT | Risk of private key compromise; ongoing key management and rotation burden. | May be used for server-to-server flows, for UNCLASSIFIED APIs. |
| Identity-Provider-created JWT | Requires a trust relationship to be established. | May be used for UNCLASSIFIED APIs where consent isn't required. |

The jwt-bearer flow may also be used alongside authorisation code flows, in which case the JWT is used only to authenticate the client to the API Provider, rather than to obtain the token directly.

### **SAML Assertion Grant Flow**

Functionally similar to the JWT flow, but using a SAML assertion in place of a JWT.

<Standard id="MSDAS_SHOULD_NOT_SAML_ASSERTION_FLOWS_USED_SERVER" type="SHOULD NOT">
SAML assertion flows should not be used for server-to-server flows, and should not use a client-created assertion model. Note the related [MAY guidance](#MSDAS_MAY_SAML_ASSERTION_FLOWS_USED_UNCLASSIFIED_APIS) below for when they may be used.
</Standard>

<Standard id="MSDAS_MAY_SAML_ASSERTION_FLOWS_USED_UNCLASSIFIED_APIS" type="MAY">
SAML assertion flows may be used for UNCLASSIFIED APIs, and may be used with authorisation code flows for IN-CONFIDENCE APIs where a SAML token-endpoint authorisation model is specifically required. Note the related [SHOULD NOT guidance](#MSDAS_SHOULD_NOT_SAML_ASSERTION_FLOWS_USED_SERVER) above.
</Standard>

## **Web application (browser-based) patterns**

Emerging guidance for OAuth 2.0 in browser-based applications — particularly single-page applications — covers three models: a Backend for Frontend, where all OAuth 2.0 and resource calls are proxied through a backend service; a Token-Mediating Backend, where only the OAuth 2.0 calls are proxied; and a browser-only client, using PKCE with the authorisation code flow rather than the Implicit flow.

### **Backend for Frontend (BFF)**

<Standard id="MSDAS_MAY_MSD_USE_BACKEND_FRONTEND_PATTERN" type="MAY">
MSD may use the Backend for Frontend pattern for single-page applications that need to support IN-CONFIDENCE APIs, while this guidance remains in draft at the IETF.
</Standard>

In this pattern, a user interacts with the API Consumer application, which communicates with a Backend for Frontend service sitting within the API Provider's (or the consumer's own) infrastructure. The BFF service requests authorisation from the authorisation server, redirecting the user to grant consent; on receiving an authorisation code, it exchanges this for access and refresh tokens on the user's behalf, then uses the access token to retrieve the requested resource, which it returns to the API Consumer application. This keeps tokens out of the browser entirely, closing off the main risk PKCE alone doesn't fully address for sensitive, IN-CONFIDENCE data.

```plantuml alt="Sequence diagram showing the Backend for Frontend (BFF) pattern"
@startuml

skinparam BackgroundColor #d7f8ff
skinparam DefaultFontColor #1c5773
skinparam DefaultFontSize 16
skinparam ArrowColor #1c5773
skinparam ArrowThickness 2
skinparam LifeLineBorderColor #1c5773
skinparam LifeLineBackgroundColor #ffffff
skinparam ParticipantBackgroundColor #61d9de
skinparam ParticipantBorderColor #1c5773
skinparam ParticipantFontColor #1c5773
skinparam ActorBackgroundColor #61d9de
skinparam ActorBorderColor #1c5773
skinparam ActorFontColor #1c5773
skinparam NoteBackgroundColor #ffffff
skinparam NoteBorderColor #1c5773

actor "User" as User
participant "API Consumer\n(Single-Page Application)" as SPA
participant "Backend for Frontend" as BFF
participant "Authorisation Server" as AS
participant "Resource Server" as RS

User -> SPA : Interact with application
SPA -> BFF : Request protected resource
BFF -> AS : Request authorisation
AS -> User : Redirect to authenticate and consent
User -> AS : Authenticate and consent
AS --> BFF : Authorisation code
BFF -> AS : Exchange code for tokens
AS --> BFF : Access Token, Refresh Token
BFF -> RS : API request with Bearer Access Token
RS --> BFF : Protected resource
BFF --> SPA : Resource response
note over BFF
  Tokens are held server-side
  by the BFF and never sent
  to the browser
end note
@enduml
```

<DetailedDescription text="This shows the Backend for Frontend pattern — the API Consumer (SPA) never handles tokens directly; instead the BFF service requests authorisation, exchanges the authorisation code for access and refresh tokens, and calls the Resource Server on the user's behalf, keeping all tokens held server-side and out of the browser." />
