---
title: OpenAPI Specifications
---
<Standard type="INFO">
All components of the OpenAPI Specification are supported by this standard and should be interpreted as a MAY unless stated otherwise below.
</Standard>

OpenAPI Specification Structure:

| Component | Description | Requirement |
| --- | --- | --- |
| OpenAPI specification | The core specification. | All mandatory fields defined in the specification itself |
| Property descriptions | Human-readable description of each property. Should be verbose enough for a reader to understand the property's purpose. | MUST be provided for all properties |

## **Servers property**

<Standard id="MSDAS_MUST_SERVERS_PROPERTY_DEFINING_LIST_ENDPOINTS" type="MUST">
The servers property, defining the list of endpoints where the API can be accessed, MUST be included.
</Standard>

| servers:   - url: `https://api.msd.govt.nz/income-support/v1`     description: MSD Income Support API   - url: `https://api-test.msd.govt.nz/income-support/v1`     description: MSD Income Support API (test) |
| --- |

## **Info section**

The info section of an OpenAPI specification contains details on the API Provider.

| Property | Description | Requirement |
| --- | --- | --- |
| info.title |  | MUST |
| info.description | See Property Descriptions. | MUST |
| info.license |  | info.license.name MUST; info.license.url MUST |
| info.version | The version of the OpenAPI document (not the API or OpenAPI spec version). | MUST |
| info.contact | Mechanism for contacting the API Provider. | info.contact.name MUST; info.contact.url MUST |
| info.termsOfService | Link to the API's terms of service. | SHOULD |

## **External documentation**

<Standard id="MSDAS_SHOULD_EXTERNALDOCS_PROPERTY_REFERENCING_SUPPORTING_DOCUMENTATION" type="SHOULD">
The externalDocs property, referencing supporting documentation for the API, SHOULD be included.
</Standard>

## **Paths section**

The paths section is a parent property containing the resource paths in the API and the properties associated with each.

| Property | Description | Requirement |
| --- | --- | --- |
| `{path}.summary` | Short, human-readable summary of the resource's purpose. | MUST |
| `{path}.description` | See Property Descriptions. | MUST |
| `{path}.{verb}.summary` | Short summary of the operation's purpose. | MUST |
| `{path}.{verb}.security` | The security scheme appropriate for the path/verb. | MUST |
| `{path}.{verb}.operationId` | A unique string identifying the operation. | MUST |
| `{path}.{verb}.requestBody` | The request body for the operation. | MUST for POST/PUT/PATCH; MUST NOT for GET/DELETE/HEAD/OPTIONS |
| `{path}.{verb}.responses` | The responses an API Consumer can expect. | MUST |

### **Security**

<Standard id="MSDAS_MUST_OPENAPI_SPECIFICATIONS_DEFINE_APPROPRIATE_SECURITY" type="MUST">
OpenAPI Specifications MUST define appropriate security mechanisms. Security schemes MUST be defined in components.securitySchemes and referenced in all API operations.
</Standard>

Even a public operation (e.g. a health-check or metadata endpoint) <Standard inline id="MSDAS_SHOULD_PUBLIC_OPERATION_CARRY_SECURITY_PROPERTY" type="SHOULD" toolTip="Even a public operation (e.g. a health-check or metadata endpoint) should still carry a security property, set explicitly to empty.">SHOULD</Standard> still carry a security property, set explicitly to empty.

```yaml
paths:
  /status:
    summary: Service status endpoint
    get:
      security: []
      summary: Return the service's current status
```

Example security schemes:

```yaml
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: x-api-key
      in: header
    oauth-client-credentials:
      type: oauth2
      description: Client credentials flow for system-to-system auth
      flows:
        clientCredentials:
          tokenUrl: https://auth.msd.govt.nz/realms/msd-integration/protocol/openid-connect/token
          scopes:
            system/Client.r: Grant read access to Client resources
            system/Client.c: Grant create access to Client resources
            system/Client.u: Grant update access to Client resources
            system/Client.rs: Grant read and search access to Client resources
```

### **Responses**

<Standard id="MSDAS_SHOULD_PATH_VERB_RESPONSES_INCLUDE_ALL" type="SHOULD">
`{path}.{verb}.responses` SHOULD include ALL responses by HTTP status code, and MUST include error responses, referring to an error schema where possible.
</Standard>

```yaml
responses:
  '200':
    description: Request succeeded
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Client'
  '400':
    description: Bad request - validation failed
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
  '404':
    description: Client not found
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
```

<Standard id="MSDAS_SHOULD_NOT_API_PROVIDERS_INCLUDE_DEFAULT_RESPONSE" type="SHOULD NOT">
API Providers SHOULD NOT include a default response. Although OpenAPI supports it, an explicit, complete response list is preferred.
</Standard>

### **Request body**

<Standard id="MSDAS_MUST_OPENAPI_SPECIFICATION_DEFINES_POST_PUT" type="MUST">
Where an OpenAPI Specification defines a POST, PUT, or PATCH operation, it MUST include a requestBody property, which SHOULD reference a schema defined in components.
</Standard>

## **Components section**

### **Parameters**

<Standard id="MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_DEFINE_REUSABLE_PARAMETERS" type="SHOULD">
OpenAPI specifications SHOULD define reusable parameters under components.parameters.
</Standard>

```yaml
components:
  parameters:
    clientId:
      name: clientId
      in: path
      description: Unique identifier for a client, host/clients/{clientId}
      required: true
      schema:
        type: string
```

### **Schemas**

<Standard id="MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_USE_SCHEMA_REFERENCES" type="SHOULD">
OpenAPI specifications SHOULD use schema references under components.schemas to define content, and MAY use nested schema references for reusable elements.
</Standard>

### **Examples**

<Standard id="MSDAS_SHOULD_OPENAPI_SPECIFICATIONS_DEFINE_REUSABLE_EXAMPLES" type="SHOULD">
OpenAPI specifications SHOULD define reusable examples under components.examples.
</Standard>

## **Property descriptions**

Property descriptions are for API Consumer developers to understand the purpose of a specification property. Description fields support CommonMark syntax, which <Standard inline id="MSDAS_SHOULD_DESCRIPTION_FIELDS_USE_COMMONMARK" type="SHOULD" toolTip="Description fields support CommonMark syntax, which should be used, as it renders correctly in most OpenAPI tooling.">SHOULD</Standard> be used, as it renders correctly in most OpenAPI tooling.

## **OpenAPI validation**

<Standard id="MSDAS_MUST_OPENAPI_DOCUMENT_PASS_VALIDATION_AGAINST" type="MUST">
The OpenAPI document MUST pass validation against the OpenAPI specification, e.g. using the Swagger Editor or an equivalent tool, ideally as part of an automated pipeline or developer IDE integration.
</Standard>
