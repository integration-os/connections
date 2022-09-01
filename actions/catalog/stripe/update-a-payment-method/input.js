const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    payment_method: "string", // Required

    // billing_details: {
    //     address: {
    //       city: "string",
    //       country: "string",
    //       line1: "string",
    //       line2: "string",
    //       postal_code: "string",
    //       state: "string"
    //     },
    //     email: "string",
    //     name: "string",
    //     phone: "string"
    //   },
    // card: { exp_month: 0, exp_year: 0 },
    // expand: ["string"],
    // link: {},
    // metadata: { property1: "string", property2: "string" },
    // us_bank_account: { account_holder_type: "company" },
    // billing_detailsAddressCity: "<string>",
    // billing_detailsAddressCountry: "<string>",
    // billing_detailsAddressLine1: "<string>",
    // billing_detailsAddressLine2: "<string>",
    // billing_detailsAddressPostal_code: "<string>",
    // billing_detailsAddressState: "<string>",
    // billing_detailsEmail: "<string>",
    // billing_detailsName: "<string>",
    // billing_detailsPhone: "<string>",
    // cardExp_month: "<integer>",
    // cardExp_year: "<integer>",
    // expand0: "<string>",
    // expand1: "<string>",
    // us_bank_accountAccount_holder_type: "<string>",
  };
};
