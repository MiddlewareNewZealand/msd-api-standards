---
title: "Security Controls"
---

## **Transport security**

<Standard id="MSDAS_MUST_ALL_COMMUNICATIONS_API_UTILISE_TRANSPORT" type="MUST">
All communications to or from an API must utilise Transport Layer Security (TLS) 1.3 or higher. *See the New Zealand Information Security Manual (NZISM) for detail.*
</Standard>
<Standard id="MSDAS_SHOULD_OTHER_VERSIONS_TLS_SSL_DISABLED" type="SHOULD">
Other versions of TLS and SSL should be disabled.
</Standard>

<Standard id="MSDAS_MUST_API_CONSUMER_VALIDATE_TLS_CERTIFICATE_CHAINS" type="MUST">
API Consumer applications must validate TLS certificate chains when making requests to protected resources, including checking the Certificate Revocation List.
</Standard>

Confidentiality and integrity cover the handling of request and response data, both in transit and at rest, protecting payload content from unauthorised access, manipulation or spoofing. An API request needs to be received intact, with validation of its source; an untampered API response needs to be received by the consuming application with confirmation it legitimately came from the API.

## **Content encryption and signing**

<Standard id="MSDAS_MUST_CONTENT_ENCRYPTION_ADHERE_STANDARD_ALGORITHMS" type="REQUIRED">
Any content encryption must adhere to the standard algorithms set out in the New Zealand Information Security Manual (HMAC algorithms).
</Standard>

Content signing assures content integrity and proof of authorship, and can apply to an entire payload or to specific elements (for example, bank account details). Signing has a lower computational overhead than encryption but can still affect performance, so should be used only where needed.

<Standard id="MSDAS_MUST_BEARER_TOKENS_USED_THEY_JSON" type="MUST">
Where bearer tokens are used, they must be JSON Web Tokens (JWT) signed using JSON Web Signature.
</Standard>

While TLS protects the payload in transit, it only applies point-to-point (for example, mobile app to API gateway). Where transit components aren't fully under MSD's control, payload encryption may be worthwhile — for example, encrypting bank account details passed between an API Consumer and MSD's backend systems. Data-at-rest encryption is generally good practice and commonly offered as standard by cloud providers; see the NZISM for detail. Encryption is only worth implementing where data sensitivity or protection requirements drive it, since it can be computationally intensive and can make it harder for protection mechanisms such as API gateways to validate and transform content.

## **Information classification**

MSD handles large volumes of highly sensitive personal information about clients and whānau — including information about income, employment, housing, family circumstances and, in some cases, care and protection. The primary reference for classification in these standards is the New Zealand Government Protective Security Requirements (PSR), which classifies information according to the harm its unauthorised disclosure would cause.

<Standard id="MSDAS_MUST_API_PROVIDERS_CORRECTLY_CLASSIFY_INFORMATION" type="MUST">
API Providers must correctly classify the information exposed by an API using the PSR classification levels (e.g. UNCLASSIFIED, IN-CONFIDENCE, SENSITIVE, RESTRICTED), applying the appropriate endorsement where MSD- or social-sector-specific handling requirements apply.
</Standard>

Where information is classified above UNCLASSIFIED, unauthorised disclosure won't be permitted unless the client (or their authorised representative) has consented, another person is authorised to receive it, or disclosure is authorised by statute or a legal instrument such as an Approved Information Sharing Agreement (AISA) under Part 9A of the Privacy Act 2020\.
