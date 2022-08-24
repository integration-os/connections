const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    coupon: "string", // Required

    // currency_options: { property1: { amount_off: 0 }, property2: { amount_off: 0 } },
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // name: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
