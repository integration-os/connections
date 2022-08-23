const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    reader: "string", // Required
    payment_intent: "<string>", // Required

    // expand: ["string"],
    // process_config: { skip_tipping: true },
    // expand0: "<string>",
    // expand1: "<string>",
    // process_configSkip_tipping: "<boolean>",
  };
};
