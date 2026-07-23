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

**&#42;&#42;&#42;&#42;add sequence diagram example**
