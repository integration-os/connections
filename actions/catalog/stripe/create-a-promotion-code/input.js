const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    coupon: "<string>", // Required

    // active: "<boolean>",
    // code: "<string>",
    // customer: "<string>",
    // expand: ["string"],
    // expires_at: "<unix-time>",
    // max_redemptions: "<integer>",
    // metadata: { property1: "string", property2: "string" },
    // restrictions: {
    //     currency_options: { property1: { minimum_amount: 0 }, property2: { minimum_amount: 0 } },
    //     first_time_transaction: true,
    //     minimum_amount: 0,
    //     minimum_amount_currency: "string"
    //   },
    // expand0: "<string>",
    // expand1: "<string>",
    // restrictionsCurrency_options: "<object>",
    // restrictionsFirst_time_transaction: "<boolean>",
    // restrictionsMinimum_amount: "<integer>",
    // restrictionsMinimum_amount_currency: "<string>",
  };
};
