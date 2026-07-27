# MSDAS rule ID rename proposal

Proposed grammatical rewrites of every `MSDAS_*` standard ID in `/docs`. Each ID keeps the `MSDAS_` prefix and its RFC 2119 modality, then states the rule as a verb-first imperative clause (verb → object → qualifier). Grouped by source document, in document order. **198 rules.**


## `api-development/asynchronous-apis/01-sync-vs-async.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| RECOMMENDED | `MSDAS_SHOULD_PUBLISH_SUBSCRIBE_RECOMMENDED_DEFAULT` | `MSDAS_SHOULD_DEFAULT_TO_PUBLISH_SUBSCRIBE` | For MSD's social sector data-sharing use cases, the Publish/Subscribe pattern is the recommended default — see Async Patterns. |

## `api-development/asynchronous-apis/03-message-types.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MAY | `MSDAS_MAY_THIN_EVENTS_INCLUDE_POINTER_URL` | `MSDAS_MAY_INCLUDE_RESOURCE_POINTER_IN_THIN_EVENT` | Thin events MAY include a pointer (URL or identifier) back to the resource that triggered the notification. If no pointer is supplied, the data… |
| SHOULD | `MSDAS_SHOULD_THIN_MESSAGE_TYPE_UNTRUSTED_CONSUMER` | `MSDAS_SHOULD_USE_THIN_EVENTS_FOR_UNTRUSTED_CONSUMERS` | The thin-event message type should be used where the API Consumer is not fully trusted, or where re-authentication of the client is required. |

## `api-development/asynchronous-apis/04-protocols-and-apis.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_API_PROVIDERS_AIM_SUPPORT_MANY` | `MSDAS_SHOULD_SUPPORT_MANY_TRANSPORT_PROTOCOLS` | API Providers SHOULD aim to support as many transport protocols as reasonably possible, so API Consumers can use whichever best suits their own… |
| RECOMMENDED | `MSDAS_SHOULD_PUBLISH_MESSAGES_USING_JSON` | `MSDAS_SHOULD_PUBLISH_MESSAGES_AS_JSON` | It's recommended to publish messages using JSON as the data serialisation format, given its low barrier to entry, human readability, and broad… |

## `api-development/asynchronous-apis/05-topics-and-subscriptions.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_TOPIC_DESIGN_APPLIED_CONSISTENTLY_ONCE` | `MSDAS_MUST_APPLY_TOPIC_DESIGN_CONSISTENTLY` | Topic design MUST be applied consistently once agreed, and root levels of a topic MUST NOT change meaning. Topic levels MUST be separated by /… |
| MUST | `MSDAS_MUST_MESSAGE_PRODUCER_PROVIDE_MECHANISM_API` | `MSDAS_MUST_PROVIDE_SUBSCRIPTION_MECHANISM` | A Message Producer MUST provide a mechanism for API Consumers to subscribe and unsubscribe from available channels, and MUST provide a way for a… |

## `api-development/asynchronous-apis/06-api-design-and-documentation.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_API_PROVIDERS_ASYNCHRONOUS_API_DOCUMENT` | `MSDAS_MUST_DOCUMENT_ASYNCHRONOUS_APIS` | API Providers of an Asynchronous API MUST document the API using a combination of AsyncAPI (to describe API flows, access and behaviour) and JSON… |
| RECOMMENDED | `MSDAS_SHOULD_APIS_USE_CLOUDEVENTS_SPECIFICATION` | `MSDAS_SHOULD_USE_CLOUDEVENTS_SPECIFICATION` | APIs published by MSD are recommended to use the CloudEvents specification to structure event messages, giving consumers a consistent envelope… |
| SHOULD | `MSDAS_SHOULD_API_PROVIDERS_VALIDATE_OUTGOING_MESSAGES` | `MSDAS_SHOULD_VALIDATE_OUTGOING_MESSAGES` | API Providers should validate outgoing messages against their published JSON Schema before publishing them. |
| MAY | `MSDAS_MAY_API_PROVIDERS_CHOOSE_OFFER_EVENT` | `MSDAS_MAY_OFFER_EVENT_CATALOGUE` | API Providers MAY choose to offer an event catalog or schema registry, published via the MSD Developer Portal, so consumers can discover available… |

## `api-development/asynchronous-apis/08-security.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_MESSAGES_USED_ASYNCHRONOUS_APIS_USE` | `MSDAS_MUST_ENCRYPT_ASYNCHRONOUS_MESSAGES` | Messages used in Asynchronous APIs MUST use appropriate transport-level encryption, regardless of protocol. API Consumers MUST be authenticated… |

## `api-development/asynchronous-apis/09-async-patterns/01-pub-sub.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_API_PROVIDERS_USE_PUB_SUB` | `MSDAS_SHOULD_USE_PUB_SUB_FOR_INTEGRATION_EVENTS` | API Providers SHOULD use the Pub/Sub pattern for integration event messages published within the social sector, as it's best suited to increasing… |

## `api-development/mcp-apis/02-message-format-transport-state.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_MCP_SERVERS_IMPLEMENT_MESSAGE_FORMAT` | `MSDAS_MUST_IMPLEMENT_MCP_TRANSPORT_AND_STATE` | MCP Servers MUST implement the message format, transport, and connection/session model defined by the current version of the Model Context… |
| SHOULD | `MSDAS_SHOULD_REMOTE_MCP_SERVERS_FAVOUR_WHICHEVER` | `MSDAS_SHOULD_FOLLOW_CURRENT_MCP_TRANSPORT_MODEL` | Remote MCP Servers SHOULD favour whichever transport and connection model the current MCP specification designates as its standard for… |

## `api-development/mcp-apis/03-tool-design.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_EVERY_TOOL_DECLARE_MACHINE_READABLE` | `MSDAS_MUST_DECLARE_TOOL_INPUT_SCHEMA` | Every Tool MUST declare a machine-readable schema for its input parameters, and SHOULD declare one for its output. Tool names MUST be unique… |
| MUST | `MSDAS_MUST_EVERY_TOOL_PROVIDE_CLEAR_COMPLETE` | `MSDAS_MUST_DESCRIBE_EACH_TOOL_CLEARLY` | Every Tool MUST provide a clear, complete natural-language description of what it does, including any side effects. This description is read by… |
| SHOULD | `MSDAS_SHOULD_TOOLS_CREATE_UPDATE_DELETE_DATA` | `MSDAS_SHOULD_DISTINGUISH_WRITE_TOOLS` | Tools that create, update or delete data, or that trigger a real-world action (e.g. issuing a payment, sending a client communication), SHOULD be… |

## `api-development/mcp-apis/04-resource-design.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_RESOURCES_ADDRESSABLE_STABLE_IDENTIFIER_DECLARE` | `MSDAS_MUST_GIVE_RESOURCES_STABLE_IDENTIFIERS` | Resources MUST be addressable by a stable identifier and MUST declare an appropriate content type. |
| SHOULD | `MSDAS_SHOULD_MCP_RESOURCE_IDENTIFIER_ALIGN_REST` | `MSDAS_SHOULD_ALIGN_MCP_RESOURCE_IDS_WITH_REST` | Where a Resource represents the same underlying data as an existing REST resource, the MCP Resource identifier should reference or align with the… |

## `api-development/mcp-apis/05-discovery-and-capability-negotiation.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_MCP_SERVERS_NOTIFY_CONNECTED_CLIENTS` | `MSDAS_SHOULD_NOTIFY_CLIENTS_OF_CAPABILITY_CHANGES` | MCP Servers SHOULD notify connected Clients when their available capabilities change at runtime (for example, tools that become available only… |

## `api-development/mcp-apis/06-versioning.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_MCP_SERVERS_DECLARE_VERSION_MCP` | `MSDAS_MUST_DECLARE_MCP_SPECIFICATION_VERSION` | MCP Servers MUST declare which version of the MCP specification, and which version of their own Tool/Resource contract, they implement. A Tool's… |

