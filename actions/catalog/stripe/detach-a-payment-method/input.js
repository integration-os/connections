const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    payment_method: "string", // Required

    // expand: ["string"],
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
