---
title: "Discovery and capability negotiation"
---

Clients discover a Server's available Tools, Resources and Prompts dynamically at connection time, rather than relying on a static, separately published specification document (contrast with OpenAPI in Part D). The precise mechanism for this discovery, and for notifying a connected Client when a Server's capabilities change, is defined by the MCP specification and has changed between revisions.

<Standard id="MSDAS_SHOULD_MCP_SERVERS_NOTIFY_CONNECTED_CLIENTS" type="SHOULD">
MCP Servers SHOULD notify connected Clients when their available capabilities change at runtime (for example, tools that become available only once a case is in a particular status), using whatever notification mechanism the current specification provides, so Hosts don't need to poll for changes.
</Standard>

```plantuml alt="Sequence diagram showing capability discovery followed by a later change notification"
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

participant "MCP Client" as Client
participant "MCP Server" as Server

Client -> Server: connect
Client -> Server: request capability list
Server --> Client: available Tools, Resources, Prompts

...later, at runtime...

note over Server
Server's available capabilities
change (for example, a tool becomes
available only once a case is in a
particular status).
end note

Server -> Client: capability change notification
Client -> Server: request capability list
Server --> Client: updated Tools, Resources, Prompts
@enduml
```

<DetailedDescription text="A Client connects to a Server and requests its capability list, receiving the available Tools, Resources and Prompts. Later, when the Server's capabilities change at runtime, the Server sends a change notification and the Client refreshes its capability list rather than polling." />
