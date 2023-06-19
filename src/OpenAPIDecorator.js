"use strict";

const DocumentationParts = require("./DocumentationParts");

class OpenAPIDecorator {
  constructor(openAPI) {
    this.openAPI = openAPI;
  }

  decorate(type = "documentationPart") {
    if (type === "documentationPart") {
      this.decorateDocumentationParts();
    }
  }

  decorateDocumentationParts() {
    const obj = {
      "x-amazon-apigateway-documentation": {
        version: this.openAPI.info.version,
        documentationParts: [],
      },
    };

    const documentationParts = new DocumentationParts(this.openAPI);
    const parts = documentationParts.parse();

    obj["x-amazon-apigateway-documentation"].documentationParts = parts;

    Object.assign(this.openAPI, obj);
  }
}

module.exports = OpenAPIDecorator;
