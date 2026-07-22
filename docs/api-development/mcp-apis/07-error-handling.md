---
title: "Error handling"
---

<Standard id="MSDAS_MUST_TOOL_INVOCATION_ERRORS_RETURNED_WAY" type="MUST">
Tool invocation errors MUST be returned in a way that lets the calling agent distinguish “the tool ran and reported a failure” from “the protocol exchange itself failed”, using whichever mechanism the current MCP specification provides for that distinction.
</Standard>

As with REST error handling (see Error Handling, above), error messages returned to the agent <Standard inline id="MSDAS_SHOULD_MCP_ERROR_MESSAGES_INFORMATIVE_NO_INTERNAL_DETAILS" type="SHOULD" toolTip="Error messages returned to the agent should be informative without exposing internal system details.">SHOULD</Standard> be informative without exposing internal system details, and <Standard inline id="MSDAS_MUST_NOT_MCP_ERROR_MESSAGES_CONFIRM_DENY_SENSITIVE" type="MUST NOT" toolTip="Error messages returned to the agent must not confirm or deny sensitive information such as whether a specific client ID exists, since the agent may relay tool output directly into a user-facing response.">MUST NOT</Standard> confirm or deny sensitive information such as whether a specific client ID exists, since the agent may relay tool output directly into a user-facing response.
