const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    dispute: "string", // Required

    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
  };
};
