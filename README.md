# OpenAPI-AWS-Decorator

<p>
  <a href="https://www.npmjs.com/package/openapi-aws-decorator">
    <img src="https://img.shields.io/npm/v/openapi-aws-decorator.svg?style=flat-square">
  </a>
  <a href="https://github.com/JaredCE/OpenAPI-AWS-Decorator/actions/workflows/node.yml">
    <img src="https://github.com/JaredCE/OpenAPI-AWS-Decorator/actions/workflows/node.yml/badge.svg">
  </a>
</p>

This will decorate an Open API v3 document with specific `x-amazon-` OpenAPI syntax.

## Install

To install:
**Using npm:**

```bash
npm install openapi-aws-decorator
```

## Usage

### x-amazon-apigateway-documentation

To decorate an OpenAPI file with `x-amazon-apigateway-documentation`, which are [Documentation Parts](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-documenting-api-content-representation.html#api-gateway-documenting-api-content-representation-documentation-parts) you can run this code:

```js
const OpenAPIDecorator = require("openapi-aws-decorator");

const openAPI = {
  openapi: "3.0.1",
  info: {
    description:
      "The Data Set API (DSAPI) allows the public users to discover and search USPTO exported data sets. This is a generic API that allows USPTO users to make any CSV based data files searchable through API. With the help of GET call, it returns the list of data fields that are searchable. With the help of POST call, data can be fetched based on the filters on the field names. Please note that POST call is used to search the actual data. The reason for the POST call is that it allows users to specify any complex search criteria without worry about the GET size limitations as well as encoding of the input parameters.",
    version: "1.0.0",
    title: "USPTO Data Set API",
    contact: {
      name: "Open Data Portal",
      url: "https://developer.uspto.gov",
      email: "developer@uspto.gov",
    },
  },
  paths: {
    "/": {
      get: {
        operationId: "list-data-sets",
        summary: "List available data sets",
        responses: {
          200: {
            description: "Returns a list of data sets",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/responseData",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      responseData: {
        type: "string",
      },
    },
  },
};

const openAPIDecorator = new OpenAPIDecorator(openAPI);
openAPIDecorator.decorate();

console.log(openAPIDecorator.openAPI);
```

This will end up with the original OpenAPI document containing a new property section of `x-amazon-apigateway-documentation` with the various Documentation Parts listed out.

```json
{
  "openapi": "3.0.1",
  "info": {
    "description": "The Data Set API (DSAPI) allows the public users to discover and search USPTO exported data sets. This is a generic API that allows USPTO users to make any CSV based data files searchable through API. With the help of GET call, it returns the list of data fields that are searchable. With the help of POST call, data can be fetched based on the filters on the field names. Please note that POST call is used to search the actual data. The reason for the POST call is that it allows users to specify any complex search criteria without worry about the GET size limitations as well as encoding of the input parameters.",
    "version": "1.0.0",
    "title": "USPTO Data Set API",
    "contact": {
      "name": "Open Data Portal",
      "url": "https://developer.uspto.gov",
      "email": "developer@uspto.gov"
    }
  },
  ...
  "x-amazon-apigateway-documentation": {
    "version": "1.0.0",
    "documentationParts": [
      {
        "location": { "type": "API" },
        "properties": {
          "info": {
            "description": "The Data Set API (DSAPI) allows the public users to discover and search USPTO exported data sets. This is a generic API that allows USPTO users to make any CSV based data files searchable through API. With the help of GET call, it returns the list of data fields that are searchable. With the help of POST call, data can be fetched based on the filters on the field names. Please note that POST call is used to search the actual data. The reason for the POST call is that it allows users to specify any complex search criteria without worry about the GET size limitations as well as encoding of the input parameters.",
            "version": "1.0.0",
            "title": "USPTO Data Set API",
            "contact": {
              "name": "Open Data Portal",
              "url": "https://developer.uspto.gov",
              "email": "developer@uspto.gov"
            }
          }
        }
      },
      { "location": { "type": "RESOURCE", "path": "/" }, "properties": {} },
      {
        "location": { "type": "METHOD", "path": "/", "method": "get" },
        "properties": { "summary": "List available data sets" }
      },
      {
        "location": {
          "path": "/",
          "method": "get",
          "statusCode": "200",
          "type": "RESPONSE"
        },
        "properties": { "description": "Returns a list of data sets" }
      }
    ]
  }
}
```

You can then use the AWS CLI v2 command to upload the documentation parts:

```bash
aws apigateway import-documentation-parts --rest-api-id your-rest-api-id --body fileb://openAPI.json
```

This asusmes that you have saved the augmented OpenAPI to a file called **openAPI.json** and that you know your rest-api-id.
