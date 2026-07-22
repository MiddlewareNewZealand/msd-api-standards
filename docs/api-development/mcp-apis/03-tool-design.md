---
title: "Tool design"
---

<Standard id="MSDAS_MUST_EVERY_TOOL_DECLARE_MACHINE_READABLE" type="MUST">
Every Tool MUST declare a machine-readable schema for its input parameters, and SHOULD declare one for its output. Tool names MUST be unique within a Server and SHOULD use clear verb-noun naming, e.g. get-client-summary, create-case-note.
</Standard>

<Standard id="MSDAS_MUST_EVERY_TOOL_PROVIDE_CLEAR_COMPLETE" type="MUST">
Every Tool MUST provide a clear, complete natural-language description of what it does, including any side effects. This description is read by the agent (and, indirectly, by the person the agent is acting for) to decide when and how to use the tool — an ambiguous or incomplete description leads directly to incorrect or unintended use.
</Standard>

```json
{
  "name": "get-client-entitlements",
  "description": "Retrieve the current entitlement records for a specified client. Requires an active case assignment to the client. Returns entitlement type, status and effective dates. Does not return payment history.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "clientId": { "type": "string", "description": "The unique MSD client identifier" }
    },
    "required": ["clientId"]
  }
}
```

<Standard id="MSDAS_SHOULD_TOOLS_CREATE_UPDATE_DELETE_DATA" type="SHOULD">
Tools that create, update or delete data, or that trigger a real-world action (e.g. issuing a payment, sending a client communication), SHOULD be clearly distinguished — by name and description — from read-only tools, so Hosts can apply appropriate confirmation steps (see Security, below).
</Standard>
