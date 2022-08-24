const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    reader: "string", // Required
    customer_consent_collected: "<boolean>", // Required
    setup_intent: "<string>", // Required

    // expand: ["string"],
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
