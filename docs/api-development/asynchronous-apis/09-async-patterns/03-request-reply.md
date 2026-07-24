---
title: "Request/reply"
---

Used for “command” messages, where the sender expects a result or confirmation back. An API Consumer publishes a request (for example, generate_client_summary) to a request channel; a service processes it and publishes the result to a corresponding reply channel, which the original consumer subscribes to.

This is well suited to processing that may take longer than a typical HTTP request duration — for example, generating a complex case summary that aggregates data from multiple systems — or to downstream services that are rate-limited and can only process a constrained level of concurrency.

```plantuml alt="Sequence diagram showing a request published to a request channel and a reply delivered via a separate reply channel"
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

actor "API Consumer" as Consumer
participant "Request Channel" as RequestChannel
participant "Service" as Service
participant "Reply Channel" as ReplyChannel

Consumer -> RequestChannel: publish request\n(generate_client_summary)
RequestChannel -> Service: deliver request

note over Service
Service processes the request.
This may take longer than a typical
HTTP request duration.
end note

...asynchronous processing gap...

Service -> ReplyChannel: publish result
ReplyChannel -> Consumer: deliver result\n(Consumer is subscribed\nto the reply channel)
@enduml
```

<DetailedDescription text="An API Consumer publishes a request, such as generate_client_summary, to a request channel; a service processes it after an asynchronous gap and publishes the result to a separate reply channel, which the same consumer is subscribed to and receives the result from." />
