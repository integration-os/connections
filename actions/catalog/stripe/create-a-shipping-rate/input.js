const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    display_name: "<string>", // Required

    // delivery_estimate: {
    //     maximum: { unit: "business_day", value: 0 },
    //     minimum: { unit: "business_day", value: 0 }
    //   },
    // expand: ["string"],
    // fixed_amount: {
    //     amount: 0,
    //     currency: "string",
    //     currency_options: {
    //       property1: { amount: 0, tax_behavior: "exclusive" },
    //       property2: { amount: 0, tax_behavior: "exclusive" }
    //     }
    //   },
    // metadata: { property1: "string", property2: "string" },
    // tax_behavior: "<string>",
    // tax_code: "<string>",
    // type: "<string>",
    // delivery_estimateMaximumUnit: "<string>",
    // delivery_estimateMaximumValue: "<integer>",
    // delivery_estimateMinimumUnit: "<string>",
    // delivery_estimateMinimumValue: "<integer>",
    // expand0: "<string>",
    // expand1: "<string>",
    // fixed_amountAmount: "<integer>",
    // fixed_amountCurrency: "<string>",
    // fixed_amountCurrency_options: "<object>",
  };
};
