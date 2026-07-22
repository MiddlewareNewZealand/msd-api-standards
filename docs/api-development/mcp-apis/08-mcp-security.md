---
title: "MCP security"
---

MCP introduces security considerations beyond those covered in Part B, because the consumer is an AI agent making autonomous decisions about which capabilities to invoke, often based on natural-language content it doesn't fully control. The specific authorisation flow MCP mandates has changed between specification revisions and should be expected to change again; the principles below should hold regardless of which flow is current.

<Standard id="MSDAS_MUST_AUTHENTICATION_AUTHORISATION_REMOTE_MCP_SERVERS" type="MUST">
Authentication and authorisation for remote MCP Servers MUST follow whichever authorisation flow the current MCP specification mandates, implemented consistently with the equivalent controls set out in Part B: API Security. MCP-specific access tokens MUST NOT be accepted by other MSD APIs, and vice versa (token audience MUST be validated), to prevent a compromised MCP Server or Client from being used to obtain access to unrelated MSD systems.
</Standard>

<Standard id="MSDAS_MUST_TOOLS_SCOPED_MINIMUM_DATA_ACTIONS" type="MUST">
Tools MUST be scoped to the minimum data and actions required, following the same least-privilege principle as REST API scopes (see Part B). A tool that reads client entitlements MUST NOT also carry the ability to update them.
</Standard>

<Standard id="MSDAS_SHOULD_TOOLS_WRITE_DATA_TRIGGER_REAL_2" type="SHOULD">
Tools that write data or trigger real-world actions on a client's record SHOULD require explicit human confirmation within the Host application before execution, particularly where the action is difficult to reverse (e.g. issuing a payment, closing a case).
</Standard>

<Standard type="NOTE">
Tool descriptions and resource content are a channel an attacker can use to influence agent behaviour — sometimes called indirect prompt injection. For example, a case note resource containing hidden instructions could attempt to manipulate an agent reading it into taking an unintended action. MCP Servers SHOULD treat all resource content and tool output as untrusted input from the agent's perspective, and MUST NOT rely on the agent alone to enforce access control decisions that the Server itself is capable of enforcing.
</Standard>

<Standard id="MSDAS_MUST_NOT_MCP_SILENTLY_CHANGE_APPROVED_TOOL" type="MUST NOT">
MCP Servers MUST NOT silently change a previously approved Tool's behaviour or description after a Client has connected, without notifying the Client of the change and, where the change is material, requiring the Host to re-confirm consent (guarding against so-called “rug-pull” attacks where a trusted tool's behaviour is altered post-approval).
</Standard>

<Standard id="MSDAS_MUST_ALL_TOOL_INVOCATIONS_ACCESS_MODIFY_2" type="MUST">
All Tool invocations that access or modify client or whānau data MUST be logged with sufficient detail to identify the requesting agent, the authenticated user on whose behalf it acted, and the data accessed — consistent with MSD's audit logging obligations for client data generally.
</Standard>
