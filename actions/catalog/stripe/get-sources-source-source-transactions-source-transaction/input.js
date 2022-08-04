const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    source: "string", // Required
    source_transaction: "string", // Required

    // expand: ["string"],
  };
};
