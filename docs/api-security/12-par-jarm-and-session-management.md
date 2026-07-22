---
title: "PAR, JARM and Session Management"
---

## **Pushed Authorisation Request (PAR)**

The standard authorisation request sends all parameters in the URL query string, which creates several issues: complex authorisation requests can exceed URL length limitations; parameters are exposed in browser history and logs, raising privacy concerns for the client; and tampering attacks on the content rely on the API Provider and Consumer independently validating it.

PAR addresses this by introducing a dedicated PAR endpoint: the API Consumer pushes the authorisation request (as a signed JWT) to this secured back-channel endpoint, and receives a request\_uri in return, which is then used in the (much shorter) authorise request.

<Standard id="MSDAS_MAY_PAR_APPLIED_CONFIDENCE_APIS_SOLUTIONS" type="MAY">
PAR may be applied for IN-CONFIDENCE APIs, or solutions that require complex authorisation requests.
</Standard>

## **JWT Secured Authorisation Response Mode (JARM)**

Where PAR addresses the authorise request, JARM addresses the authorise response, letting the API Consumer specify (via a response\_mode parameter) that the response should be returned as a signed — and optionally encrypted — JWT rather than plain query parameters. JARM originates from the banking industry as part of the Financial-Grade API (FAPI) profile.

<Standard id="MSDAS_MAY_JARM_USED_CONFIDENCE_APIS" type="MAY">
JARM may be used for IN-CONFIDENCE APIs.
</Standard>

## **Session management**

<Standard id="MSDAS_SHOULD_MSD_IMPLEMENT_SESSION_MANAGEMENT_DEFINED" type="SHOULD">
MSD should implement session management as defined in the relevant OpenID Connect standards.
</Standard>

Four OpenID Connect specifications address session management: OpenID Connect Session Management 1.0 (session state); OpenID Connect Front-Channel Logout 1.0 (session and session ID); OpenID Connect Back-Channel Logout 1.0 (logout token); and OpenID Connect RP-Initiated Logout 1.0 (logout endpoint, hosted by the OpenID Provider).
