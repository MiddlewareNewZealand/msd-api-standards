---
title: "Standards Component Definitions"
---

This section provides a list of common API standards components and their associated definitions, adapted for an MSD and social sector context.

## **API Provider**

An API Provider, in the context of these standards, is a software application:

- That produces a REST or Asynchronous API.

- That can be published via the MSD Developer Portal or an equivalent sector capability.

- That has completed an appropriate API Provider onboarding process.

## **API Consumer**

An API Consumer, in the context of these standards, is a software application:

- That consumes a REST, Asynchronous or MCP AP provided by MSD.

- That has completed an approved API Consumer onboarding and certification process.

## **Social Sector Clients and Whānau**

A social sector client, in the context of these standards, is a person interacting — via a software application — with an API Consumer that is consuming an API published on the MSD Developer Portal or equivalent sector capability. This includes individuals accessing income support, employment services, housing assistance or care and protection services, and their whānau.

## **Social Sector Organisations**

A social sector organisation, in the context of these standards, is any organisation that provides or supports social services. This includes government agencies, community and iwi providers, NGOs, and contracted service providers. Participants in these organisations may use a software application that consumes API’s on behalf of a client or whanau.

## **Social Sector Workers**

A social sector worker, in the context of these standards, is any person who provides or supports social services. This includes case managers, employment consultants, social workers, community support workers, and other frontline and back-office MSD and partner-agency staff.

## **API Designers**

An API Designer, in the context of these standards, is a software developer or architect who specialises in designing APIs. API designers work to create APIs that are easy to use, efficient and secure, and typically have a strong understanding of software development principles as well as a good working knowledge of the business context they're designing for.

## **API Developers**

An API Developer, in the context of these standards, is a software engineer who designs, builds and maintains APIs — the sets of rules that allow different software applications to communicate with each other. API developers create APIs that let other developers access data and functionality without needing to know the underlying implementation.

## **Application Developers**

An Application Developer, in the context of these standards, is a software engineer who designs, develops, tests and deploys software applications, typically specialising in a particular type of development such as mobile, web or enterprise software.

| Characteristic | API Developer | Application Developer |
| --- | --- | --- |
| Primary focus | Developing APIs | Developing software applications |
| Audience | Other developers | Social sector workers, clients and whānau |
| Example tasks | Design and develop new APIs; maintain and update existing APIs; create API documentation | Gather and analyse user requirements; design and develop software applications; write and test code; debug and fix defects; deploy and maintain applications |

## **Message Producer**

A Message Producer, in the context of these standards, is a software application that publishes data to API Consumers using Asynchronous APIs — for example, publishing an event when a client's case status changes.

## **How these components relate**

At a social sector organisation, an API Developer builds and operates an API Provider; an Application Developer builds and operates an API Consumer. The API Developer works through the MSD Developer Portal to publish their API, which is then discoverable and consumable by Application Developers across MSD and its delivery partners.

Social sector clients, whānau, iwi and community providers interact with API Consumers — the applications built on top of MSD's published APIs — rather than with the underlying APIs directly. A Message Producer at a social sector organisation publishes data (for example, a change of circumstances event) to a message broker, which is then consumed by one or more API Consumers.