## `api-development/mcp-apis/07-error-handling.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_TOOL_INVOCATION_ERRORS_RETURNED_WAY` | `MSDAS_MUST_RETURN_DISTINGUISHABLE_TOOL_ERRORS` | Tool invocation errors MUST be returned in a way that lets the calling agent distinguish “the tool ran and reported a failure” from “the protocol… |
| SHOULD | `MSDAS_SHOULD_MCP_ERROR_MESSAGES_INFORMATIVE_NO_INTERNAL_DETAILS` | `MSDAS_SHOULD_OMIT_INTERNAL_DETAILS_FROM_MCP_ERRORS` | Error messages returned to the agent should be informative without exposing internal system details. |
| MUST NOT | `MSDAS_MUST_NOT_MCP_ERROR_MESSAGES_CONFIRM_DENY_SENSITIVE` | `MSDAS_MUST_NOT_REVEAL_SENSITIVE_INFO_IN_MCP_ERRORS` | Error messages returned to the agent must not confirm or deny sensitive information such as whether a specific client ID exists, since the agent… |

## `api-development/mcp-apis/08-mcp-security.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_AUTHENTICATION_AUTHORISATION_REMOTE_MCP_SERVERS` | `MSDAS_MUST_FOLLOW_CURRENT_MCP_AUTHORISATION_FLOW` | Authentication and authorisation for remote MCP Servers MUST follow whichever authorisation flow the current MCP specification mandates,… |

_The tool-scoping, write-confirmation, rug-pull and audit-logging rules that were previously stated here have been deduplicated — they are now defined once in Part B (`api-security/14-mcp-api-security.md`) and referenced from this page by link. See the deduplication note below._

## `api-development/mcp-apis/index.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_MCP_USED_PRIMARY_CONSUMER_AI_AGENT` | `MSDAS_SHOULD_USE_MCP_FOR_AI_AGENT_CONSUMERS` | MCP SHOULD be used when the integration's primary consumer is an AI agent or assistant that needs to select and invoke capabilities dynamically.… |

## `api-development/synchronous-apis/01-api-design.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD NOT | `MSDAS_SHOULD_NOT_APIS_EXPOSE_OBSOLETE_LEGACY_STRUCTURES` | `MSDAS_SHOULD_NOT_EXPOSE_LEGACY_STRUCTURES` | APIs SHOULD NOT expose obsolete or legacy structures or functions. |
| MUST | `MSDAS_MUST_BUILDING_APIS_DESIGN_DRIVEN_APPROACH` | `MSDAS_MUST_TAKE_DESIGN_DRIVEN_APPROACH` | When building APIs, a design-driven approach MUST be taken, comprising: interface specification first; an iterative design approach; and… |
| SHOULD NOT | `MSDAS_SHOULD_NOT_API_CODE_PROGRESS_UNTIL_PASSES_TESTS` | `MSDAS_SHOULD_NOT_PROMOTE_CODE_BEFORE_TESTS_PASS` | API code should not progress through delivery environments until it passes automated tests. |
| SHOULD | `MSDAS_SHOULD_APIS_DESIGNED_LOWEST_PRACTICAL_GRANULARITY` | `MSDAS_SHOULD_DESIGN_AT_LOWEST_GRANULARITY` | APIs should be designed at the lowest practical level of granularity. |
| SHOULD | `MSDAS_SHOULD_SPECIFICATION_DESIGNED_ADVANCE_DEVELOPING_API` | `MSDAS_SHOULD_DESIGN_SPECIFICATION_FIRST` | The interface specification should be designed in advance of developing the API. |
| MUST | `MSDAS_MUST_OPENAPI_SWAGGER_USED_INTERFACE_SPECIFICATION` | `MSDAS_MUST_USE_OPENAPI_AS_SPECIFICATION_LANGUAGE` | OpenAPI/Swagger MUST be used as the interface specification language for all synchronous APIs being developed. |
| RECOMMENDED | `MSDAS_SHOULD_API_PROVIDERS_OFFER_SDK` | `MSDAS_SHOULD_OFFER_CONSUMER_SDK` | It's recommended that API Providers offer an SDK to developers of consuming applications. |
| SHOULD | `MSDAS_SHOULD_ONCE_API_FIT_STATE_OFFERED` | `MSDAS_SHOULD_PUBLISH_API_DEFINITION_WHEN_READY` | Once an API is in a fit state to be offered to consumers, the API definition SHOULD be published to the MSD Developer Portal or equivalent social… |

## `api-development/synchronous-apis/02-api-artefacts.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_ALL_API_ARTEFACTS_MAINTAINED_SYSTEM` | `MSDAS_MUST_MAINTAIN_ARTEFACTS_WITH_CHANGE_TRACKING` | All API artefacts MUST be maintained in a system that supports change tracking. |

## `api-development/synchronous-apis/05-http-verbs.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_ACCESS_REST_APIS_VIA_STANDARD` | `MSDAS_MUST_USE_STANDARD_HTTP_VERBS` | Access to REST APIs MUST be via the standard HTTP verbs: GET, PUT, POST, DELETE, in line with the W3C Standard. |
| MUST NOT | `MSDAS_MUST_NOT_DO_EXPOSE_UNSAFE_OPERATIONS_VIA` | `MSDAS_MUST_NOT_EXPOSE_UNSAFE_OPERATIONS_VIA_GET` | Do not expose unsafe operations via GET — it should never modify any resources on the server. |
| MUST | `MSDAS_MUST_API_PROVIDERS_API_CONSUMERS_DESIGN` | `MSDAS_MUST_DESIGN_PUT_TOLERANT_APIS` | API Providers and API Consumers MUST design APIs that are PUT tolerant, and be aware of the race condition this can expose when two consumers… |
| MUST NOT | `MSDAS_MUST_NOT_RESPONSE_HEAD_REQUEST_CONTAIN_BODY` | `MSDAS_MUST_NOT_RETURN_BODY_FOR_HEAD_REQUEST` | The response to a HEAD request MUST NOT contain a body. If a response body is returned it MUST be ignored. |

## `api-development/synchronous-apis/06-uris.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_ENDPOINT_URLS_ADVERTISE_RESOURCES_AVOID` | `MSDAS_SHOULD_USE_NOUNS_NOT_VERBS_IN_URLS` | Endpoint URLs SHOULD advertise resources, and avoid verbs. |
| RECOMMENDED | `MSDAS_SHOULD_URL_MAKES_CLEAR_ITS_API` | `MSDAS_SHOULD_MAKE_URL_IDENTIFIABLY_AN_API` | It's recommended that the URL makes it clear that it's an API, e.g. https://api.msd.govt.nz or https://msd.govt.nz/api. |
| SHOULD | `MSDAS_SHOULD_NAMESPACE_FIRST_NOUN_URI_REFLECT` | `MSDAS_SHOULD_USE_NAMESPACE_AS_FIRST_URI_NOUN` | The namespace SHOULD be the first noun in the URI and SHOULD reflect the function being offered by the API, e.g. /v1/employment-services/. |
| SHOULD | `MSDAS_SHOULD_RESOURCE_NAMES_NOUN_BASED_LOWER` | `MSDAS_SHOULD_USE_PLURAL_NOUN_RESOURCE_NAMES` | Resource names SHOULD be noun-based, lower case and plural for collections, e.g. /clients. Naming SHOULD be short, simple and human-guessable,… |
| MUST | `MSDAS_MUST_SUB_RESOURCES_APPEAR_UNDER_RESOURCE` | `MSDAS_MUST_NEST_SUB_RESOURCES_UNDER_PARENT` | Sub-resources MUST appear under the resource they relate to (/resource/id/sub-resource/id), and SHOULD go no more than three levels deep. |
| MUST | `MSDAS_MUST_API_IMPLEMENTATION_VERIFY_SUBRESOURCE_OWNERSHIP` | `MSDAS_MUST_VERIFY_SUB_RESOURCE_OWNERSHIP` | The API implementation MUST verify both that the requested sub-resource genuinely belongs to the specified parent resource, and that the… |
| MUST | `MSDAS_MUST_SUB_RESOURCE_UNAUTHORISED_TREATED_AS_404` | `MSDAS_MUST_RETURN_404_FOR_UNAUTHORISED_SUB_RESOURCE` | A sub-resource request for a resource the caller is not authorised to access must be treated as if the resource does not exist (404), not as a… |
| SHOULD | `MSDAS_SHOULD_PATH_QUERY_STRING_PARAMETERS_LOWER` | `MSDAS_SHOULD_USE_LOWER_CASE_HYPHENATED_PARAMETERS` | Path and query string parameters SHOULD be lower case with hyphen separators for multiword names, e.g. /v1/case-notes?sort-order=asc. |
| SHOULD | `MSDAS_SHOULD_PARAMETER_RESULT_SET_QUERY_ARGUMENT` | `MSDAS_SHOULD_USE_QUERY_ARGUMENTS_FOR_RESULT_SETS` | If a parameter changes the behaviour of the result set, it should be a query argument. |
| SHOULD | `MSDAS_SHOULD_PARAMETER_API_BEHAVIOUR_IN_PATH` | `MSDAS_SHOULD_PUT_BEHAVIOUR_PARAMETERS_IN_PATH` | If a parameter changes the behaviour of the API, it should be in the path. |
| SHOULD | `MSDAS_SHOULD_RESPONSE_POINT_CONSUMERS_PAGINATION_LINKS` | `MSDAS_SHOULD_PAGINATE_WITH_HYPERMEDIA_LINKS` | For pagination, the response should point consumers to previous/next result pages using hypermedia links. |

