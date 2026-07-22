---
title: "Building Secure APIs"
---

## **Design principles**

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

## **General technical security requirements**

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

## **Reference resources**

The following are recommended reading for anyone new to API implementation: the OWASP Top Ten (a summary of standard attacks and mitigations); the OWASP REST Security Cheat Sheet (REST-specific risks and how to prevent them); and the OWASP API Security Project (the top 10 API-specific risks). Where an API accepts input parameters, the OWASP Input Validation, Cross-Site Scripting Prevention, SQL Injection Prevention and Query Parameterisation Cheat Sheets are also worth reviewing.
