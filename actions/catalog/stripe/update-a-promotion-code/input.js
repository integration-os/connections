const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    promotion_code: "string", // Required

    // active: "<boolean>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // restrictions: {
    //     currency_options: { property1: { minimum_amount: 0 }, property2: { minimum_amount: 0 } }
    //   },
    // expand0: "<string>",
    // expand1: "<string>",
    // restrictionsCurrency_options: "<object>",
  };
};
