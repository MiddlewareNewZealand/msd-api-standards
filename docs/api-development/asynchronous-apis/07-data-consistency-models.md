---
title: "Data consistency models"
---

Data consistency describes how uniform, accurate and coherent data is across API Producers and Consumers. The right consistency model depends heavily on the use case — not just the type of data.

<Standard type="EXAMPLE">
Scenario: a client is assessed as being at risk of serious harm, and a case manager flags a safety alert on their file. At the point of decision, other case managers and duty staff who might interact with that client MUST see this alert immediately — this calls for strong consistency. But if the same event is being used six months later for policy analysis of risk-assessment patterns, eventual consistency is perfectly sufficient.
</Standard>

## **Eventual consistency**

Guarantees updates will propagate through all integrated systems and become consistent, given enough time. Not suited to data requiring strict, immediate accuracy. Appropriate for events such as: a client's preferred name was updated; a client's contact details changed; a provider's accreditation was renewed.

## **Strong consistency**

Ensures all API Consumers hold an accurate copy of the data without temporary inconsistency. Appropriate for events such as: a safety alert was flagged on a client's file; a benefit payment was issued; a client's case was escalated for urgent review.
