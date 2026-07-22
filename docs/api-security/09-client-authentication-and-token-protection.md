---
title: "Client Authentication and Token Protection"
---

The role of client authentication in OAuth 2.0 and OpenID Connect is to maintain the integrity and security of the authentication flow, ensuring only authorised API Consumers can interact with API Providers.

<Standard id="MSDAS_SHOULD_ALL_CONFIDENCE_MORE_SENSITIVE_APIS" type="SHOULD">
All IN-CONFIDENCE or more sensitive APIs should be secured using Client Authentication to protect the API endpoints. Tokens issued must be bound to the client.
</Standard>

Four authentication models can be applied to secure the confidential client connection between the API Consumer and the API Provider's token endpoint: Shared Client Secret, JWT-based authentication, Private Key JWT, and Mutual TLS.

## **Shared Client Secret method**

An API Consumer creates a client with an API Provider and is issued a Client ID (used on both the authorise and token endpoints) and a Client Secret (used with the Client ID when exchanging a code for an access token). Both parties must store the shared secret. Two methods exist:

| Method | Description | Recommendation |
| :---- | :---- | :---- |
| client\_secret\_basic | The client ID and secret are Base64-encoded and sent using HTTP Basic authentication. | May be used for UNCLASSIFIED APIs; should not be used for IN-CONFIDENCE APIs or with Public Clients. Confidential clients must securely store these credentials. |
| client\_secret\_post | The client ID and secret are sent in the POST body, perceived as more secure than client\_secret\_basic. | May be used for UNCLASSIFIED APIs; should not be used for IN-CONFIDENCE APIs or with Public Clients. Confidential clients must securely store these credentials. |

## **JWT-based authentication methods**

Two JWT authentication methods provide a higher level of security than the shared-secret methods above.

| Method | Description | Recommendation |
| :---- | :---- | :---- |
| client\_secret\_jwt | Still requires a managed client ID and secret, but the secret is never sent directly — it's used as a symmetric key to sign a JWT (containing the client ID and an expiry) which is presented instead. | May be used for UNCLASSIFIED and IN-CONFIDENCE APIs; may be used with Confidential Clients; should not be used with Public Clients. |
| private\_key\_jwt | Uses asymmetric cryptography rather than a shared secret: the API Consumer holds a private signing key and registers the corresponding public key with the API Provider, which validates the signed JWT. | Should be used when protecting IN-CONFIDENCE APIs via a confidential client; should not be used with Public Clients. Simpler to operate than tls\_client\_auth. |

## **Mutual TLS method**

Two variants add mTLS-based trust between the API Consumer and API Provider: self\_signed\_tls\_client\_auth (a self-signed client X.509 certificate) and tls\_client\_auth (a client X.509 certificate issued by a trusted certificate authority). Both add security by establishing two-way trust, at the cost of additional design complexity.

<Standard id="MSDAS_MAY_SELF_SIGNED_TLS_CLIENT_AUTH_USED_TESTING_DEVELOPMENT_ENVIRON" type="MAY">
self\_signed\_tls\_client\_auth may be used in testing and development environments. tls\_client\_auth may be used in production with a confidential client. Note the related [SHOULD NOT guidance](#MSDAS_SHOULD_NOT_SELF_SIGNED_TLS_CLIENT_AUTH_USED_PRODUCTION) below on when these methods should not be used.
</Standard>

<Standard id="MSDAS_SHOULD_NOT_SELF_SIGNED_TLS_CLIENT_AUTH_USED_PRODUCTION" type="SHOULD NOT">
self\_signed\_tls\_client\_auth should not be used in production. Public clients should not use either mTLS method (self\_signed\_tls\_client\_auth or tls\_client\_auth). Note the related [MAY guidance](#MSDAS_MAY_SELF_SIGNED_TLS_CLIENT_AUTH_USED_TESTING_DEVELOPMENT_ENVIRON) above on when these methods may be used.
</Standard>

## **Token protection**

A major risk with OAuth 2.0 and OpenID Connect is token theft — where a captured access token is used to obtain information from a protected resource. OpenID Connect provides Demonstrating Proof of Possession (DPoP), which strengthens client authentication by linking the access token to the client presenting it via a cryptographic key, rather than treating it as a plain bearer token anyone holding it can use.

| DPoP method | Description |
| :---- | :---- |
| JWK-based Proof of Possession | The API Consumer generates a public/private key pair and a signed DPoP JWT containing its public key. This is sent alongside the token request; the returned access token carries token\_type \= DPoP, binding it to the consumer's public key. The consumer includes a fresh DPoP header (plus the Authorization header) on each resource request, which the provider validates. |
| Certificate-based Proof of Possession | The API Consumer establishes mTLS with the API Provider when requesting the access token; the provider validates the client certificate and issues the token with a claim containing a hash of that certificate. The resource server validates both the token and the client's certificate on each call. This offers a higher level of security than JWK-based PoP, since it also requires mTLS. |

<Standard id="MSDAS_MAY_DPOP_MODEL_PROTECTING_IN_CONFIDENCE" type="MAY">
A DPoP model may be used when protecting IN-CONFIDENCE APIs. Selection of certificate-based or JWK-based PoP should be based on a risk assessment that accounts for the sensitivity of the information exposed by the API.
</Standard>
