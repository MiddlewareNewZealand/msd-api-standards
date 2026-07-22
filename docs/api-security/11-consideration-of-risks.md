---
title: "Consideration of Risks"
---

<Standard type="INFO">
An API offers a direct channel into part of an organisation's resources and information. Most organisations are accustomed to exposing a website with good control over what information is released via that interface; API access is not as visible, so it cannot as easily be observed when information is being incorrectly exposed.
</Standard>

It's therefore important that API Providers consider their consumers — and the consumers of those consumers — to determine risks and what information should be accessible via APIs.

<Standard id="MSDAS_MUST_API_DESIGNERS_IMPLEMENTERS_SHOW_HOW" type="MUST">
API designers and implementers must show how they have assessed and managed risks associated with their API solution. This assessment should be conducted during API design and be part of ongoing risk assessment of the API and its products. Records of risk assessment, current status and mitigation should be maintained in MSD's risk management systems.
</Standard>

This standard calls for API designers and implementers to show they've considered API security risk mitigation — generally demonstrated by design documentation, or, where mitigations are reused from other solutions, by reference to that solution's documentation or certification.

| Risk category | Consideration that must be shown |
| :---- | :---- |
| Identity & access management | Authentication; authorisation and delegated authority; federation. |
| Confidentiality | How is it assured that a consuming application accesses only permitted API resources? How are consumers assured they're communicating with the intended API Provider? What per-consumer or per-user-per-consumer data access controls does the API need to apply? |
| Integrity | How will the API assure the accuracy, completeness and quality of data, and maintain that over time? How does the solution ensure message content hasn't been tampered with between consumer and provider? |
| Availability / threat protection | What availability service level is required? What threats have been identified? What is the risk assessment of those threats, and what measures will mitigate or manage them? |
| Logging and alerting | How will fraudulent or malicious use of the API be detectable? How will MSD be alerted to malicious use or misuse? How will a trail of an attacker's activity be observed or obtained? |
| Incident management | How will incidents be reported and managed? What protective actions will be available if an incident occurs? |

Evidence of consideration is typically drawn from: API solution architecture documentation, API solution design and/or specification documentation, and operational management plans.

## **API-related risks**

Compared to a web channel, APIs can increase information security risk in a number of ways, including: an expanded attack surface (another way in, and multiple services to potentially exploit); increased consequences of inadvertent exposure of internal data, application functions and architecture; greater consequences if an API is compromised or hijacked and serves malicious payloads to consumers; elevated privacy concerns wherever APIs give access to personally identifiable information; and the potential for bulk retrieval of resources, which, if uncontrolled, could allow large-scale extraction of client or whānau data.

Other API-specific risks include: malware or ransomware uploaded via unvalidated incoming requests; risks relating to lax security practice in cloud and container-based systems; use of resource-create/update operations to introduce misinformation or overload MSD's services (denial of service); wildcard search parameters flowing through to backend datastores, causing excessive load or over-disclosure; cross-site scripting and SQL injection via unvalidated inputs; HTTP Parameter Pollution and other parameter attacks; man-in-the-middle interception of requests or responses; subversion of authentication or authorisation mechanisms to spoof legitimate consumers; credential leakage or token theft; system information leakage through overly detailed error messages; and broken session IDs, keys or authentication mechanisms that create unintended access.

Exposing too much information through generic, one-size-fits-all resource APIs — rather than APIs tailored to specific circumstances — is itself a risk worth calling out separately, since it tends to accumulate quietly as an API's consumer base grows.

## **Towards zero trust and decoupled environments**

<Standard type="INFO">
Zero trust (ZT) describes an evolving set of cybersecurity paradigms that move defences from static, network-based perimeters to focus on users, assets and resources. A zero trust architecture assumes no implicit trust is granted to assets or accounts based solely on physical or network location, or on asset ownership. (Definition adapted from NIST.)
</Standard>

Zero trust architecture removes the concept of trusted internal versus untrusted external networks, focusing instead on “never trust, always verify”. The shift to cloud services has brought this model to the fore: every actor — staff, delivery partners and others — requires access controls regardless of location or device.

<Standard id="MSDAS_SHOULD_MSD_CONSIDER_FOLLOWING_PLANNING_ZERO" type="SHOULD">
MSD should consider the following when planning a Zero Trust architecture: apply strong identification and authentication; build a dynamic digital trust model, valid only for the current session; constantly evaluate and always authenticate; apply contextual authorisation (attributes, consent, location, time, behaviour); build in a digital risk capability that maps to a level of confidence and constantly re-evaluates; incorporate endpoint (device) security; apply transaction-level verification and continuous session validation; apply data security via encryption and user privacy controls, including consent management; implement strong auditing, logging, event reporting and forensics; use automated analytics for threat detection; inject identity context into API traffic (user, application, device); apply fine-grained access control at egress points to modify or block responses; propagate identity through to backend services to inform decisions; and secure all APIs as if they were public.
</Standard>