## `api-development/synchronous-apis/07-http-headers.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD NOT | `MSDAS_SHOULD_NOT_X_NOTATION_HEADERS_DEPRECATED_PER` | `MSDAS_SHOULD_NOT_USE_X_PREFIX_HEADERS` | X- notation headers are deprecated per RFC 6648 and SHOULD NOT be used. Define a plain custom header name instead (e.g. Request-Id rather than… |
| SHOULD | `MSDAS_SHOULD_APIS_PROPAGATE_DISTRIBUTED_TRACING_CONTEXT` | `MSDAS_SHOULD_PROPAGATE_TRACE_CONTEXT` | APIs SHOULD propagate distributed tracing context using the W3C Trace Context standard |
| MUST | `MSDAS_MUST_TRACEPARENT_HEADER_PROPAGATED_UNCHANGED` | `MSDAS_MUST_PROPAGATE_TRACEPARENT_UNCHANGED` | Where an incoming request carries a traceparent header, it must be propagated unchanged to any downstream calls made in the course of handling… |
| SHOULD | `MSDAS_SHOULD_APIS_GENERATE_TRACEPARENT_HEADER_WHEN_ABSENT` | `MSDAS_SHOULD_GENERATE_TRACEPARENT_WHEN_ABSENT` | Where an incoming request has no `traceparent` header, the API SHOULD generate one and propagate it downstream |
| MUST | `MSDAS_MUST_AUTHORIZATION_TOKEN_IDENTIFY_API_CONSUMER` | `MSDAS_MUST_IDENTIFY_CONSUMER_IN_TOKEN` | If an API Key header is not used, the Authorization token must identify the API Consumer via an attribute within the token. |
| MUST | `MSDAS_MUST_ENSURE_APIS_PERFORM_AT_SCALE` | `MSDAS_MUST_USE_CACHE_CONTROL_HEADER` | To ensure APIs perform at scale, the Cache-Control header MUST be used. |

## `api-development/synchronous-apis/08-content.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_REST_APIS_DEFAULT_RETURN_CONTENT` | `MSDAS_SHOULD_RETURN_JSON_BY_DEFAULT` | REST APIs SHOULD, by default, return content in JSON format, and SHOULD be human- and machine-readable. |
| MUST | `MSDAS_MUST_RESPONSE_FORMAT_GET_REQUEST_INDICATED` | `MSDAS_MUST_INDICATE_RESPONSE_FORMAT_VIA_ACCEPT` | The response format for a GET request MUST be indicated by the consumer using the Accept header; the request format for POST/PUT MUST be indicated… |
| MUST | `MSDAS_MUST_JSON_CONFORM_RFC_7159` | `MSDAS_MUST_CONFORM_JSON_TO_RFC_7159` | Where JSON is used, it must conform to RFC 7159. |
| SHOULD | `MSDAS_SHOULD_TEXTUAL_CONTENT_UTF8_ENCODED` | `MSDAS_SHOULD_ENCODE_TEXT_AS_UTF_8` | Textual content should be UTF-8 encoded. |
| SHOULD NOT | `MSDAS_SHOULD_NOT_BINARY_DATA_RETURNED_DIRECTLY` | `MSDAS_SHOULD_NOT_RETURN_BINARY_DATA_DIRECTLY` | Binary data such as images should not be returned directly in API responses — prefer a hyperlink to the image instead. |
| SHOULD | `MSDAS_SHOULD_RESPONSES_JSON_OBJECT_BARE_ARRAY` | `MSDAS_SHOULD_RETURN_OBJECT_NOT_BARE_ARRAY` | Responses SHOULD be a JSON object (not a bare array) by default, so metadata and additional top-level properties can be added later without… |
| SHOULD | `MSDAS_SHOULD_PROPERTY_NAMES_MEANINGFUL_DEFINED_SEMANTICS` | `MSDAS_SHOULD_USE_MEANINGFUL_PROPERTY_NAMES` | Property names should be meaningful, with defined semantics. |
| MUST | `MSDAS_MUST_PROPERTY_NAMES_CAMEL_CASE_ASCII` | `MSDAS_MUST_USE_CAMEL_CASE_PROPERTY_NAMES` | Property names must be camel-case ASCII strings, e.g. exampleProperty. |
| MUST | `MSDAS_MUST_PROPERTY_FIRST_CHARACTER_LETTER_UNDERSCORE` | `MSDAS_MUST_START_PROPERTY_NAME_WITH_LETTER` | The first character of a property name must be a letter or underscore. |
| SHOULD | `MSDAS_SHOULD_RESERVED_JAVASCRIPT_KEYWORDS_AVOIDED` | `MSDAS_SHOULD_AVOID_RESERVED_JAVASCRIPT_KEYWORDS` | Reserved JavaScript keywords should be avoided in property names. |
| SHOULD NOT | `MSDAS_SHOULD_NOT_COLLECTION_RESOURCES_CONTAIN_BINARY_ATTACHMENTS` | `MSDAS_SHOULD_NOT_EMBED_BINARY_IN_COLLECTIONS` | Collection resources SHOULD NOT contain binary attachments or other content that would lead to large response payloads. |

## `api-development/synchronous-apis/09-api-state.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_ALMOST_ALL_CASES_REST_API` | `MSDAS_SHOULD_KEEP_REST_APIS_STATELESS` | In almost all cases, a REST API SHOULD be entirely stateless. |
| SHOULD NOT | `MSDAS_SHOULD_NOT_API_MAINTAIN_CONTEXT_FUTURE_REQUESTS` | `MSDAS_SHOULD_NOT_RETAIN_CONTEXT_BETWEEN_REQUESTS` | An API may gather context and pass it to a downstream system, but should not maintain that context for future requests. |
| MUST | `MSDAS_MUST_RESTFUL_APIS_EMBODY_PROCESS_WORKFLOW` | `MSDAS_MUST_EXPOSE_PROCESS_WORKFLOW_STATE` | RESTful APIs that embody a process workflow MUST provide a mechanism for the API Consumer to retrieve the current state of their process. |

## `api-development/synchronous-apis/10-bulk-apis.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD NOT | `MSDAS_SHOULD_NOT_APIS_DESIGNED_LARGE_PAYLOADS_I` | `MSDAS_SHOULD_NOT_DESIGN_FOR_LARGE_PAYLOADS` | APIs SHOULD NOT be designed for large payloads — i.e. bulk handling for retrieving or uploading batches of data. APIs are geared towards… |
| MAY | `MSDAS_MAY_BULK_HANDLING_ACHIEVED_BUNDLING_MULTIPLE` | `MSDAS_MAY_BUNDLE_SUB_REQUESTS_FOR_BULK` | Bulk handling MAY be achieved by bundling multiple sub-requests into the same API invocation. This can help achieve logical grouping of similar… |
| REQUIRED | `MSDAS_MUST_SUB_REQUEST_IDENTIFIERS_BULK_CALLS` | `MSDAS_MUST_INCLUDE_SUB_REQUEST_IDS_IN_BULK_CALLS` | Sub-request identifiers (see HTTP Headers, Request headers) are REQUIRED in bulk API calls, to ensure sub-requests are traceable end-to-end. |
| SHOULD NOT | `MSDAS_SHOULD_NOT_BULK_ASYNC_INTERACTION_ATTEMPTED_SYNCHRONOUSLY` | `MSDAS_SHOULD_NOT_PROCESS_BULK_ASYNC_SYNCHRONOUSLY` | Where multiple records are POSTed together asynchronously, this type of interaction should not be attempted synchronously, since large batches… |
| SHOULD | `MSDAS_SHOULD_SUB_REQUEST_IDENTIFIER_TEMPORARY_CLIENT` | `MSDAS_SHOULD_USE_TEMPORARY_BULK_IDS` | The sub-request identifier (a temporary, client-assigned bulkId) SHOULD be used for cross-references between sub-requests within a transaction.… |
| SHOULD | `MSDAS_SHOULD_API_SUPPORT_JSON_SEQ_CONTENT_TYPE` | `MSDAS_SHOULD_SUPPORT_JSON_SEQ_FOR_LARGE_PAYLOADS` | Where intended bulk payloads are too large for timely synchronous processing, the API should support the application/json-seq Content-Type,… |

