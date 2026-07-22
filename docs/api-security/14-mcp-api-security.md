---
title: "MCP API Security"
---

The Model Context Protocol (MCP) — covered from a design perspective in Part C, MCP APIs — introduces security considerations beyond the REST- and event-oriented guidance above, because the consumer is an AI agent making autonomous, in-the-moment decisions about which capabilities to invoke, often influenced by natural-language content it doesn't fully control.

The baseline requirements set out earlier in this Part — authentication, transport encryption, token handling, information classification — apply in full to MCP Servers. This section sets out additional controls specific to the agentic consumption model.

## **Authentication and authorisation**

<Standard id="MSDAS_MUST_REMOTE_MCP_SERVERS_AUTHENTICATION_REQUIRED" type="MUST">
Remote MCP Servers when authentication is required, must use the OAuth 2.1 mechanisms set out earlier in this Part, including PKCE, rather than a bespoke or simplified authentication scheme.
</Standard>
<Standard id="MSDAS_MUST_ACCESS_TOKENS_MCP_AUDIENCE_RESTRICTED" type="MUST">
Access tokens issued for MCP use must be audience-restricted to the specific MCP Server, and must not be accepted by other MSD APIs, or vice versa. This prevents a compromised MCP Client or Server from being used as a stepping stone to unrelated MSD systems.
</Standard>

<Standard id="MSDAS_MUST_MCP_TOOLS_SCOPED_MINIMUM_DATA_ACTIONS" type="MUST">
Tools must be scoped to the minimum data and actions required, following the same least-privilege principle applied to REST API scopes. A tool that reads client entitlements must not also carry the ability to update them.
</Standard>

## **Consent and human oversight**

<Standard id="MSDAS_SHOULD_TOOLS_WRITE_DATA_TRIGGER_REAL" type="SHOULD">
Tools that write data, or trigger a real-world action on a client's record, should require explicit human confirmation within the host application before execution — particularly where the action is difficult to reverse, such as issuing a payment or closing a case.
</Standard>

Because MCP Servers expose their capability list dynamically rather than through a specification a developer reviews in advance, the practical safeguard against unintended tool use shifts from design-time review to runtime consent and confirmation.

## **Tool integrity (“rug-pull” protection)**

<Standard id="MSDAS_MUST_MCP_SERVER_SILENTLY_CHANGE_PREVIOUSLY" type="MUST">
An MCP Server must not silently change a previously approved tool's behaviour or description once a client has connected. Any material change must trigger a listChanged notification and require the host to obtain renewed consent before the changed tool can be used again.
</Standard>

<Standard type="INFO">
This guards against so-called “rug-pull” attacks, where a tool that was reviewed and approved in one form is later altered — for example, to broaden the data it accesses or the actions it performs — without the change being surfaced for re-approval.
</Standard>

## **Untrusted content and indirect prompt injection**

<Standard type="NOTE">
Tool descriptions and resource content are a channel an attacker can use to influence agent behaviour — sometimes called indirect prompt injection. For example, a case note resource containing hidden instructions could attempt to manipulate an agent reading it into taking an unintended action, such as exfiltrating other clients' data.
</Standard>

<Standard id="MSDAS_MUST_MCP_SERVERS_TREAT_CONTENT_UNTRUSTED" type="MUST">
MCP Servers must treat all resource content and tool output as untrusted from the agent's perspective, and must not rely on the agent to correctly enforce an access control decision that the server itself is capable of enforcing directly.
</Standard>

## **Audit logging**

<Standard id="MSDAS_MUST_ALL_TOOL_INVOCATIONS_ACCESS_MODIFY" type="MUST">
All tool invocations that access or modify client or whānau data must be logged with sufficient detail to identify the requesting agent, the authenticated MSD staff member on whose behalf it acted, and the specific data accessed or changed — consistent with MSD's audit logging obligations for client data generally.
</Standard>
