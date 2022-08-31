const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    charge: "string", // Required

    // amount: 0,
    // currency: "string",
    // customer: "string",
    // expand: ["string"],
    // instructions_email: "string",
    // metadata: { property1: "string", property2: "string" },
    // origin: "customer_balance",
    // payment_intent: "string",
    // reason: "duplicate",
    // refund_application_fee: true,
    // reverse_transfer: true,
  };
};
