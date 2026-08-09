---
title: "Security"
---

Part B: API Security applies fully to Asynchronous APIs, in the same way it applies to REST APIs.

<Standard id="MSDAS_MUST_ENCRYPT_ASYNCHRONOUS_MESSAGES" type="MUST">
Messages used in Asynchronous APIs MUST use transport-level encryption, regardless of protocol. API Consumers MUST be authenticated and authorised, and authorisation MUST be used to restrict access to topics. A Message Type MUST be selected that meets the use case's requirements alongside privacy and interoperability goals.
</Standard>
