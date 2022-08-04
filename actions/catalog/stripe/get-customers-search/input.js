const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    query: "string", // Required

    // expand: ["string"],
    // limit: 0,
    // page: "string",
  };
};
