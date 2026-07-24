---
title: "Partners"
---

## **Standards bodies and agencies**

| Partner | Description |
| --- | --- |
| Government Digital Delivery Agency (GDDA) | Sits within the Public Service Commission and holds the Government Chief Digital Officer (GCDO) function (transitioned from the Department of Internal Affairs on 1 April 2026). Sets government-wide digital and data standards, including the Government API Standards and Guidelines that these MSD standards align with. |

## **Pivotal standards and frameworks**

| Framework | Description |
| --- | --- |
| New Zealand Government API Standards and Guidelines | Cross-government standards for designing, securing and publishing APIs, maintained by the Government Digital Delivery Agency (GDDA), which now holds the Government Chief Digital Officer (GCDO) function. These MSD standards are a sector-specific implementation of that guidance. |
| Protective Security Requirements (PSR) / NZISM | Baseline government security requirements that inform MSD's approach to API and information security (see Part B). |

```plantuml alt="Diagram showing the governance and derivation hierarchy behind MSD API Standards"
@startuml

skinparam {
    defaultFontColor #1c5773
    defaultBackgroundColor #d7f8ff
    defaultComponentColour #61d9de
    defaultActorColour #61d9de
    defaultFontSize 16
    defaultArrowThickness 6
    actorStyle awesome
    linetype polyline
}

rectangle "Standards Governance" {
    actor "Government Digital Delivery Agency (GDDA) /\nGovernment Chief Digital Officer (GCDO)" as GDDA
    component "New Zealand Government API\nStandards and Guidelines" as NZGAPI
    component "MSD API Standards" as MSDAPI
    component "Protective Security Requirements (PSR) / NZISM" as PSR
    GDDA .[#green,dashed,thickness=8].> NZGAPI : sets
    MSDAPI .[#green,dashed,thickness=8].> NZGAPI : implements
    PSR .[#green,dashed,thickness=8].> MSDAPI : informs security\napproach (Part B)
}
@enduml
```

<DetailedDescription text="The Government Digital Delivery Agency (GDDA), which holds the Government Chief Digital Officer (GCDO) function, sets the New Zealand Government API Standards and Guidelines, which MSD API Standards implement as a sector-specific derivation. Separately, the Protective Security Requirements (PSR) and NZISM inform MSD's approach to API security, as covered in Part B." />

## **Products and tools**

| Product / tool | Description |
| --- | --- |
| Add standards chosen here | |
