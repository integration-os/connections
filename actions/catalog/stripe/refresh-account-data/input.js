const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    account: "string", // Required
    features: ["balance"], // Required

    // expand: ["string"],
    // features0: "<string>",
    // features1: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
