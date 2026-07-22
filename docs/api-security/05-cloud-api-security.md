---
title: "Cloud API Security"
---

<Standard type="INFO">
‘Cloud API’ here means any API which is intended to handle MSD client or whānau information and provides or exposes cloud-deployed data or functions.
</Standard>

A cloud API's primary purpose may be to expose a specific commercial service, serve as a cross-platform integration point across diverse cloud services, or proxy for an application or service running in a legacy environment. Regardless of purpose, cloud APIs generally involve communication between an API Provider implementation running on shared, as-a-service public infrastructure, and API Consumers sending requests across a public network — which is why the measures below are needed to mitigate the risks inherent in cloud API provision and consumption.

## **Applicability**

This standard applies to all cloud APIs which provide storage and access to MSD information classified above UNCLASSIFIED (see Security Controls, Information Classification), and which provide or expose application functionality or services executing in a commercial cloud computing environment (e.g. AWS, Google Cloud Platform, Microsoft Azure) accessed through public infrastructure.

## **Requirements**

<Standard id="MSDAS_MUST_CLOUD_API_DESIGNERS_DEVELOPERS_ENSURE" type="MUST">
Cloud API designers and developers must ensure the implementation achieves all of the following: robust authentication and authorisation (OAuth 2.0, SSO with OpenID Connect, request-level authorisation); validation of all incoming requests; throttling of API requests and quotas on endpoints that could consume substantial human, compute or data resources; logging of API activity; dependence only on trusted code libraries and packages; a zero-trust model (no session-based authentication such as cookies); filtering of traffic traversing public networks (WAFs and API gateways controlling internet-routed requests); and specific identity and access management policies controlling access to sensitive resources such as credentials, keys and configuration.
</Standard>

## **Further reading**

Recommended references for designing and implementing cloud APIs: the New Zealand Information Security Manual (NZISM); the Protective Security Requirements (PSR); the Center for Internet Security (CIS); the Cloud Security Alliance (CSA); and CERT NZ's Critical Controls.
