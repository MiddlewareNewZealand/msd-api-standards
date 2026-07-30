---
title: "Tool design"
---

<Standard id="MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA" type="MUST">
Every Tool MUST declare a machine-readable schema for its input parameters.
</Standard>

<Standard id="MSDAS_SHOULD_DECLARE_TOOL_OUTPUT_SCHEMA" type="SHOULD">
Every Tool SHOULD declare a machine-readable schema for its output.
</Standard>

<Standard id="MSDAS_MUST_MAKE_TOOL_NAMES_UNIQUE_WITHIN_A_SERVER" type="MUST">
Tool names MUST be unique within a Server.
</Standard>

<Standard id="MSDAS_SHOULD_USE_VERB_NOUN_TOOL_NAMES" type="SHOULD">
Tool names SHOULD use verb-noun naming, e.g. get-client-summary, create-case-note.
</Standard>

<Standard id="MSDAS_MUST_DESCRIBE_EACH_TOOL_CLEARLY" type="MUST">
Every Tool MUST provide a complete natural-language description of what it does, including any side effects. This description is read by the agent (and, indirectly, by the person the agent is acting for) to decide when and how to use the tool — an ambiguous or incomplete description leads directly to incorrect or unintended use.
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

<Standard id="MSDAS_SHOULD_DISTINGUISH_WRITE_TOOLS" type="SHOULD">
Tools that create, update or delete data, or that trigger a real-world action (e.g. issuing a payment, sending a client communication), SHOULD be clearly distinguished — by name and description — from read-only tools, so Hosts can apply appropriate confirmation steps (see Security, below).
</Standard>
