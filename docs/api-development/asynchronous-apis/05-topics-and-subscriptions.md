---
title: "Topics and subscriptions"
---

A Message Producer uses topics to route messages to interested API Consumers; an API Consumer uses topics within its subscriptions to filter the messages it wants to receive. Well-architected, consistent topic design is central to a reusable event-driven API.

<Standard id="MSDAS_MUST_APPLY_TOPIC_DESIGN_CONSISTENTLY" type="MUST">
Topic design MUST be applied consistently once agreed.
</Standard>

<Standard id="MSDAS_MUST_NOT_CHANGE_MEANING_OF_TOPIC_ROOT_LEVELS" type="MUST NOT">
The root levels of a topic MUST NOT change meaning.
</Standard>

<Standard id="MSDAS_MUST_SEPARATE_TOPIC_LEVELS_WITH_SLASH" type="MUST">
Topic levels MUST be separated by / rather than concatenation, to support subscription filtering.
</Standard>

A general topic design pattern: `{domain}/{action}/{identifier}` - for example:

| Topic level | Description | Example |
| --- | --- | --- |
| Domain | The domain of the event. | entitlement, client, case |
| Action | The past-tense action that occurred. Avoid HTTP-verb style naming. | issued, updated, reassigned, closed |
| Identifier | An identifier for the subject of the event. | clientId, caseId |

Consider an entitlement_status_changed event. Multiple parties are likely interested - for example, a central reporting system that wants every such event, and a specific service centre that only wants events for its own caseload. A flat topic like entitlement/status-changed doesn't let the service centre filter to just its own clients. A richer hierarchy does:

```text
entitlement/status-changed/{serviceCentreId}/{clientId}
```

A service centre could then subscribe using a filter such as entitlement/status-changed/porirua-sc/*, receiving only events for its own clients, while a central reporting system subscribes more broadly to entitlement/status-changed/> to receive everything. These specific wildcard characters (+, # and* are common examples) are illustrative of the capability required, not a mandate to use MQTT or any other specific broker technology - see the note below.

<Standard id="MSDAS_MUST_PROVIDE_SUBSCRIPTION_MECHANISM" type="MUST">
A Message Producer MUST provide a mechanism for API Consumers to subscribe and unsubscribe from available channels, and MUST provide a way for a consumer to filter the topic hierarchy down to a subset of it (e.g. events for one service centre only) rather than being limited to “all events on this topic” or “no events on this topic”. Whatever filtering mechanism the chosen broker technology provides to achieve this MUST be documented alongside the API.
</Standard>

<Standard type="NOTE">
This requirement is about the filtering capability an API Consumer needs, not about mandating a specific broker or wildcard syntax. MQTT-style wildcards (+, #) are one common way of meeting it, but other mechanisms - for example, correlation or SQL-style subscription filters, as used by Azure Service Bus, or subject-prefix filters, as used by Azure Event Grid - satisfy the same requirement and are equally acceptable. API Providers should choose whichever mechanism their broker technology supports, document it clearly, and ensure it lets consumers subscribe to a meaningful subset of a topic hierarchy rather than only the whole of it.
</Standard>
