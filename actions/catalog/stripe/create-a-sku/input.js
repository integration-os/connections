const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    currency: "<string>", // Required
    inventory: { quantity: 0, type: "bucket", value: "" }, // Required
    price: "<integer>", // Required
    product: "<string>", // Required

    // active: "<boolean>",
    // attributes: { property1: "string", property2: "string" },
    // expand: ["string"],
    // id: "<string>",
    // image: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // package_dimensions: { height: 0, length: 0, weight: 0, width: 0 },
    // inventoryType: "<string>",
    // inventoryQuantity: "<integer>",
    // inventoryValue: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // package_dimensionsHeight: "<number>",
    // package_dimensionsLength: "<number>",
    // package_dimensionsWeight: "<number>",
    // package_dimensionsWidth: "<number>",
  };
};
