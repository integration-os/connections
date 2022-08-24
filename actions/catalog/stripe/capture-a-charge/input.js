const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    charge: "string", // Required

    // amount: "<integer>",
    // application_fee: "<integer>",
    // application_fee_amount: "<integer>",
    // expand: ["string"],
    // receipt_email: "<string>",
    // statement_descriptor: "<string>",
    // statement_descriptor_suffix: "<string>",
    // transfer_data: { amount: 0 },
    // transfer_group: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // transfer_dataAmount: "<integer>",
  };
};
