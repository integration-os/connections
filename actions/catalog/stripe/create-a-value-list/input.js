const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    alias: "<string>", // Required
    name: "<string>", // Required

    // expand: ["string"],
    // item_type: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
