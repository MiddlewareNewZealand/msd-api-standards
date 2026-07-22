---
title: "API Design and Documentation"
---

<Standard id="MSDAS_MUST_API_PROVIDERS_ASYNCHRONOUS_API_DOCUMENT" type="MUST">
API Providers of an Asynchronous API MUST document the API using a combination of AsyncAPI (to describe API flows, access and behaviour) and JSON Schema (to describe message structures).
</Standard>

AsyncAPI extends the same design thinking as OpenAPI to cover asynchronous, event-driven interactions, which may not always use HTTP as the underlying transport.

<Standard id="MSDAS_SHOULD_APIS_USE_CLOUDEVENTS_SPECIFICATION" type="RECOMMENDED">
APIs published by MSD are recommended to use the CloudEvents specification to structure event messages, giving consumers a consistent envelope (type, source, subject, etc.) across all published events.
</Standard>

Using a consistent, well-documented event schema allows API Consumers and Publishers to design against a known message structure, accelerating integration on both sides. API Providers <Standard inline id="MSDAS_SHOULD_API_PROVIDERS_VALIDATE_OUTGOING_MESSAGES" type="SHOULD" toolTip="API Providers should validate outgoing messages against their published JSON Schema before publishing them.">SHOULD</Standard> validate outgoing messages against their published JSON Schema before publishing them.

<Standard id="MSDAS_MAY_API_PROVIDERS_CHOOSE_OFFER_EVENT" type="MAY">
API Providers MAY choose to offer an event catalog or schema registry, published via the MSD Developer Portal, so consumers can discover available event types without needing to contact the provider directly.
</Standard>
