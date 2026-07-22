---
title: "Security"
---

Part B: API Security applies fully to Asynchronous APIs, in the same way it applies to REST APIs.

<Standard id="MSDAS_MUST_MESSAGES_USED_ASYNCHRONOUS_APIS_USE" type="MUST">
Messages used in Asynchronous APIs MUST use appropriate transport-level encryption, regardless of protocol. API Consumers MUST be authenticated and authorised using appropriate mechanisms, and authorisation MUST be used to restrict access to topics as appropriate. An appropriate Message Type MUST be selected to meet the use case's requirements alongside privacy and interoperability goals.
</Standard>
