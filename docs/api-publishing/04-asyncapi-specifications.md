---
title: "AsyncAPI Specifications"
---

The AsyncAPI Specification describes and documents message-driven APIs in a machine-readable, protocol-agnostic format — usable for APIs over AMQP, MQTT, WebSockets, Kafka, HTTP and more (see Part C, Asynchronous APIs, Protocols and APIs).

AsyncAPI specification structure:

| Component | Description | Requirement |
| :---- | :---- | :---- |
| AsyncAPI specification | The core specification. | All mandatory fields defined in the specification itself |
| Property descriptions | Human-readable description of each property. | MUST be provided for all properties |

## **AsyncAPI section**

<Standard id="MSDAS_MUST_ASYNCAPI_PROPERTY_INDICATING_SPECIFICATION_VERSION" type="MUST">
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

Holds the relative paths to individual channels and their operations — channels are also known as topics, routing keys, event types, or paths (see Part C, Topics and Subscriptions). Note that the structure of this section changed significantly between AsyncAPI versions 2 and 3\.

* The address field (v3+) <Standard inline id="MSDAS_MUST_ADDRESS_FIELD_CONTAIN_TOPIC_NAME" type="MUST" toolTip="The address field (v3+) must contain the topic name. In v2, this must be included in the description field instead.">MUST</Standard> contain the topic name. In v2, this <Standard inline id="MSDAS_MUST_ADDRESS_TOPIC_NAME_V2_DESCRIPTION_FIELD" type="MUST" toolTip="In AsyncAPI v2, the topic name must be included in the description field instead of the address field.">MUST</Standard> be included in the description field instead.

* The servers field <Standard inline id="MSDAS_MUST_SERVERS_FIELD_INDICATE_CHANNEL_SERVERS" type="MUST" toolTip="The servers field must indicate which servers the channel is available on.">MUST</Standard> indicate which servers the channel is available on.

* The messages field (v3+) <Standard inline id="MSDAS_MUST_MESSAGES_FIELD_REPRESENT_PUBLISHED_MESSAGES" type="MUST" toolTip="The messages field (v3+) must represent the messages published to a channel.">MUST</Standard> represent the messages published to a channel. In v2, the message field under publish or subscribe <Standard inline id="MSDAS_MUST_MESSAGE_FIELD_V2_PUBLISH_SUBSCRIBE" type="MUST" toolTip="In AsyncAPI v2, the message field under publish or subscribe must be used to represent the messages published to a channel.">MUST</Standard> be used.

## **External docs section**

<Standard id="MSDAS_MUST_EXTERNALDOCS_URL_LINK_FURTHER_DOCUMENTATION" type="MUST">
externalDocs.url, a link to further documentation about the API, MUST be provided.
</Standard>

## **AsyncAPI validation**

<Standard id="MSDAS_MUST_ASYNCAPI_DOCUMENT_PASS_VALIDATION_AGAINST" type="MUST">
The AsyncAPI document MUST pass validation against the AsyncAPI specification, ideally as part of an automated pipeline or developer IDE integration.
</Standard>
