const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    source: "string", // Required

    // client_secret: "string",
    // expand: ["string"],
  };
};