## `api-development/synchronous-apis/11-versioning-apis.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_MSD_APIS_FOLLOW_SEMANTIC_VERSIONING` | `MSDAS_SHOULD_FOLLOW_SEMANTIC_VERSIONING` | MSD APIs should follow semantic versioning, e.g. 3.2.5, where the MAJOR number changes on breaking changes, the MINOR number on… |
| MUST | `MSDAS_MUST_URL_BASED_VERSIONING_URI_INCLUDE` | `MSDAS_MUST_INCLUDE_MAJOR_VERSION_IN_URI` | For URL-based versioning, the URI MUST include `/v{N}` with the major version (N) and v as a prefix. APIs SHOULD NOT include minor version numbers… |
| MUST | `MSDAS_MUST_RESPONSE_INDICATE_MAJOR_VERSION` | `MSDAS_MUST_INDICATE_MAJOR_VERSION_IN_RESPONSE` | The response must still indicate at least the MAJOR version of the API that processed the request, via the Content-Type header. |
| SHOULD | `MSDAS_SHOULD_API_VERSIONED_CHANGE_BREAKING` | `MSDAS_SHOULD_VERSION_ON_BREAKING_CHANGE` | An API SHOULD be versioned when a change is breaking. |
| MUST | `MSDAS_MUST_API_PROVIDERS_IMPLEMENT_CONCURRENCY_CONTROL` | `MSDAS_MUST_IMPLEMENT_CONCURRENCY_CONTROL` | API Providers must implement a concurrency control mechanism to handle situations where two consumers attempt to update the same resource at the… |

## `api-development/synchronous-apis/12-search-apis.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST NOT | `MSDAS_MUST_NOT_SEARCH_QUERY_PARAMETERS_CONTAIN_PERSONAL` | `MSDAS_MUST_NOT_PUT_SENSITIVE_DATA_IN_QUERY_PARAMS` | Search query parameters MUST NOT contain personal identifiable or sensitive information, e.g. GET /clients?lastName=Ngata&mobileNumber=0221112222. |
| MUST | `MSDAS_MUST_POST_MECHANISM_USED_SENSITIVE_SEARCH` | `MSDAS_MUST_USE_POST_FOR_SENSITIVE_SEARCH` | Where the POST mechanism is used for a sensitive search, the API MUST have a distinct search resource (e.g. /clients/_search) so the API can… |
| MUST | `MSDAS_MUST_DATA_ACCESS_CODE_USE_PARAMETERISED_QUERIES` | `MSDAS_MUST_USE_PARAMETERISED_QUERIES` | Data access code MUST use parameterised queries or an equivalent safe data-access mechanism |
| MUST NOT | `MSDAS_MUST_NOT_CONCATENATING_USER_INPUT_QUERY_STRING` | `MSDAS_MUST_NOT_CONCATENATE_USER_INPUT_INTO_QUERIES` | Concatenating user input directly into a query string, in any form, must not be used; use parameterised queries or an equivalent safe data-access… |
| MUST | `MSDAS_MUST_OUTPUT_RENDERED_USE_NATIVE_ENCODING` | `MSDAS_MUST_ENCODE_RENDERED_OUTPUT` | Output rendered into any HTML, script, or markup context MUST be encoded using the rendering framework's built-in output-encoding mechanism |
| MUST | `MSDAS_MUST_OUTPUT_ENCODING_APPROPRIATE_TO_CONTEXT` | `MSDAS_MUST_MATCH_OUTPUT_ENCODING_TO_CONTEXT` | The specific output encoding used must be appropriate to the context (HTML body, attribute, URL, JavaScript) it is rendered into. |
| SHOULD | `MSDAS_SHOULD_PAGINATION_BEHAVIOUR_CONSISTENT` | `MSDAS_SHOULD_KEEP_PAGINATION_CONSISTENT` | Pagination behaviour should be consistent with the interaction described in URIs and Query Arguments, and can be implemented as page number/size,… |

## `api-development/synchronous-apis/13-caching.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_API_PROVIDERS_MONITOR_RESPONSE_CACHE` | `MSDAS_SHOULD_MONITOR_RESPONSE_CACHE` | API Providers SHOULD monitor their response cache to keep stale objects to a minimum, ensuring the cache is refreshed once information is updated… |

## `api-development/synchronous-apis/14-error-handling.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_ERROR_OCCURS_RESPONSE_BODY_CONTAIN` | `MSDAS_MUST_INCLUDE_DETAILS_IN_ERROR_BODY` | When an error occurs, the response body MUST contain: the HTTP status code; an API-specific error code that support staff can look up; and a… |
| MUST | `MSDAS_MUST_API_PROVIDERS_DOCUMENT_ERRORS_MACHINE` | `MSDAS_MUST_DOCUMENT_ERRORS_IN_SCHEMA` | API Providers MUST document their errors in a machine-readable schema, published as part of the OpenAPI specification. |
| SHOULD | `MSDAS_SHOULD_ERROR_MESSAGES_INFORMATIVE_WITHOUT_INTERNAL_DETAILS` | `MSDAS_SHOULD_OMIT_INTERNAL_DETAILS_FROM_ERRORS` | Human-readable error messages should be informative without exposing internal system details (component names, stack traces) that could help a… |
| MUST NOT | `MSDAS_MUST_NOT_ERROR_MESSAGES_CONFIRM_DENY_SENSITIVE` | `MSDAS_MUST_NOT_REVEAL_SENSITIVE_INFO_IN_ERRORS` | Human-readable error messages must not confirm or deny sensitive information such as whether a specific client ID exists. |

