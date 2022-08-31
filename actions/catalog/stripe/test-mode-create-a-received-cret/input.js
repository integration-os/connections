const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    amount: "<integer>", // Required
    currency: "<string>", // Required
    financial_account: "<string>", // Required
    network: "<string>", // Required

    // description: "<string>",
    // expand: ["string"],
    // initiating_payment_method_details: {
    //     type: "us_bank_account",
    //     us_bank_account: {
    //       account_holder_name: "string",
    //       account_number: "string",
    //       routing_number: "string"
    //     }
    //   },
    // expand0: "<string>",
    // expand1: "<string>",
    // initiating_payment_method_detailsType: "<string>",
    // initiating_payment_method_detailsUs_bank_accountAccount_holder_name: "<string>",
    // initiating_payment_method_detailsUs_bank_accountAccount_number: "<string>",
    // initiating_payment_method_detailsUs_bank_accountRouting_number: "<string>",
  };
};
