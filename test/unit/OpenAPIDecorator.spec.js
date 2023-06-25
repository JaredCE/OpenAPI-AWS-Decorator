"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const validOpenAPI = require("../mocks/openAPI.json");
const OpenAPIDecorator = require("../../src/OpenAPIDecorator");

describe(`OpenAPIDecorator`, function () {
  describe(`documentationPart`, function () {
    it(`attaches a x-amazon-apigateway-documentation to an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );
    });

    it(`generates an API Location Part for an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "API") return part;
      });

      expect(APIPart).lengthOf(1);
      expect(APIPart[0].properties.info).to.be.eql(openAPIDoc.info);
    });

    it(`generates RESOURCE location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "RESOURCE") return part;
      });

      expect(APIPart).lengthOf(3);
    });

    it(`generates METHOD location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "METHOD") return part;
      });

      expect(APIPart).lengthOf(3);
    });

    it(`generates PATH_PARAMETER location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "PATH_PARAMETER") return part;
      });

      expect(APIPart).lengthOf(4);
    });

    it(`generates QUERY_PARAMETER location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "QUERY_PARAMETER") return part;
      });

      expect(APIPart).lengthOf(0);
    });

    it(`generates REQUEST_HEADER location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "REQUEST_HEADER") return part;
      });

      expect(APIPart).lengthOf(0);
    });

    it(`generates REQUEST_BODY location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "REQUEST_BODY") return part;
      });

      expect(APIPart).lengthOf(1);
    });

    it(`generates RESPONSE location part for each resource on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "RESPONSE") return part;
      });

      expect(APIPart).lengthOf(5);
    });

    it(`generates MODEL location part for each component schema on an openAPI document`, function () {
      const openAPIDoc = JSON.parse(JSON.stringify(validOpenAPI));
      const openAPIDecorator = new OpenAPIDecorator(openAPIDoc);
      openAPIDecorator.decorate();

      expect(openAPIDecorator.openAPI).to.have.property(
        "x-amazon-apigateway-documentation"
      );

      expect(
        openAPIDecorator.openAPI["x-amazon-apigateway-documentation"]
      ).to.have.property("documentationParts");

      const APIPart = openAPIDecorator.openAPI[
        "x-amazon-apigateway-documentation"
      ].documentationParts.filter((part) => {
        if (part.location.type === "MODEL") return part;
      });

      expect(APIPart).lengthOf(1);
    });
  });
});