## `api-publishing/02-publishing-components.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_API_PROVIDERS_FOLLOW_SPECIFICATION_DRIVEN` | `MSDAS_MUST_FOLLOW_SPECIFICATION_DRIVEN_DEVELOPMENT` | API Providers MUST follow a specification-driven development approach (see Part C, API Design). |
| MUST | `MSDAS_MUST_API_PROVIDERS_CAPTURE_BUSINESS_CONTEXT` | `MSDAS_MUST_CAPTURE_BUSINESS_CONTEXT` | API Providers MUST capture the business context of a published API — how it fits into MSD's broader business processes and use cases — to help… |
| SHOULD | `MSDAS_SHOULD_BUSINESS_CONTEXT_AVAILABLE_VIA_WEB` | `MSDAS_SHOULD_PUBLISH_BUSINESS_CONTEXT_ON_WEB` | Business context SHOULD be available via a web experience, e.g. the MSD Developer Portal. |
| MUST | `MSDAS_MUST_API_PROVIDERS_PROVIDE_DIAGRAMS_DESCRIBING` | `MSDAS_MUST_PROVIDE_CONSUMER_JOURNEY_DIAGRAMS` | API Providers MUST provide diagrams describing an API Consumer's journey when interacting with the published API. |
| SHOULD | `MSDAS_SHOULD_DIAGRAMS_AVAILABLE_WEB_EXPERIENCE` | `MSDAS_SHOULD_PUBLISH_DIAGRAMS_ON_WEB` | Diagrams SHOULD be available via a web experience. |
| MUST | `MSDAS_MUST_API_PROVIDERS_PUBLISH_DEVELOPER_DOCUMENTATION` | `MSDAS_MUST_PUBLISH_DEVELOPER_DOCUMENTATION` | API Providers MUST publish developer documentation covering the technical constructs of their API — for example, where API Consumers are required… |
| SHOULD | `MSDAS_SHOULD_DEVELOPER_DOCUMENTATION_AVAILABLE_WEB` | `MSDAS_SHOULD_PUBLISH_DEVELOPER_DOCS_ON_WEB` | Developer documentation SHOULD be available via a web experience. |
| MUST | `MSDAS_MUST_API_PROVIDERS_PUBLISH_TERMS` | `MSDAS_MUST_PUBLISH_TERMS_AND_CONDITIONS` | API Providers MUST publish terms and conditions that set out the rules API Consumers must agree to when using the API. These SHOULD be available… |
| MUST | `MSDAS_MUST_API_PROVIDERS_PROVIDE_DEVELOPER_ONBOARDING` | `MSDAS_MUST_PROVIDE_DEVELOPER_ONBOARDING` | API Providers MUST provide a developer onboarding function enabling API Consumer developers to create and manage client application credentials… |
| SHOULD | `MSDAS_SHOULD_DEVELOPER_ONBOARDING_AUTHENTICATED_WEB` | `MSDAS_SHOULD_OFFER_ONBOARDING_ON_AUTHENTICATED_WEB` | This SHOULD be made available via an authenticated web experience — the MSD Developer Portal is the preferred mechanism. |
| MUST | `MSDAS_MUST_API_PROVIDERS_PUBLISH_SERVICE_LEVEL` | `MSDAS_MUST_PUBLISH_SERVICE_LEVEL_AGREEMENTS` | API Providers MUST publish service level agreements defining their commitments and the corresponding expectations for API Consumers. |
| MUST | `MSDAS_MUST_API_THROTTLING_PUBLISH_QUOTA` | `MSDAS_MUST_PUBLISH_THROTTLING_QUOTAS` | Where an API applies request throttling, the API Provider MUST publish: the request quota (e.g. requests per minute/hour) the threshold applies… |
| MUST | `MSDAS_MUST_API_THROTTLING_REJECTION_HTTP429` | `MSDAS_MUST_RETURN_429_WHEN_THROTTLED` | When a request is rejected for exceeding a throttling threshold, the API MUST return an HTTP 429 (Too Many Requests) response, and SHOULD include… |
| SHOULD | `MSDAS_SHOULD_API_INCLUDE_RESPONSE_HEADERS` | `MSDAS_SHOULD_INCLUDE_QUOTA_HEADERS` | Where an API supports it, response headers indicating current quota consumption SHOULD be returned on every response, letting well-behaved… |
| MAY | `MSDAS_MAY_API_PROVIDERS_OFFER_SLA_TIERING` | `MSDAS_MAY_OFFER_SLA_TIERING` | API Providers MAY offer SLA tiering, applying different SLAs to different consumers — for example, a higher tier for a client-facing application,… |
| SHOULD | `MSDAS_SHOULD_SLAS_AVAILABLE_WEB_EXPERIENCE` | `MSDAS_SHOULD_PUBLISH_SLAS_ON_WEB` | SLAs should be available via a web experience. |

## `api-publishing/03-openapi-specifications.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_SERVERS_PROPERTY_DEFINING_LIST_ENDPOINTS` | `MSDAS_MUST_DEFINE_SERVERS_PROPERTY` | The servers property, defining the list of endpoints where the API can be accessed, MUST be included. |
| SHOULD | `MSDAS_SHOULD_EXTERNALDOCS_PROPERTY_REFERENCING_SUPPORTING_DOCUMENTATION` | `MSDAS_SHOULD_REFERENCE_EXTERNAL_DOCS` | The externalDocs property, referencing supporting documentation for the API, SHOULD be included. |
| MUST | `MSDAS_MUST_OPENAPI_SPECIFICATIONS_DEFINE_APPROPRIATE_SECURITY` | `MSDAS_MUST_DEFINE_OPENAPI_SECURITY_SCHEMES` | OpenAPI Specifications MUST define appropriate security mechanisms. Security schemes MUST be defined in components.securitySchemes and referenced… |
| SHOULD | `MSDAS_SHOULD_PUBLIC_OPERATION_CARRY_SECURITY_PROPERTY` | `MSDAS_SHOULD_SET_EXPLICIT_SECURITY_ON_PUBLIC_OPERATIONS` | Even a public operation (e.g. a health-check or metadata endpoint) should still carry a security property, set explicitly to empty. |
| SHOULD | `MSDAS_SHOULD_PATH_VERB_RESPONSES_INCLUDE_ALL` | `MSDAS_SHOULD_DOCUMENT_ALL_RESPONSES` | `{path}.{verb}.responses` SHOULD include ALL responses by HTTP status code, and MUST include error responses, referring to an error schema where… |
| SHOULD NOT | `MSDAS_SHOULD_NOT_API_PROVIDERS_INCLUDE_DEFAULT_RESPONSE` | `MSDAS_SHOULD_NOT_USE_DEFAULT_RESPONSE` | API Providers SHOULD NOT include a default response. Although OpenAPI supports it, an explicit, complete response list is preferred. |
| MUST | `MSDAS_MUST_OPENAPI_SPECIFICATION_DEFINES_POST_PUT` | `MSDAS_MUST_DEFINE_REQUEST_BODY_SCHEMA` | Where an OpenAPI Specification defines a POST, PUT, or PATCH operation, it MUST include a requestBody property, which SHOULD reference a schema… |
| SHOULD | `MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_DEFINE_REUSABLE_PARAMETERS` | `MSDAS_SHOULD_DEFINE_REUSABLE_PARAMETERS` | OpenAPI specifications SHOULD define reusable parameters under components.parameters. |
| SHOULD | `MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_USE_SCHEMA_REFERENCES` | `MSDAS_SHOULD_USE_SCHEMA_REFERENCES` | OpenAPI specifications SHOULD use schema references under components.schemas to define content, and MAY use nested schema references for reusable… |
| SHOULD | `MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_DEFINE_REUSABLE_EXAMPLES` | `MSDAS_SHOULD_DEFINE_REUSABLE_EXAMPLES` | OpenAPI specifications SHOULD define reusable examples under components.examples. |
| SHOULD | `MSDAS_SHOULD_DESCRIPTION_FIELDS_USE_COMMONMARK` | `MSDAS_SHOULD_USE_COMMONMARK_IN_DESCRIPTIONS` | Description fields support CommonMark syntax, which should be used, as it renders correctly in most OpenAPI tooling. |
| MUST | `MSDAS_MUST_OPENAPI_DOCUMENT_PASS_VALIDATION_AGAINST` | `MSDAS_MUST_VALIDATE_OPENAPI_DOCUMENT` | The OpenAPI document MUST pass validation against the OpenAPI specification, e.g. using the Swagger Editor or an equivalent tool, ideally as part… |

## `api-publishing/04-asyncapi-specifications.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_ASYNCAPI_PROPERTY_INDICATING_SPECIFICATION_VERSION` | `MSDAS_MUST_DECLARE_ASYNCAPI_VERSION` | The asyncapi property, indicating the specification version in use, MUST be included. |
| MUST | `MSDAS_MUST_ADDRESS_FIELD_CONTAIN_TOPIC_NAME` | `MSDAS_MUST_PUT_TOPIC_NAME_IN_ADDRESS_FIELD` | The address field (v3+) must contain the topic name. In v2, this must be included in the description field instead. |
| MUST | `MSDAS_MUST_ADDRESS_TOPIC_NAME_V2_DESCRIPTION_FIELD` | `MSDAS_MUST_PUT_TOPIC_NAME_IN_V2_DESCRIPTION` | In AsyncAPI v2, the topic name must be included in the description field instead of the address field. |
| MUST | `MSDAS_MUST_SERVERS_FIELD_INDICATE_CHANNEL_SERVERS` | `MSDAS_MUST_INDICATE_CHANNEL_SERVERS` | The servers field must indicate which servers the channel is available on. |
| MUST | `MSDAS_MUST_MESSAGES_FIELD_REPRESENT_PUBLISHED_MESSAGES` | `MSDAS_MUST_DEFINE_CHANNEL_MESSAGES` | The messages field (v3+) must represent the messages published to a channel. |
| MUST | `MSDAS_MUST_MESSAGE_FIELD_V2_PUBLISH_SUBSCRIBE` | `MSDAS_MUST_DEFINE_CHANNEL_MESSAGES_IN_V2` | In AsyncAPI v2, the message field under publish or subscribe must be used to represent the messages published to a channel. |
| MUST | `MSDAS_MUST_EXTERNALDOCS_URL_LINK_FURTHER_DOCUMENTATION` | `MSDAS_MUST_PROVIDE_EXTERNAL_DOCS_URL` | externalDocs.url, a link to further documentation about the API, MUST be provided. |
| MUST | `MSDAS_MUST_ASYNCAPI_DOCUMENT_PASS_VALIDATION_AGAINST` | `MSDAS_MUST_VALIDATE_ASYNCAPI_DOCUMENT` | The AsyncAPI document MUST pass validation against the AsyncAPI specification, ideally as part of an automated pipeline or developer IDE integration. |

