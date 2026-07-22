---
title: "Publishing MCP Servers"
---

MCP Servers don't have a static specification artefact in the way OpenAPI or AsyncAPI provide for other API types (see Part D) — capabilities are discovered dynamically at connection time. This doesn't remove the obligation to document the Server for prospective integrators.

<Standard id="MSDAS_MUST_API_PROVIDERS_MCP_SERVER_PUBLISH" type="MUST">
API Providers of an MCP Server MUST publish a capability catalogue — a human-readable list of available Tools, Resources and Prompts with their purpose, required scopes, and any side effects — via the MSD Developer Portal, in addition to the machine-readable discovery the protocol itself provides.
</Standard>

The Business Context, Diagrams, Terms and Conditions, Developer Onboarding and SLA requirements set out in Part D apply equally to MCP Servers as to REST and Asynchronous APIs.
