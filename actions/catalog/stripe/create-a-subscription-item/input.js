const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    subscription: "<string>", // Required

    // billing_thresholds: { usage_gte: 0 },
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // payment_behavior: "<string>",
    // price: "<string>",
    // price_data: {
    //     currency: "string",
    //     product: "string",
    //     recurring: { interval: "day", interval_count: 0 },
    //     tax_behavior: "exclusive",
    //     unit_amount: 0,
    //     unit_amount_decimal: "string"
    //   },
    // proration_behavior: "<string>",
    // proration_date: "<unix-time>",
    // quantity: "<integer>",
    // tax_rates: ["string"],
    // billing_thresholdsUsage_gte: "<integer>",
    // expand0: "<string>",
    // expand1: "<string>",
    // price_dataCurrency: "<string>",
    // price_dataProduct: "<string>",
    // price_dataRecurringInterval: "<string>",
    // price_dataRecurringInterval_count: "<integer>",
    // price_dataTax_behavior: "<string>",
    // price_dataUnit_amount: "<integer>",
    // price_dataUnit_amount_decimal: "<decimal>",
    // tax_rates0: "<string>",
    // tax_rates1: "<string>",
  };
};
