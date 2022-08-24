const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    amount: "<integer>", // Required
    currency: "<string>", // Required
    destination_payment_method: "<string>", // Required
    financial_account: "<string>", // Required

    // description: "<string>",
    // destination_payment_method_options: { us_bank_account: { network: "ach" } },
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // statement_descriptor: "<string>",
    // destination_payment_method_optionsUs_bank_accountNetwork: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
