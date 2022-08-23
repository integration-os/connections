const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    shipping_rate_token: "string", // Required

    // active: "<boolean>",
    // expand: ["string"],
    // fixed_amount: {
    //     currency_options: {
    //       property1: { amount: 0, tax_behavior: "exclusive" },
    //       property2: { amount: 0, tax_behavior: "exclusive" }
    //     }
    //   },
    // metadata: { property1: "string", property2: "string" },
    // tax_behavior: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // fixed_amountCurrency_options: "<object>",
  };
};
