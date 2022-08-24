const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    intent: "string", // Required
    amount: "<integer>", // Required

    // application_fee_amount: "<integer>",
    // description: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // transfer_data: { amount: 0 },
    // expand0: "<string>",
    // expand1: "<string>",
    // transfer_dataAmount: "<integer>",
  };
};
