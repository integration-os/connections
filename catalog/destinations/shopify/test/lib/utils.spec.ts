import { composeUriSuffix, extractMethod } from "../../lib/utils";

describe("Test: Shopify utility functions", () => {
  describe("extractMethod", () => {
    it("should extract 'POST' method from 'create' actions", () => {
      expect(extractMethod("create")).toBe("POST");
    });
    it("should extract 'PUT' method from 'update' actions", () => {
      expect(extractMethod("update")).toBe("PUT");
    });
    it("should extract 'DELETE' method from 'delete' actions", () => {
      expect(extractMethod("delete")).toBe("DELETE");
    });
    it("should raise an error", () => {
      expect(() => extractMethod("bad")).toThrow("Method bad not supported");
    });
  });

  describe("composeUriSuffix", () => {
    it("should compose a 1-resource URI", () => {
      expect(composeUriSuffix({ resource: "res" })).toBe("/res.json");
    });

    it("should compose a 1-resource URI with an ID", () => {
      expect(
        composeUriSuffix({
          resource: "res",
          payload: { primaryResourceId: "id" } }),
      ).toBe("/res/id.json");
    });

    it("should compose a 2-resource URI", () => {
      expect(
        composeUriSuffix({
          resource: "res1",
          secondaryResource: "res2",
          payload: { primaryResourceId: "id" } }),
      ).toBe("/res1/id/res2.json");
    });

    it("should compose a 2-resource URI with an ID", () => {
      expect(
        composeUriSuffix({
          resource: "res1",
          secondaryResource: "res2",
          payload: { primaryResourceId: "id1", secondaryResourceId: "id2" } }),
      ).toBe("/res1/id1/res2/id2.json");
    });

    it("should reject composing a 2-resource URI without an ID", () => {
      expect(() => composeUriSuffix({
        resource: "res1",
        secondaryResource: "res2" }))
        .toThrow();
    });
  });
});
