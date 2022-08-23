const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    display_name: "<string>", // Required
    inclusive: "<boolean>", // Required
    percentage: "<number>", // Required

    // active: "<boolean>",
    // country: "<string>",
    // description: "<string>",
    // expand: ["string"],
    // jurisdiction: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // state: "<string>",
    // tax_type: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
