const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required

    // amount_off: "<integer>",
    // applies_to: { products: ["string"] },
    // currency: "<string>",
    // currency_options: { property1: { amount_off: 0 }, property2: { amount_off: 0 } },
    // duration: "<string>",
    // duration_in_months: "<integer>",
    // expand: ["string"],
    // id: "<string>",
    // max_redemptions: "<integer>",
    // metadata: { property1: "string", property2: "string" },
    // name: "<string>",
    // percent_off: "<number>",
    // redeem_by: "<unix-time>",
    // applies_toProducts0: "<string>",
    // applies_toProducts1: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
