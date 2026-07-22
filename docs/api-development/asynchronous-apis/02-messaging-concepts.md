---
title: "Messaging concepts"
---

Asynchronous and event-driven architecture uses terminology that can mean different things in other contexts. This glossary defines how these terms are used throughout this section.

| Concept | Description |
| --- | --- |
| Message | A packet of data transmitted over a channel, containing data such as an event. |
| Message Producer | A software application which publishes messages to API Consumers using Asynchronous APIs. |
| Event | A message containing information about something that has occurred — for example, a benefit payment being issued, or a client updating their address. |
| Event Producer | A software application which publishes event messages to API Consumers using Asynchronous APIs. |
| Unbounded event | An event containing continuous, unbounded data — for example, a stream of readings from a monitoring device. |
| Discrete event | An event containing discrete data: a fact that has happened, such as a payment being issued. |
| Message broker | Software that lets API Consumers and Providers communicate. The broker distributes messages to the correct channels (routing), applies authorisation, manages subscriptions and applies transformations. |
| Topic | A destination that an API Provider publishes messages to. |
| Queue | A destination API Producers publish to, and an endpoint API Consumers bind to and consume messages from. |
| Event schema | A specification defining the data structure contained in a message. |
| Subscription | A unique relationship to a topic by a subscriber, indicating it should receive updates for that topic. |
| Subscriber | The API Consumer. |
