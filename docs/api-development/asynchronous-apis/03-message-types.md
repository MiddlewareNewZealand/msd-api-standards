---
title: "Message types"
---

The type of message used depends on the use case. Event-driven architectures typically publish domain events (private, used internally e.g. between microservices) or integration events (intended for external consumers, and designed not to leak private implementation detail).

When publishing integration events there's a balance to strike between publishing too much information (risking unnecessary disclosure of client or whānau data) and too little (forcing consumers back to the source system for every detail).

## **Event notification (thin events)**

A “thin” message contains no data, or the minimum needed to inform a consumer that an event occurred. Interested consumers can contact the API Provider (typically via REST) for further detail.

<Standard id="MSDAS_MAY_THIN_EVENTS_INCLUDE_POINTER_URL" type="MAY">
Thin events MAY include a pointer (URL or identifier) back to the resource that triggered the notification. If no pointer is supplied, the data source MUST allow subscribers to query specifically for changed resources (e.g. lastUpdatedTime > `{last query time}`).
</Standard>

```json
{
  "specversion": "1.0",
  "type": "entitlement_status_changed",
  "source": "income-support",
  "subject": "client/12345",
  "id": "5a5c049a-...",
  "time": "2026-07-13T09:12:00Z",
  "data": {
    "url": "https://api.msd.govt.nz/clients/12345/entitlements/E100782"
  }
}
```

Characteristics: minimal information transferred, reducing the risk of unauthorised disclosure; less risk of data going out of sync, since consumers fetch the latest data themselves; smaller, simpler contracts that are easier to evolve. This message type <Standard inline id="MSDAS_SHOULD_THIN_MESSAGE_TYPE_UNTRUSTED_CONSUMER" type="SHOULD" toolTip="The thin-event message type should be used where the API Consumer is not fully trusted, or where re-authentication of the client is required.">SHOULD</Standard> be used where the API Consumer isn't fully trusted, or where re-authentication of the client is required — which is common with the Pub/Sub pattern.

## **Event-carried state transfer (thick events)**

A “thick” event carries enough current data for the consumer to act on the event without contacting the source system — sometimes called a “fact” event, since it captures state at a point in time.

```json
{
  "specversion": "1.0",
  "type": "entitlement_status_changed",
  "source": "income-support",
  "subject": "client/12345",
  "id": "5a5c049a-...",
  "time": "2026-07-13T09:12:00Z",
  "data": {
    "client": { "id": "12345", "givenName": "Aroha", "familyName": "Ngata" },
    "entitlement": { "type": "jobseeker-support", "previousStatus": "under-review", "newStatus": "active" }
  }
}
```

Characteristics: consumers are fully decoupled from the provider, since they already hold the data they need; when multiple events for the same subject are processed in order, a consumer must account for the possibility it isn't using the very latest data due to processing delay; greater care is needed with event versioning and schema change; data is eventually consistent rather than instantaneously so. Thick events suit integrations using the Point to Point pattern, where the consumer is known and trusted, or where it's undesirable for the consumer to make additional calls back to the provider.

## **Delta events**

A delta event details only what changed between one state and the next — the fields that changed, their new values, and optionally the reason for the change — without repeating unchanged data.

```json
{
  "specversion": "1.0",
  "type": "client_nextofkin_updated",
  "source": "case-management",
  "subject": "client/12345",
  "id": "5a5c049a-...",
  "time": "2026-07-13T09:12:00Z",
  "data": {
    "oldNextOfKin": { "givenName": "John", "familyName": "Roberts", "relation": "Spouse" },
    "currentNextOfKin": { "givenName": "Kaia", "familyName": "Nash", "relation": "Mother" }
  }
}
```

Delta events can reduce processing effort for consumers who don't otherwise know the prior state, and reduce payload size relative to a thick event.

## **Message header fields**

Message headers (sometimes called message metadata) let a message broker perform routing and logging without inspecting the full payload. Where the CloudEvents specification is used, this metadata is expressed as Context Attributes — id, source, specversion and type are mandatory. Where a specification like CloudEvents isn't in use, the following minimal header set is suggested:

| Header | Example value | Description |
| --- | --- | --- |
| Content-Type | application/json | Indicates the content type of the message. |
| Correlation-Id | 63841126-0aba-4e21-... | Unique identifier for the interaction. |
| Event-Id | 54e7587e-5a38-4c85-... | Unique identifier for this event, used for idempotency. |
