---
title: "Versioning"
---

<Standard id="MSDAS_MUST_MCP_SERVERS_DECLARE_VERSION_MCP" type="MUST">
MCP Servers MUST declare which version of the MCP specification, and which version of their own Tool/Resource contract, they implement. A Tool's input schema MUST NOT change in a breaking way without also changing the Tool's name or otherwise signalling the change to Clients. Non-breaking additions (new optional parameters) MAY be made without such a change.
</Standard>
