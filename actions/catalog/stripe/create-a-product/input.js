const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    name: "<string>", // Required

    // active: "<boolean>",
    // default_price_data: {
    //     currency: "string",
    //     currency_options: {
    //       property1: {
    //         custom_unit_amount: { enabled: true, maximum: 0, minimum: 0, preset: 0 },
    //         tax_behavior: "exclusive",
    //         tiers: [
    //           {
    //             flat_amount: 0,
    //             flat_amount_decimal: "string",
    //             unit_amount: 0,
    //             unit_amount_decimal: "string",
    //             up_to: "inf"
    //           }
    //         ],
    //         unit_amount: 0,
    //         unit_amount_decimal: "string"
    //       },
    //       property2: {
    //         custom_unit_amount: { enabled: true, maximum: 0, minimum: 0, preset: 0 },
    //         tax_behavior: "exclusive",
    //         tiers: [
    //           {
    //             flat_amount: 0,
    //             flat_amount_decimal: "string",
    //             unit_amount: 0,
    //             unit_amount_decimal: "string",
    //             up_to: "inf"
    //           }
    //         ],
    //         unit_amount: 0,
    //         unit_amount_decimal: "string"
    //       }
    //     },
    //     recurring: { interval: "day", interval_count: 0 },
    //     tax_behavior: "exclusive",
    //     unit_amount: 0,
    //     unit_amount_decimal: "string"
    //   },
    // description: "<string>",
    // expand: ["string"],
    // id: "<string>",
    // images: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // package_dimensions: { height: 0, length: 0, weight: 0, width: 0 },
    // shippable: "<boolean>",
    // statement_descriptor: "<string>",
    // tax_code: "<string>",
    // unit_label: "<string>",
    // url: "<string>",
    // default_price_dataCurrency: "<string>",
    // default_price_dataCurrency_options: "<object>",
    // default_price_dataRecurringInterval: "<string>",
    // default_price_dataRecurringInterval_count: "<integer>",
    // default_price_dataTax_behavior: "<string>",
    // default_price_dataUnit_amount: "<integer>",
    // default_price_dataUnit_amount_decimal: "<decimal>",
    // expand0: "<string>",
    // expand1: "<string>",
    // images0: "<string>",
    // images1: "<string>",
    // package_dimensionsHeight: "<number>",
    // package_dimensionsLength: "<number>",
    // package_dimensionsWeight: "<number>",
    // package_dimensionsWidth: "<number>",
  };
};
