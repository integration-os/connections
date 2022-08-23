const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    id: "string", // Required

    // active: "<boolean>",
    // default_price: "<string>",
    // description: "<string>",
    // expand: ["string"],
    // images: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // name: "<string>",
    // package_dimensions: { height: 0, length: 0, weight: 0, width: 0 },
    // shippable: "<boolean>",
    // statement_descriptor: "<string>",
    // tax_code: "string",
    // unit_label: "<string>",
    // url: "string",
    // expand0: "<string>",
    // expand1: "<string>",
    // images0: "<string>",
    // images1: "<string>",
    // package_dimensionsHeight: "<number>",
    // package_dimensionsLength: "<number>",
    // package_dimensionsWeight: "<number>",
    // package_dimensionsWidth: "<number>",
  };
};
