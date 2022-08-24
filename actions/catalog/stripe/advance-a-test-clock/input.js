const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    test_clock: "string", // Required
    frozen_time: "<unix-time>", // Required

    // expand: ["string"],
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
