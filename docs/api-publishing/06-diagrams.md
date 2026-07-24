---
title: Diagrams
---
Effective use case diagrams document an API's behaviour in an easily human-readable way. Technical components and the parties involved in the API's execution are shown as actors, so the reader can focus on the overall flow and the interactions between them.

When creating use case diagrams, consider:

- Actors — the people, systems and organisations involved in the use case.

- Relationships — how the actors relate to one another.

- Purpose — the role each actor plays.

## **Example**

The table below sets out an example use case for an MSD Entitlement Status API, helping delivery partner developers understand the API's overall purpose.

| Actor | Relationship | Purpose |
| --- | --- | --- |
| Aroha Ngata | The MSD client | Aroha applies for and receives a change to her Jobseeker Support entitlement |
| Case Manager | Aroha's assigned case manager at her local service centre | Assesses and updates Aroha's entitlement status |
| MSD Case Management System | The system used by the case manager | Publishes entitlement status change events to the API |
| Entitlement Status API | Interface for accessing entitlement status information | The MSD API exposing entitlement status to authorised consumers |

<Standard id="MSDAS_SHOULD_DIAGRAM_TYPE_AT_API_PROVIDER" type="SHOULD">
The diagram type is at the API Provider's discretion, though UML sequence diagrams are recommended (see Publishing Components, Diagrams).
</Standard>

```plantuml alt="Sequence diagram showing the Entitlement Status API use case"
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

actor "Case Manager" as CaseManager
participant "MSD Case Management System" as CMS
participant "Entitlement Status API" as API
participant "Delivery Partner Application" as Partner
actor "Aroha Ngata" as Aroha

CaseManager -> CMS : Updates Aroha's entitlement status
CMS -> API : Publishes entitlement status change
Partner -> API : Calls API for current status
API --> Partner : Returns current entitlement status
Partner -> Aroha : Surfaces updated status

@enduml
```

<DetailedDescription text="This sequence diagram shows the Case Manager updating Aroha Ngata's entitlement status in the MSD Case Management System, which publishes the change to the Entitlement Status API. A delivery partner application then calls the API and surfaces the current status back to Aroha." />
