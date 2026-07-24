---
title: "API State"
---

## **Consideration of state**

<Standard id="MSDAS_SHOULD_ALMOST_ALL_CASES_REST_API" type="SHOULD">
In almost all cases, a REST API SHOULD be entirely stateless.
</Standard>

As part of processing, an API may gather context and pass it to a downstream system, but <Standard inline id="MSDAS_SHOULD_NOT_API_MAINTAIN_CONTEXT_FUTURE_REQUESTS" type="SHOULD NOT" toolTip="An API may gather context and pass it to a downstream system, but should not maintain that context for future requests.">SHOULD NOT</Standard> maintain that context for future requests. This shouldn't be confused with caching (see Caching, below): a typical stateless flow has the API layer forwarding requests to a service layer, which may itself hold state (some services are stateful, others aren't) and pass state between services via service-to-service messaging — for example, an API being notified of a state transition via a state transition queue or topic, without the API layer itself retaining that state between requests.

## **State in process APIs**

In some solution domains, API Providers need to implement services that are process-driven — either short-running (completed within a single consumer request) or long-running (persisting over many requests, potentially over an extended period, such as a multi-stage benefit application or a case review workflow). In these cases, the state of the process flow matters to the API Consumer, since it affects what the consumer can do next.

<Standard id="MSDAS_MUST_RESTFUL_APIS_EMBODY_PROCESS_WORKFLOW" type="MUST">
RESTful APIs that embody a process workflow MUST provide a mechanism for the API Consumer to retrieve the current state of their process.
</Standard>

Since process flows are typically specific to the business domain an API supports, it's prudent to implement the specific state model and flow logic in a single logical component — a service orchestrator — for ease of testing and maintenance. The service orchestrator dispatches requests to the services appropriate for the current process position, and keeps track of overall process state; the API itself becomes a facade over the orchestrator. A consumer initiating a process receives a Location header pointing to a status resource; querying that resource at any point returns the current state of the process, however many internal services the orchestrator has since dispatched work to.

```plantuml alt="Sequence diagram showing state retrieval for a process-driven API"
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
participant "API (facade)" as API
participant "Service Orchestrator" as Orchestrator
participant "Services" as Services

Consumer -> API: POST /process
API -> Orchestrator: start process
Orchestrator -> Services: dispatch work
Services --> Orchestrator: result
Orchestrator --> API: process started
API --> Consumer: 202 Accepted\nLocation: /status/{id}

...time passes, orchestrator continues dispatching work...

Consumer -> API: GET /status/{id}
API -> Orchestrator: query current state
Orchestrator --> API: current state
API --> Consumer: 200 OK\ncurrent state
@enduml
```

<DetailedDescription text="An API Consumer starts a process with a POST request and receives a Location header pointing to a status resource. Later, a separate GET request on that status resource returns the process's current state, as tracked by the service orchestrator across whichever backend services it has dispatched work to." />
