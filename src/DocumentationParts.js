"use strict";

class DocumentationParts {
  constructor(openAPI) {
    this.openAPI = openAPI;
    this.newModelNames = {};
    this.oldModelNames = {};
  }

  parse() {
    let parts = [];
    const apiPart = this.__createAPIPart();
    parts.push(apiPart);

    const modelParts = this.__manipulateModels();
    parts = parts.concat(modelParts);

    const resourceParts = this.__createPathParts();
    parts = parts.concat(resourceParts);

    return parts;
  }

  __createAPIPart() {
    const info = this.openAPI.info;
    const part = {
      location: {
        type: "API",
      },
      properties: {
        info,
      },
    };
    return part;
  }

  __createPathParts() {
    let parts = [];

    for (const [pathName, pathValue] of Object.entries(this.openAPI.paths)) {
      this.pathName = pathName;
      this.pathValue = pathValue;
      const pathPart = this.__createRESOURCEPart();
      parts.push(pathPart);

      const methodParts = this.__createMETHODPart();
      parts = parts.concat(methodParts);

      const paramParts = this.__createPARAMParts();
      parts = parts.concat(paramParts);

      const bodyParts = this.__createREQUESTBODYParts();
      parts = parts.concat(bodyParts);

      const responseParts = this.__createRESPONSEParts();
      parts = parts.concat(responseParts);
    }

    return parts;
  }

  __createRESOURCEPart() {
    return {
      location: { type: "RESOURCE", path: this.pathName },
      properties: {},
    };
  }

  __createMETHODPart() {
    const parts = [];
    for (const method of Object.keys(this.pathValue)) {
      const description = this.pathValue[method]?.description;
      const summary = this.pathValue[method]?.summary;

      parts.push({
        location: {
          type: "METHOD",
          path: this.pathName,
          method: method,
        },
        properties: {
          ...(description && { description: description }),
          ...(summary && { summary: summary }),
        },
      });
    }

    return parts;
  }

  __createPARAMParts() {
    const parts = [];
    for (const method of Object.keys(this.pathValue)) {
      for (const param of this.pathValue[method]?.parameters || []) {
        const description = param?.description;
        const part = {
          location: {
            path: this.pathName,
            name: param.name,
            method: method,
          },
          properties: {
            ...(description && { description: description }),
          },
        };
        switch (param.in) {
          case "path":
            part.location.type = "PATH_PARAMETER";
            break;
          case "query":
            part.location.type = "QUERY_PARAMETER";
            break;
          case "header":
            part.location.type = "REQUEST_HEADER";
            break;
        }

        parts.push(part);
      }
    }

    return parts;
  }

  __createREQUESTBODYParts() {
    const parts = [];
    for (const method of Object.keys(this.pathValue)) {
      if (this.pathValue[method]?.requestBody) {
        const description = this.pathValue[method]?.requestBody?.description;
        const part = {
          location: {
            type: "REQUEST_BODY",
            path: this.pathName,
            method: method,
          },
          properties: {
            ...(description && { description: description }),
          },
        };
        parts.push(part);
      }
    }

    return parts;
  }

  __createRESPONSEParts() {
    const parts = [];

    for (const method of Object.keys(this.pathValue)) {
      const responses = this.pathValue[method]?.responses;

      for (const [statusCode, response] of Object.entries(responses)) {
        const description = response?.description;
        const part = {
          location: {
            path: this.pathName,
            method: method,
            statusCode: statusCode,
            type: "RESPONSE",
          },
          properties: {
            ...(description && { description: description }),
          },
        };

        parts.push(part);
      }
    }

    return parts;
  }

  __manipulateModels() {
    const parts = [];
    if (this.openAPI?.components?.schemas) {
      for (const [key, model] of Object.entries(
        this.openAPI.components.schemas
      )) {
        const newKey = key.replace(/[\W_]+/g, "");
        Object.assign(this.oldModelNames, { [key]: newKey });
        Object.assign(this.newModelNames, { [newKey]: key });

        Object.assign(this.openAPI.components.schemas, {
          [newKey]: this.openAPI.components.schemas[key],
        });

        if (newKey !== key) delete this.openAPI.components.schemas[key];

        const part = this.__createMODELPart(model, newKey);

        parts.push(part);
      }
    }

    return parts;
  }

  __createMODELPart(model, key) {
    const part = {
      location: {
        type: "MODEL",
        name: key,
      },
      properties: {
        schema: model,
      },
    };
    return part;
  }
}

module.exports = DocumentationParts;
