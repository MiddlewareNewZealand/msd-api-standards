---
title: "Level of Assurance"
---

Level of Assurance (LoA) supports the OpenID Connect API security framework by capturing how much confidence an API Provider can have in the identity of the client accessing their service, based on the strength of the authentication and the verification methods used. OIDC communicates LoA to API Providers using the Authentication Context Class Reference (acr) token claim — in effect, a confidence score for identity, with a low LoA appropriate for low-stakes interactions and a high LoA required before, say, changing bank account details for a benefit payment.

An LoA (or acr claim) model helps: mitigate the risk of exposing sensitive data to unauthorised users, by defining a required authorisation strength; provide a stronger authentication model that reduces the attack surface; provide a trust model between API Consumers and API Providers; grant granular access to sensitive data, since higher LoA is required for more sensitive data; and ensure the API Consumer has appropriate authorisation to act on behalf of the client.

<Standard id="MSDAS_MUST_API_PROVIDERS_ADOPT_LEVEL_ASSURANCE" type="MUST">
API Providers must adopt a Level of Assurance model, applied wherever API Consumers access client or whānau records classified as IN-CONFIDENCE or higher, and must indicate the LoA associated with a client's authentication and authorisation process in any issued tokens.
</Standard>

## **LoA claims**

Issued tokens can carry the following claims relating to the strength of user authentication, which the API Provider uses to confirm the level of trust that the user is who they say they are, and what access to grant on that basis.

| Claim | Description | Application |
| :---- | :---- | :---- |
| acr | Authentication Context Class Reference — LoA based on a pre-defined, ordered set of values. | 0 \= no authentication performed, or 1 \= credential only, or 2 \= credential, password and OTP: may be applied to UNCLASSIFIED information, must not be applied to IN-CONFIDENCE information. 3 \= password, OTP and multi-factor authentication required: must be applied to IN-CONFIDENCE information. |
| amr | Authentication Methods References — details the authentication method(s) used, e.g. password, OTP, biometrics. | API Providers define their acr requirements based on this information, enforced by API Consumers. |
| azp | Authorised party — the client ID of the API Consumer. | Used where a single resource owner may be served by multiple API Consumer services. |

## **Aotearoa New Zealand LoA standards**

<Standard type="INFO">
MSD should apply the Department of Internal Affairs' Identification Management Standards directly, since these are whole-of-government standards rather than sector-specific. This avoids the need for a bespoke MSD assurance framework and keeps MSD aligned with the rest of the public sector.
</Standard>

Two key Level of Assurance standards are in use in Aotearoa: the New Zealand Department of Internal Affairs' Identification Management Standards, which define four components — Information Assurance (IA), Binding Assurance (BA), Authentication Assurance (AA) and Federation Assurance (FA); and the US National Institute of Standards and Technology (NIST) Digital Identity Guidelines, which define three levels of confidence — Identity Assurance Level, Authenticator Assurance Level, and Federation Assurance Level.

OpenID Connect and the Financial-Grade API (FAPI) profile also define a Level of Assurance model that API Providers may use to implement the standards above.
