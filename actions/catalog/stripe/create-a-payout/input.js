const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    amount: "<integer>", // Required
    currency: "<string>", // Required

    // description: "<string>",
    // destination: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // method: "<string>",
    // source_type: "<string>",
    // statement_descriptor: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
