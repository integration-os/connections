const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    account: "string", // Required

    // bank_account: {
    //     account_holder_name: "string",
    //     account_holder_type: "company",
    //     account_number: "string",
    //     account_type: "checking",
    //     country: "string",
    //     currency: "string",
    //     object: "bank_account",
    //     routing_number: "string"
    //   },
    // default_for_currency: "<boolean>",
    // expand: ["string"],
    // external_account: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // bank_accountAccount_number: "<string>",
    // bank_accountCountry: "<string>",
    // bank_accountAccount_holder_name: "<string>",
    // bank_accountAccount_holder_type: "<string>",
    // bank_accountAccount_type: "<string>",
    // bank_accountCurrency: "<string>",
    // bank_accountObject: "<string>",
    // bank_accountRouting_number: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
