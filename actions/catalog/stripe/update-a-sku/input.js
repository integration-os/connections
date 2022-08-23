const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    id: "string", // Required

    // active: "<boolean>",
    // attributes: { property1: "string", property2: "string" },
    // currency: "<string>",
    // expand: ["string"],
    // image: "<string>",
    // inventory: { quantity: 0, type: "bucket", value: "" },
    // metadata: { property1: "string", property2: "string" },
    // package_dimensions: { height: 0, length: 0, weight: 0, width: 0 },
    // price: "<integer>",
    // product: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // inventoryQuantity: "<integer>",
    // inventoryType: "<string>",
    // inventoryValue: "<string>",
    // package_dimensionsHeight: "<number>",
    // package_dimensionsLength: "<number>",
    // package_dimensionsWeight: "<number>",
    // package_dimensionsWidth: "<number>",
  };
};
