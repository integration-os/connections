const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    tax_rate: "string", // Required

    // active: "<boolean>",
    // country: "<string>",
    // description: "<string>",
    // display_name: "<string>",
    // expand: ["string"],
    // jurisdiction: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // state: "<string>",
    // tax_type: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