## `api-publishing/05-graphql-specifications.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_GRAPHQL_SCHEMA_PUBLISHED` | `MSDAS_MUST_PUBLISH_GRAPHQL_SCHEMA` | API Providers MUST publish the GraphQL schema for every GraphQL API. The schema must be defined using the GraphQL Schema Definition Language (SDL)… |
| MUST | `MSDAS_MUST_GRAPHQL_SCHEMA_DESCRIPTIONS` | `MSDAS_MUST_DESCRIBE_GRAPHQL_SCHEMA_ELEMENTS` | Every type, field, argument, enum value and input object within the schema must include a descriptive comment using GraphQL's native description… |
| MUST | `MSDAS_MUST_GRAPHQL_QUERY_LIMITS_DOCUMENTED` | `MSDAS_MUST_DOCUMENT_GRAPHQL_QUERY_LIMITS` | Query execution constraints, including any complexity scoring, query depth limits, execution cost limits, node limits or other restrictions… |
| SHOULD | `MSDAS_SHOULD_GRAPHQL_INTERACTIVE_DOCUMENTATION` | `MSDAS_SHOULD_PROVIDE_INTERACTIVE_GRAPHQL_DOCS` | Where practical, GraphQL schemas SHOULD be published in an interactive, browsable format (such as GraphiQL, Apollo Sandbox or an equivalent schema… |
| SHOULD | `MSDAS_SHOULD_GRAPHQL_INTROSPECTION_RESTRICTED` | `MSDAS_SHOULD_RESTRICT_GRAPHQL_INTROSPECTION` | Production GraphQL APIs exposed outside MSD SHOULD restrict schema introspection to authenticated and authorised consumers unless there is a… |
| MUST | `MSDAS_MUST_GRAPHQL_SCHEMA_VALIDATED` | `MSDAS_MUST_VALIDATE_GRAPHQL_SCHEMA` | GraphQL schema documents MUST be validated for GraphQL SDL compliance before publication. |
| MUST | `MSDAS_MUST_GRAPHQL_DEPRECATION_USED` | `MSDAS_MUST_MARK_DEPRECATED_GRAPHQL_ELEMENTS` | Fields, types and other schema elements that are superseded MUST be marked using GraphQL's standard @deprecated directive and include a clear… |
| MUST NOT | `MSDAS_MUST_NOT_GRAPHQL_BREAKING_SCHEMA_CHANGES` | `MSDAS_MUST_NOT_MAKE_BREAKING_GRAPHQL_CHANGES` | Breaking changes to a published GraphQL schema MUST NOT be introduced without following the API versioning and change management requirements… |
| SHOULD | `MSDAS_SHOULD_GRAPHQL_BUSINESS_MUTATIONS` | `MSDAS_SHOULD_MODEL_MUTATIONS_AS_BUSINESS_ACTIONS` | GraphQL mutations SHOULD represent meaningful business actions rather than generic create, update or delete operations wherever practical. |

## `api-publishing/06-diagrams.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_DIAGRAM_TYPE_AT_API_PROVIDER` | `MSDAS_SHOULD_PREFER_UML_SEQUENCE_DIAGRAMS` | The diagram type is at the API Provider's discretion, though UML sequence diagrams are recommended (see Publishing Components, Diagrams). |

## `api-publishing/08-publishing-mcp-servers.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_API_PROVIDERS_MCP_SERVER_PUBLISH` | `MSDAS_MUST_PUBLISH_MCP_CAPABILITY_CATALOGUE` | API Providers of an MCP Server MUST publish a capability catalogue — a human-readable listing of available Tools, Resources and Prompts, each with… |

## `api-security/03-api-authentication-and-authorisation-basics.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_APPROPRIATE_AUTHENTICATION_ACHIEVED_ACCESSING_APIS` | `MSDAS_MUST_AUTHENTICATE_API_ACCESS` | Appropriate authentication must be achieved when accessing APIs. |
| SHOULD NOT | `MSDAS_SHOULD_NOT_ANONYMOUS_ACCESS_USED_OTHER_THAN` | `MSDAS_SHOULD_NOT_USE_ANONYMOUS_ACCESS_EXCEPT_LOW_RISK` | Anonymous access should not be used other than for genuinely low-risk, public information. |
| MAY | `MSDAS_MAY_ANONYMOUS_ACCESS_USED_RISK_ASSOCIATED` | `MSDAS_MAY_USE_ANONYMOUS_ACCESS_WHEN_LOW_RISK` | Anonymous access may be used when the risk associated with the API is negligible — for example, an API offering publicly available service-centre… |
| MUST | `MSDAS_MUST_USING_ANONYMOUS_AUTHENTICATION_MODEL_API` | `MSDAS_MUST_APPLY_CONTROLS_FOR_ANONYMOUS_ACCESS` | If using the anonymous authentication model, the API must implement appropriate protection against typical API vulnerabilities and threats, as… |
| SHOULD NOT | `MSDAS_SHOULD_NOT_USERNAME_PASSWORD_DIRECT_AUTHENTICATION_USED` | `MSDAS_SHOULD_NOT_USE_PASSWORD_AUTHENTICATION_IN_PRODUCTION` | Username and password (direct) authentication should not be used for production APIs. |
| MAY | `MSDAS_MAY_THERE_POSSIBLY_SOME_LEGACY_SITUATIONS` | `MSDAS_MAY_USE_PASSWORD_AUTHENTICATION_FOR_LEGACY` | There are possibly some legacy situations where an API Provider may implement this pattern, but this must be treated as an exception and recorded… |
| MAY | `MSDAS_MAY_MODEL_USED_TESTING_DEVELOPMENT_PURPOSES` | `MSDAS_MAY_USE_PASSWORD_AUTHENTICATION_FOR_TESTING` | This model may be used for testing and development purposes. Note the related [SHOULD NOT guidance](#MSDAS_SHOULD_NOT_MODEL_USED_PRODUCTION_APIS)… |
| SHOULD NOT | `MSDAS_SHOULD_NOT_MODEL_USED_PRODUCTION_APIS` | `MSDAS_SHOULD_NOT_USE_PASSWORD_MODEL_IN_PRODUCTION` | This model should not be used for production APIs. Note the related [MAY guidance](#MSDAS_MAY_MODEL_USED_TESTING_DEVELOPMENT_PURPOSES) above — it… |
| SHOULD | `MSDAS_SHOULD_API_KEYS_USED_UNIQUE_ASSIGNED` | `MSDAS_SHOULD_ASSIGN_UNIQUE_API_KEYS` | API Keys should be used, and should be unique, assigned to an application, developer or organisation. |
| MUST | `MSDAS_MUST_API_KEYS_USED_WHEREVER_SYSTEM` | `MSDAS_MUST_USE_API_KEYS_FOR_SYSTEM_AUTHENTICATION` | API Keys must be used wherever system-to-system authentication is needed, especially for production-level APIs. |
| MAY | `MSDAS_MAY_API_KEYS_USED_SIMPLE_PUBLIC_APIS` | `MSDAS_MAY_USE_API_KEYS_FOR_SIMPLE_PUBLIC_APIS` | API Keys may be used on their own for simple public APIs that don't need more complex authentication models. |
| SHOULD | `MSDAS_SHOULD_API_KEY_EMBEDDED_API_CONSUMER` | `MSDAS_SHOULD_PROTECT_EMBEDDED_API_KEYS` | If the API Key is embedded in the API Consumer, it should be protected. |
| MAY | `MSDAS_MAY_MODEL_USED_API_DEPENDS_LEGACY` | `MSDAS_MAY_USE_CERTIFICATE_AUTH_FOR_LEGACY` | This model may be used where the API depends on legacy authentication mechanisms requiring mutual certificates. |
| MUST | `MSDAS_MUST_APPROPRIATE_AUTHORISATION_APPLIED` | `MSDAS_MUST_APPLY_APPROPRIATE_AUTHORISATION` | Appropriate authorisation must be applied. |
| SHOULD | `MSDAS_SHOULD_RBAC_USED` | `MSDAS_SHOULD_USE_RBAC` | RBAC should be used. |
| MUST | `MSDAS_MUST_APPROPRIATE_SCOPES_PRESENT_ACCESS_TOKENS` | `MSDAS_MUST_INCLUDE_SCOPES_IN_ACCESS_TOKENS` | Appropriate scopes must be present in access tokens when accessing APIs. |
| MAY | `MSDAS_MAY_OAUTH_SCOPES_LIMIT_AUTHORISATION` | `MSDAS_MAY_USE_OAUTH_SCOPES_TO_LIMIT_AUTHORISATION` | OAuth 2.0 scopes may be used to limit the authorisation granted to the API Consumer by the resource owner. |
| MUST | `MSDAS_MUST_ORDER_OCCUR_API_CONSUMER_PROVIDE` | `MSDAS_MUST_PROVIDE_AUTHORISATION_INTENT` | In order for this to occur, the API Consumer must provide the authorisation server with the intent of its request. |
| MAY | `MSDAS_MAY_API_PROVIDERS_UTILISE_ABAC` | `MSDAS_MAY_USE_ABAC` | API Providers may utilise ABAC. |
| MAY | `MSDAS_MAY_API_PROVIDERS_IMPLEMENT_ABAC_USING` | `MSDAS_MAY_IMPLEMENT_ABAC_WITH_XACML` | API Providers may implement ABAC using XACML, the recognised standard, which provides a reference architecture, a request/response protocol and a… |
| MAY | `MSDAS_MAY_API_PROVIDERS_IMPLEMENT_API_GATEWAY` | `MSDAS_MAY_IMPLEMENT_API_GATEWAY` | API Providers may implement API Gateway technology. |
| MUST | `MSDAS_MUST_API_PROVIDERS_IMPLEMENT_DEVELOPER_AUTHENTICATION` | `MSDAS_MUST_IMPLEMENT_DEVELOPER_AUTHENTICATION` | API Providers must implement Developer Authentication. |

## `api-security/05-cloud-api-security.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_CLOUD_API_DESIGNERS_DEVELOPERS_ENSURE` | `MSDAS_MUST_MEET_CLOUD_SECURITY_REQUIREMENTS` | Cloud API designers and developers must ensure the implementation achieves all of the following: robust authentication and authorisation (OAuth… |

## `api-security/07-using-oauth2-and-oidc.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_API_PROVIDERS_CLEARLY_DEFINE_DOCUMENT` | `MSDAS_MUST_DOCUMENT_CONSUMER_ONBOARDING_PROCESS` | API Providers must clearly define and document their API Consumer onboarding process and requirements. |
| MUST | `MSDAS_MUST_OPENID_CONNECT_USED_ALL_APIS` | `MSDAS_MUST_USE_OPENID_CONNECT_FOR_SENSITIVE_APIS` | OpenID Connect must be used with all APIs that expose IN-CONFIDENCE or more sensitive client and whānau information. |
| MUST | `MSDAS_MUST_ID_TOKEN_USED_ALL_APIS` | `MSDAS_MUST_USE_ID_TOKEN_FOR_SENSITIVE_APIS` | The ID Token must be used with all APIs exposing IN-CONFIDENCE or more sensitive information. |
| MUST | `MSDAS_MUST_API_PROVIDERS_ENSURE_MINIMUM_NUMBER` | `MSDAS_MUST_MINIMISE_IDENTITY_ATTRIBUTES` | API Providers must ensure only the minimum number of identity attributes needed to meet the API Consumer's request are provided, and must ensure… |
| MUST | `MSDAS_MUST_API_PROVIDER_ENSURE_CONSENT_SHARE` | `MSDAS_MUST_OBTAIN_CONSENT_TO_SHARE_ATTRIBUTES` | The API Provider must ensure consent to share this information has been given by the information owner — typically the client or their authorised… |
| MUST | `MSDAS_MUST_API_PROVIDER_LIMIT_GRANT_TYPES` | `MSDAS_MUST_LIMIT_GRANT_TYPES` | The API Provider must limit grant types to those agreed and documented for a given API; the API Consumer indicates its desired grant type via the… |
| MUST | `MSDAS_MUST_OIDC_AUTHORISATION_CODE_FLOW_CODE` | `MSDAS_MUST_USE_AUTHORISATION_CODE_FLOW_WITH_PKCE` | The OIDC Authorisation Code flow (code id\_token) with PKCE must be used when securing IN-CONFIDENCE APIs, together with JWT access and refresh… |
| MUST | `MSDAS_MUST_PKCE_USED_SECURING_CONFIDENCE_APIS` | `MSDAS_MUST_USE_PKCE_FOR_CONFIDENCE_APIS` | PKCE must be used when securing IN-CONFIDENCE APIs. |

## `api-security/08-alternative-oauth2-grant-flows.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD NOT | `MSDAS_SHOULD_NOT_SAML_ASSERTION_FLOWS_USED_SERVER` | `MSDAS_SHOULD_NOT_USE_SAML_FOR_SERVER_TO_SERVER` | SAML assertion flows should not be used for server-to-server flows, and should not use a client-created assertion model. Note the related [MAY… |
| MAY | `MSDAS_MAY_SAML_ASSERTION_FLOWS_USED_UNCLASSIFIED_APIS` | `MSDAS_MAY_USE_SAML_FOR_UNCLASSIFIED_APIS` | SAML assertion flows may be used for UNCLASSIFIED APIs, and may be used with authorisation code flows for IN-CONFIDENCE APIs where a SAML… |
| MAY | `MSDAS_MAY_MSD_USE_BACKEND_FRONTEND_PATTERN` | `MSDAS_MAY_USE_BACKEND_FOR_FRONTEND_PATTERN` | MSD may use the Backend for Frontend pattern for single-page applications that need to support IN-CONFIDENCE APIs, while this guidance remains in… |

## `api-security/09-client-authentication-and-token-protection.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| SHOULD | `MSDAS_SHOULD_ALL_CONFIDENCE_MORE_SENSITIVE_APIS` | `MSDAS_SHOULD_SECURE_SENSITIVE_APIS_WITH_CLIENT_AUTHENTICATION` | All IN-CONFIDENCE or more sensitive APIs should be secured using Client Authentication to protect the API endpoints. Tokens issued must be bound… |
| MAY | `MSDAS_MAY_SELF_SIGNED_TLS_CLIENT_AUTH_USED_TESTING_DEVELOPMENT_ENVIRON` | `MSDAS_MAY_USE_SELF_SIGNED_MTLS_IN_TESTING` | self\_signed\_tls\_client\_auth may be used in testing and development environments. tls\_client\_auth may be used in production with a… |
| SHOULD NOT | `MSDAS_SHOULD_NOT_SELF_SIGNED_TLS_CLIENT_AUTH_USED_PRODUCTION` | `MSDAS_SHOULD_NOT_USE_SELF_SIGNED_MTLS_IN_PRODUCTION` | self\_signed\_tls\_client\_auth should not be used in production. Public clients should not use either mTLS method… |
| MAY | `MSDAS_MAY_DPOP_MODEL_PROTECTING_IN_CONFIDENCE` | `MSDAS_MAY_USE_DPOP_FOR_CONFIDENCE_APIS` | A DPoP model may be used when protecting IN-CONFIDENCE APIs. Selection of certificate-based or JWK-based PoP should be based on a risk assessment… |

## `api-security/10-level-of-assurance.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_API_PROVIDERS_ADOPT_LEVEL_ASSURANCE` | `MSDAS_MUST_ADOPT_LEVEL_OF_ASSURANCE_MODEL` | API Providers must adopt a Level of Assurance model, applied wherever API Consumers access client or whānau records classified as IN-CONFIDENCE or… |

## `api-security/11-consideration-of-risks.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_API_DESIGNERS_IMPLEMENTERS_SHOW_HOW` | `MSDAS_MUST_DEMONSTRATE_RISK_ASSESSMENT` | API designers and implementers must show how they have assessed and managed risks associated with their API solution. This assessment should be… |
| SHOULD | `MSDAS_SHOULD_MSD_CONSIDER_FOLLOWING_PLANNING_ZERO` | `MSDAS_SHOULD_CONSIDER_ZERO_TRUST_PRINCIPLES` | MSD should consider the following when planning a Zero Trust architecture: apply strong identification and authentication; build a dynamic digital… |

## `api-security/12-par-jarm-and-session-management.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MAY | `MSDAS_MAY_PAR_APPLIED_CONFIDENCE_APIS_SOLUTIONS` | `MSDAS_MAY_USE_PAR_FOR_CONFIDENCE_APIS` | PAR may be applied for IN-CONFIDENCE APIs, or solutions that require complex authorisation requests. |
| MAY | `MSDAS_MAY_JARM_USED_CONFIDENCE_APIS` | `MSDAS_MAY_USE_JARM_FOR_CONFIDENCE_APIS` | JARM may be used for IN-CONFIDENCE APIs. |
| SHOULD | `MSDAS_SHOULD_MSD_IMPLEMENT_SESSION_MANAGEMENT_DEFINED` | `MSDAS_SHOULD_IMPLEMENT_SESSION_MANAGEMENT` | MSD should implement session management as defined in the relevant OpenID Connect standards. |

## `api-security/13-security-controls.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_ALL_COMMUNICATIONS_API_UTILISE_TRANSPORT` | `MSDAS_MUST_USE_TLS_FOR_ALL_COMMUNICATIONS` | All communications to or from an API must utilise Transport Layer Security (TLS) 1.3 or higher. *See the New Zealand Information Security Manual… |
| SHOULD | `MSDAS_SHOULD_OTHER_VERSIONS_TLS_SSL_DISABLED` | `MSDAS_SHOULD_DISABLE_OBSOLETE_TLS_VERSIONS` | Other versions of TLS and SSL should be disabled. |
| MUST | `MSDAS_MUST_API_CONSUMER_VALIDATE_TLS_CERTIFICATE_CHAINS` | `MSDAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS` | API Consumer applications must validate TLS certificate chains when making requests to protected resources, including checking the Certificate… |
| REQUIRED | `MSDAS_MUST_CONTENT_ENCRYPTION_ADHERE_STANDARD_ALGORITHMS` | `MSDAS_MUST_USE_STANDARD_ENCRYPTION_ALGORITHMS` | Any content encryption must adhere to the standard algorithms set out in the New Zealand Information Security Manual (HMAC algorithms). |
| MUST | `MSDAS_MUST_BEARER_TOKENS_USED_THEY_JSON` | `MSDAS_MUST_USE_SIGNED_JWT_BEARER_TOKENS` | Where bearer tokens are used, they must be JSON Web Tokens (JWT) signed using JSON Web Signature. |
| MUST | `MSDAS_MUST_API_PROVIDERS_CORRECTLY_CLASSIFY_INFORMATION` | `MSDAS_MUST_CLASSIFY_EXPOSED_INFORMATION` | API Providers must correctly classify the information exposed by an API using the PSR classification levels (e.g. UNCLASSIFIED, IN-CONFIDENCE,… |

## `api-security/14-mcp-api-security.md`

| Type | Current ID | Proposed ID | Rule |
| --- | --- | --- | --- |
| MUST | `MSDAS_MUST_REMOTE_MCP_SERVERS_AUTHENTICATION_REQUIRED` | `MSDAS_MUST_USE_OAUTH_FOR_MCP_AUTHENTICATION` | Remote MCP Servers when authentication is required, must use the OAuth 2.1 mechanisms set out earlier in this Part, including PKCE, rather than a… |
| MUST | `MSDAS_MUST_ACCESS_TOKENS_MCP_AUDIENCE_RESTRICTED` | `MSDAS_MUST_AUDIENCE_RESTRICT_MCP_TOKENS` | Access tokens issued for MCP use must be audience-restricted to the specific MCP Server, and must not be accepted by other MSD APIs, or vice… |
| MUST | `MSDAS_MUST_MCP_TOOLS_SCOPED_MINIMUM_DATA_ACTIONS` | `MSDAS_MUST_SCOPE_MCP_TOOLS_TO_MINIMUM_ACCESS` | Tools must be scoped to the minimum data and actions required, following the same least-privilege principle applied to REST API scopes. A tool… |
| SHOULD | `MSDAS_SHOULD_TOOLS_WRITE_DATA_TRIGGER_REAL` | `MSDAS_SHOULD_REQUIRE_CONFIRMATION_FOR_WRITE_TOOLS` | Tools that write data, or trigger a real-world action on a client's record, should require explicit human confirmation within the host application… |
| MUST NOT | `MSDAS_MUST_NOT_MCP_SERVER_SILENTLY_CHANGE_PREVIOUSLY` | `MSDAS_MUST_NOT_SILENTLY_CHANGE_APPROVED_TOOLS` | An MCP Server must not silently change a previously approved tool's behaviour or description once a client has connected. Any material change must… |
| MUST | `MSDAS_MUST_MCP_SERVERS_TREAT_CONTENT_UNTRUSTED` | `MSDAS_MUST_TREAT_MCP_CONTENT_AS_UNTRUSTED` | MCP Servers must treat all resource content and tool output as untrusted from the agent's perspective, and must not rely on the agent to correctly… |
| MUST | `MSDAS_MUST_ALL_TOOL_INVOCATIONS_ACCESS_MODIFY` | `MSDAS_MUST_LOG_CLIENT_DATA_TOOL_INVOCATIONS` | All tool invocations that access or modify client or whānau data must be logged with sufficient detail to identify the requesting agent, the… |

---

## Notes — two things worth a decision before applying

[^dupes]: **Duplicates resolved (no more suffixes).** The rules that were previously stated in more than one document have now been genuinely deduplicated in the source: each is defined once at a single canonical location, and the other pages reference it by a markdown anchor link rather than repeating the `<Standard>`. As a result the `_2`/`_3` suffixes are gone and every Current ID in the tables above is unique. Canonical homes and the pages that now link to them:

    - **Scope tools, require write-confirmation, rug-pull protection, audit logging** → canonical in `api-security/14-mcp-api-security.md`; linked from `api-development/mcp-apis/08-mcp-security.md`.
    - **Publish MCP capability catalogue** (`MSDAS_MUST_API_PROVIDERS_MCP_SERVER_PUBLISH`) → canonical in `api-publishing/08-publishing-mcp-servers.md`; linked from `api-development/mcp-apis/09-publishing-mcp-servers.md`.
    - **Implement Developer Authentication** (`MSDAS_MUST_API_PROVIDERS_IMPLEMENT_DEVELOPER_AUTHENTICATION`) → canonical in `api-security/03-api-authentication-and-authorisation-basics.md`; linked from `api-security/02-security-reference-architecture.md`.

    Two distinct rules remain about write tools and must keep distinct IDs: `MSDAS_SHOULD_DISTINGUISH_WRITE_TOOLS` (tool design — distinguish write tools by name/description) and `MSDAS_SHOULD_REQUIRE_CONFIRMATION_FOR_WRITE_TOOLS` (security — require human confirmation).

    **When renaming, update anchors too.** Each canonical rule is targeted by a cross-page link of the form `…#<Current ID>`. Renaming a Current ID to its Proposed ID must also rewrite these `#<Current ID>` fragments, or the build (`onBrokenLinks: 'throw'`) will fail. A repo-wide replace of the full ID string covers both the `id="…"` attribute and the `#…` link fragment in one pass.

[^spelling]: **British spelling preserved.** Proposed IDs keep the British spelling used across the docs (`AUTHORISATION`, `CATALOGUE`, etc.) for consistency. Confirm this is the intended house style before applying.

