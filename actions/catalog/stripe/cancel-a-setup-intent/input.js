const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    intent: "string", // Required

    // cancellation_reason: "<string>",
    // expand: ["string"],
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
