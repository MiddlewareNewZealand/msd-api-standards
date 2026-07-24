---
title: "Publish/Subscribe (Pub/Sub)"
---

<Standard id="MSDAS_SHOULD_API_PROVIDERS_USE_PUB_SUB" type="SHOULD">
API Providers SHOULD use the Pub/Sub pattern for integration event messages published within the social sector, as it's best suited to increasing interoperability.
</Standard>

An API Provider publishes events to be delivered to none, one, or many consumers, decoupling the producer from consumers via a message broker. The provider has no concern with whether a message was received; each subscriber gets its own copy of the message. For example, when a client's entitlement status changes, the event might be routed to a central reporting system, the client's assigned service centre, and a partner agency system — each receiving its own copy.

Use this pattern when: broadcasting to a significant number of consumers; integrating independently-developed systems on different platforms; no real-time response is required from consumers; the systems involved support eventual consistency; or no acknowledgement of receipt is required.

```plantuml alt="Sequence diagram showing a single event fanned out to multiple subscribers"
@startuml

skinparam BackgroundColor #d7f8ff
skinparam DefaultFontColor #1c5773
skinparam DefaultFontSize 16
skinparam ArrowColor #1c5773
skinparam ArrowThickness 2
skinparam LifeLineBorderColor #1c5773
skinparam LifeLineBackgroundColor #ffffff
skinparam ParticipantBackgroundColor #61d9de
skinparam ParticipantBorderColor #1c5773
skinparam ParticipantFontColor #1c5773
skinparam ActorBackgroundColor #61d9de
skinparam ActorBorderColor #1c5773
skinparam ActorFontColor #1c5773
skinparam NoteBackgroundColor #ffffff
skinparam NoteBorderColor #1c5773

participant "Event Producer" as Producer
participant "Message Broker\n(Topic)" as Broker
participant "Reporting System" as Reporting
participant "Service Centre System" as ServiceCentre
participant "Partner Agency System" as Partner

Producer -> Broker: publish event\n(entitlement status changed)
Broker -> Reporting: deliver copy
Broker -> ServiceCentre: deliver copy
Broker -> Partner: deliver copy

note over Reporting, Partner
Each subscriber receives its own
copy of the event independently.
No reply is expected by the producer.
end note
@enduml
```

<DetailedDescription text="An Event Producer publishes a single event to a message broker, which fans it out to independent subscribers — a reporting system, the client's service centre, and a partner agency system — each receiving its own copy, with no reply expected." />
