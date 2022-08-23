const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "string", // Required

    // alipay_account: "<string>",
    // bank_account: {
    //     account_holder_name: "string",
    //     account_holder_type: "company",
    //     account_number: "string",
    //     country: "string",
    //     currency: "string",
    //     object: "bank_account",
    //     routing_number: "string"
    //   },
    // card: {
    //     address_city: "string",
    //     address_country: "string",
    //     address_line1: "string",
    //     address_line2: "string",
    //     address_state: "string",
    //     address_zip: "string",
    //     cvc: "string",
    //     exp_month: 0,
    //     exp_year: 0,
    //     metadata: { property1: "string", property2: "string" },
    //     name: "string",
    //     number: "string",
    //     object: "card"
    //   },
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // source: "<string>",
    // bank_accountAccount_number: "<string>",
    // bank_accountCountry: "<string>",
    // bank_accountAccount_holder_name: "<string>",
    // bank_accountAccount_holder_type: "<string>",
    // bank_accountCurrency: "<string>",
    // bank_accountObject: "<string>",
    // bank_accountRouting_number: "<string>",
    // cardExp_month: "<integer>",
    // cardExp_year: "<integer>",
    // cardNumber: "<string>",
    // cardAddress_city: "<string>",
    // cardAddress_country: "<string>",
    // cardAddress_line1: "<string>",
    // cardAddress_line2: "<string>",
    // cardAddress_state: "<string>",
    // cardAddress_zip: "<string>",
    // cardCvc: "<string>",
    // cardMetadata: "<object>",
    // cardName: "<string>",
    // cardObject: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
