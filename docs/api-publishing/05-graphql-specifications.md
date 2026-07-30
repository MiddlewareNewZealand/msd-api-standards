# 05 GraphQL Specification

## GraphQL Documentation

GraphQL APIs (see Part C, *Types of API*) are self-describing through their schema, but that schema must still be deliberately published and documented.
While GraphQL tooling can expose schema metadata automatically, consumers require clear descriptions, usage guidance and operational constraints to understand how the API should be used effectively.
Well-documented schemas improve discoverability, reduce implementation errors and provide a consistent developer experience.

<Standard id="MSDAS_MUST_PUBLISH_GRAPHQL_SCHEMA" type="MUST">
API Providers MUST publish the GraphQL schema for every GraphQL API. The schema must be defined using the GraphQL Schema Definition Language (SDL) and made available through the MSD Developer Portal.
</Standard>

<Standard id="MSDAS_MUST_DESCRIBE_GRAPHQL_SCHEMA_ELEMENTS" type="MUST">
Every type, field, argument, enum value and input object within the schema must include a descriptive comment using GraphQL's native description syntax ("""..."""). Descriptions must state the business purpose, expected behaviour and any constraints.
</Standard>

<Standard id="MSDAS_MUST_DOCUMENT_GRAPHQL_QUERY_LIMITS" type="MUST">
Query execution constraints, including any complexity scoring, query depth limits, execution cost limits, node limits or other restrictions enforced by the API, MUST be documented alongside the schema.
</Standard>

Consumers should be able to understand the operational characteristics of the API and design queries that comply with published limits.

<Standard id="MSDAS_SHOULD_PROVIDE_INTERACTIVE_GRAPHQL_DOCS" type="SHOULD">
Where practical, GraphQL schemas SHOULD be published in an interactive, browsable format (such as GraphiQL, Apollo Sandbox or an equivalent schema explorer) in addition to the raw SDL document.
</Standard>

Interactive documentation should support schema exploration, documentation lookup and query validation without requiring consumers to inspect the SDL directly.

<Standard id="MSDAS_SHOULD_RESTRICT_GRAPHQL_INTROSPECTION" type="SHOULD">
Production GraphQL APIs exposed outside MSD SHOULD restrict schema introspection to authenticated and authorised consumers unless there is a specific business requirement for public introspection.
</Standard>

Where introspection is restricted or disabled, the published schema documentation becomes the authoritative reference and must be kept synchronised with the deployed schema.

<Standard id="MSDAS_MUST_VALIDATE_GRAPHQL_SCHEMA" type="MUST">
GraphQL schema documents MUST be validated for GraphQL SDL compliance before publication.
</Standard>

Validation should be performed automatically as part of the API delivery pipeline wherever practical, consistent with the validation of OpenAPI and AsyncAPI specifications.

<Standard id="MSDAS_MUST_MARK_DEPRECATED_GRAPHQL_ELEMENTS" type="MUST">
Fields, types and other schema elements that are superseded MUST be marked using GraphQL's standard @deprecated directive and include a deprecation reason.
</Standard>

Deprecated elements should remain available for an appropriate transition period in accordance with the API versioning policy.

<Standard id="MSDAS_MUST_NOT_MAKE_BREAKING_GRAPHQL_CHANGES" type="MUST NOT">
Breaking changes to a published GraphQL schema MUST NOT be introduced without following the API versioning and change management requirements defined in these standards.
</Standard>

<Standard id="MSDAS_SHOULD_MODEL_MUTATIONS_AS_BUSINESS_ACTIONS" type="SHOULD">
GraphQL mutations SHOULD represent meaningful business actions rather than generic create, update or delete operations wherever practical.
</Standard>

Mutation names should clearly communicate the business outcome being performed and align with the business capability exposed by the API.
