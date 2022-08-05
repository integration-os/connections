const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    customer: "string", // Required
    id: "string", // Required

    // amounts: [0],
    // expand: ["string"],
  };
};
