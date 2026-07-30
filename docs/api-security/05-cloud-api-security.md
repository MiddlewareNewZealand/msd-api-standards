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

Each of the following applies to every cloud API in scope of this standard.

<Standard id="MSDAS_MUST_AUTHENTICATE_AND_AUTHORISE_CLOUD_API_REQUESTS" type="MUST">
A cloud API must authenticate and authorise every request, using OAuth 2.0, single sign-on with OpenID Connect, and request-level authorisation.
</Standard>

<Standard id="MSDAS_MUST_VALIDATE_CLOUD_API_REQUESTS" type="MUST">
A cloud API must validate all incoming requests.
</Standard>

<Standard id="MSDAS_MUST_THROTTLE_CLOUD_API_REQUESTS" type="MUST">
A cloud API must throttle requests.
</Standard>

<Standard id="MSDAS_MUST_APPLY_QUOTAS_TO_EXPENSIVE_CLOUD_ENDPOINTS" type="MUST">
A cloud API must apply quotas on endpoints that could consume substantial human, compute or data resources.
</Standard>

<Standard id="MSDAS_MUST_LOG_CLOUD_API_ACTIVITY" type="MUST">
A cloud API must log API activity.
</Standard>

<Standard id="MSDAS_MUST_DEPEND_ONLY_ON_TRUSTED_CLOUD_DEPENDENCIES" type="MUST">
A cloud API implementation must depend only on trusted code libraries and packages.
</Standard>

<Standard id="MSDAS_MUST_APPLY_ZERO_TRUST_MODEL_TO_CLOUD_APIS" type="MUST">
A cloud API must apply a zero-trust model, in which no session-based authentication mechanism (such as a cookie) is relied on to establish trust.
</Standard>

<Standard id="MSDAS_MUST_FILTER_PUBLIC_NETWORK_TRAFFIC_TO_CLOUD_APIS" type="MUST">
Cloud API traffic traversing public networks must be filtered by a web application firewall or API gateway that controls internet-routed requests.
</Standard>

<Standard id="MSDAS_MUST_RESTRICT_ACCESS_TO_CLOUD_API_SECRETS" type="MUST">
A cloud API must apply identity and access management policies that control access to sensitive resources such as credentials, keys and configuration.
</Standard>

## **Further reading**

Recommended references for designing and implementing cloud APIs: the New Zealand Information Security Manual (NZISM); the Protective Security Requirements (PSR); the Center for Internet Security (CIS); the Cloud Security Alliance (CSA); and CERT NZ's Critical Controls.
