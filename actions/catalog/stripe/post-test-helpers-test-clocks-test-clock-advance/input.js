const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    test_clock: "string", // Required
    frozen_time: 0, // Required

    // expand: ["string"],
  };
};
