const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    intent: "string", // Required

    // amount_to_capture: "<integer>",
    // application_fee_amount: "<integer>",
    // expand: ["string"],
    // statement_descriptor: "<string>",
    // statement_descriptor_suffix: "<string>",
    // transfer_data: { amount: 0 },
    // expand0: "<string>",
    // expand1: "<string>",
    // transfer_dataAmount: "<integer>",
  };
};
