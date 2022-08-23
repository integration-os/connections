const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "<string>", // Required

    // amount: "<integer>",
    // currency: "<string>",
    // description: "<string>",
    // discountable: "<boolean>",
    // discounts: [{ coupon: "string", discount: "string" }],
    // expand: ["string"],
    // invoice: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // period: { end: 0, start: 0 },
    // price: "<string>",
    // price_data: {
    //     currency: "string",
    //     product: "string",
    //     tax_behavior: "exclusive",
    //     unit_amount: 0,
    //     unit_amount_decimal: "string"
    //   },
    // quantity: "<integer>",
    // subscription: "<string>",
    // tax_rates: ["string"],
    // unit_amount: "<integer>",
    // unit_amount_decimal: "<decimal>",
    // discounts0Coupon: "<string>",
    // discounts0Discount: "<string>",
    // discounts1Coupon: "<string>",
    // discounts1Discount: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // periodEnd: "<unix-time>",
    // periodStart: "<unix-time>",
    // price_dataCurrency: "<string>",
    // price_dataProduct: "<string>",
    // price_dataTax_behavior: "<string>",
    // price_dataUnit_amount: "<integer>",
    // price_dataUnit_amount_decimal: "<decimal>",
    // tax_rates0: "<string>",
    // tax_rates1: "<string>",
  };
};
