---
title: "Versioning"
---

<Standard id="MSDAS_MUST_DECLARE_MCP_SPECIFICATION_VERSION" type="MUST">
MCP Servers MUST declare which version of the MCP specification they implement.
</Standard>

<Standard id="MSDAS_MUST_DECLARE_TOOL_CONTRACT_VERSION" type="MUST">
MCP Servers MUST declare which version of their own Tool/Resource contract they implement.
</Standard>

<Standard id="MSDAS_MUST_NOT_BREAK_TOOL_INPUT_SCHEMA_WITHOUT_SIGNALLING" type="MUST NOT">
A Tool's input schema MUST NOT change in a breaking way unless the Tool's name changes with it, or the change is otherwise signalled to Clients.
</Standard>

<Standard id="MSDAS_MAY_ADD_OPTIONAL_TOOL_PARAMETERS_WITHOUT_SIGNALLING" type="MAY">
Non-breaking additions to a Tool's input schema (new optional parameters) MAY be made without changing the Tool's name or signalling the change to Clients.
</Standard>
