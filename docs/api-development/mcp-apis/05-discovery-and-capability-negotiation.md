---
title: "Discovery and capability negotiation"
---

Clients discover a Server's available Tools, Resources and Prompts dynamically at connection time, rather than relying on a static, separately published specification document (contrast with OpenAPI in Part D). The precise mechanism for this discovery, and for notifying a connected Client when a Server's capabilities change, is defined by the MCP specification and has changed between revisions.

<Standard id="MSDAS_SHOULD_MCP_SERVERS_NOTIFY_CONNECTED_CLIENTS" type="SHOULD">
MCP Servers SHOULD notify connected Clients when their available capabilities change at runtime (for example, tools that become available only once a case is in a particular status), using whatever notification mechanism the current specification provides, so Hosts don't need to poll for changes.
</Standard>
