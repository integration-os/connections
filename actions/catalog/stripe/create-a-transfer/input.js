const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    currency: "<string>", // Required
    destination: "<string>", // Required

    // amount: "<integer>",
    // description: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // source_transaction: "<string>",
    // source_type: "<string>",
    // transfer_group: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
