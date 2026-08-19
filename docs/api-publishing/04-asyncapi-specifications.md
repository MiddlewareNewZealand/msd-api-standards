---
title: "AsyncAPI Specifications"
---

The AsyncAPI Specification describes and documents message-driven APIs in a machine-readable, protocol-agnostic format - usable for APIs over AMQP, MQTT, WebSockets, Kafka, HTTP and more (see Part C, Asynchronous APIs, Protocols and APIs).

AsyncAPI specification structure:

| Component | Description | Requirement |
| :---- | :---- | :---- |
| AsyncAPI specification | The core specification. | All mandatory fields defined in the specification itself |
| Property descriptions | Human-readable description of each property. | MUST be provided for all properties |

## **AsyncAPI section**

<Standard id="MSDAS_MUST_DECLARE_ASYNCAPI_VERSION" type="MUST">
The asyncapi property, indicating the specification version in use, MUST be included.
</Standard>

## **Info section**

| Property | Description | Requirement |
| :---- | :---- | :---- |
| info.title | The title of the API. | MUST |
| info.description | See Property Descriptions. | MUST |
| info.license | | info.license.name MUST; info.license.url MUST |
| info.version | The version of the API. | MUST |
| info.contact | Mechanism for contacting the API Provider. | info.contact.name MUST; info.contact.url MUST |

## **Servers section**

| Property | Description | Requirement |
| :---- | :---- | :---- |
| servers.url | The API Provider host. | MUST |
| servers.protocol | The protocol supported by this host. | MUST |
| servers.security | The security mechanisms usable with this server. | MUST |
| servers.description | Additional information, e.g. the environment. | SHOULD |

## **Channels section**

Holds the relative paths to individual channels and their operations - channels are also known as topics, routing keys, event types, or paths (see Part C, Topics and Subscriptions). Note that the structure of this section changed significantly between AsyncAPI versions 2 and 3\.

* The address field (v3+) <Standard inline id="MSDAS_MUST_PUT_TOPIC_NAME_IN_ADDRESS_FIELD" type="MUST" toolTip="In AsyncAPI v3 and later, the address field must contain the topic name.">MUST</Standard> contain the topic name. In v2, the topic name <Standard inline id="MSDAS_MUST_PUT_TOPIC_NAME_IN_V2_DESCRIPTION" type="MUST" toolTip="In AsyncAPI v2, which has no address field, the topic name must be included in the description field instead.">MUST</Standard> be included in the description field instead.

* The servers field <Standard inline id="MSDAS_MUST_INDICATE_CHANNEL_SERVERS" type="MUST" toolTip="The servers field must indicate which servers the channel is available on.">MUST</Standard> indicate which servers the channel is available on.

* The messages field (v3+) <Standard inline id="MSDAS_MUST_DEFINE_CHANNEL_MESSAGES" type="MUST" toolTip="In AsyncAPI v3 and later, the messages field must represent the messages published to a channel.">MUST</Standard> represent the messages published to a channel. In v2, the message field under publish or subscribe <Standard inline id="MSDAS_MUST_DEFINE_CHANNEL_MESSAGES_IN_V2" type="MUST" toolTip="In AsyncAPI v2, which has no channel-level messages field, the message field under publish or subscribe must represent the messages published to a channel.">MUST</Standard> be used instead.

## **External docs section**

<Standard id="MSDAS_MUST_PROVIDE_EXTERNAL_DOCS_URL" type="MUST">
externalDocs.url, a link to further documentation about the API, MUST be provided.
</Standard>

## **AsyncAPI validation**

<Standard id="MSDAS_MUST_VALIDATE_ASYNCAPI_DOCUMENT" type="MUST">
The AsyncAPI document MUST pass validation against the AsyncAPI specification, ideally as part of an automated pipeline or developer IDE integration.
</Standard>
