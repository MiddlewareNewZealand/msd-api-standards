---
title: "C.3 MCP APIs"
---

A growing category of integration doesn't fit the human-application-to-API model that Synchronous and Asynchronous APIs are designed for: AI agents and assistants that need to discover and invoke capabilities dynamically, on behalf of a case manager or other MSD staff member, in the course of a conversation or task. The Model Context Protocol (MCP) is the emerging standard for this kind of integration.

<Standard type="INFO">
MCP is a young, fast-moving specification and is currently under active, sometimes substantial, revision. This section deliberately sets out durable principles rather than mechanism-level detail (specific message names, transport names, or endpoint paths), since those details are likely to change between specification revisions. Before building or updating an MCP Server, MSD API Developers MUST check the current published MCP specification for the exact mechanism in force at the time — message formats, transport requirements, session/statefulness model, and authorisation flow have all changed materially between revisions and should be expected to change again.
</Standard>

<Standard id="MSDAS_SHOULD_MCP_USED_PRIMARY_CONSUMER_AI_AGENT" type="SHOULD">
MCP SHOULD be used when the integration's primary consumer is an AI agent or assistant that needs to select and invoke capabilities dynamically. Where the consumer is a conventional application performing a known, fixed sequence of calls, a Synchronous or Asynchronous API remains the appropriate choice.
</Standard>
