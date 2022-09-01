const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required

    // amount: "<integer>",
    // charge: "<string>",
    // currency: "<string>",
    // customer: "<string>",
    // expand: ["string"],
    // instructions_email: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // origin: "<string>",
    // payment_intent: "<string>",
    // reason: "<string>",
    // refund_application_fee: "<boolean>",
    // reverse_transfer: "<boolean>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
