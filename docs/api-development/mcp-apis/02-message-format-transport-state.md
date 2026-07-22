---
title: "Message format, transport and state"
---

<Standard id="MSDAS_MUST_MCP_SERVERS_IMPLEMENT_MESSAGE_FORMAT" type="MUST">
MCP Servers MUST implement the message format, transport, and connection/session model defined by the current version of the Model Context Protocol specification that MSD has adopted — rather than any specific historical mechanism described in earlier drafts of this standard.
</Standard>

Two things are worth calling out because they have changed, or are in the process of changing, between MCP specification revisions and are likely to keep evolving: whether a Server maintains state for a connected Client across a session, versus treating each request independently; and which transport(s) a remote (internet- or network-exposed) Server is expected to support versus a purely local one. MSD API Developers should treat both as implementation details to confirm against the current specification, not fixed architectural assumptions.

<Standard id="MSDAS_SHOULD_REMOTE_MCP_SERVERS_FAVOUR_WHICHEVER" type="SHOULD">
Remote MCP Servers SHOULD favour whichever transport and connection model the current MCP specification designates as its standard for internet-facing deployment, and SHOULD avoid depending on session-held state that the current specification doesn't guarantee will persist, so the Server remains easy to scale and to migrate as the specification's connection model evolves.
</Standard>
