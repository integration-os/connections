const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    account: "string", // Required
    reason: "string", // Required

    // expand: ["string"],
  };
};
