---
title: "Core concepts"
---

MCP defines three roles, which remain stable across specification revisions even as the mechanics of how they communicate evolve:

| Role | Description |
| --- | --- |
| MCP Host | The AI application a user interacts with directly — for example, an AI assistant embedded in a case management tool. The Host embeds one or more MCP Clients. |
| MCP Client | Connects to a single MCP Server on behalf of the Host, handling capability discovery and message exchange. |
| MCP Server | Exposes capabilities to Clients. An MSD MCP Server is analogous to an API Provider in Parts A–C, but exposes capabilities an agent selects dynamically, rather than a fixed contract a developer codes against in advance. |

Servers typically expose capabilities through a small set of primitives, which have been broadly consistent across specification revisions to date:

| Primitive | Description |
| --- | --- |
| Tools | Functions the agent can invoke to take action or retrieve information — for example, get-client-entitlements or create-case-note. Each tool declares a schema for its input and, where possible, its output. |
| Resources | Addressable data the agent can read — for example, a client's current support plan document. |
| Prompts | Reusable, parameterised prompt templates a Host can surface to a user — for example, a template for drafting a case review summary in MSD's standard format. |

MSD MCP Servers should expect this primitive set to be extended over time (for example, capabilities for longer-running tasks or richer server-to-client interaction have been proposed and adopted in various forms across revisions) and should design tool and resource naming so it can accommodate new primitive types without rework.
