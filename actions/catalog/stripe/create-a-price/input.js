const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    currency: "<string>", // Required

    // active: "<boolean>",
    // billing_scheme: "<string>",
    // currency_options: {
    //     property1: {
    //       custom_unit_amount: { enabled: true, maximum: 0, minimum: 0, preset: 0 },
    //       tax_behavior: "exclusive",
    //       tiers: [
    //         {
    //           flat_amount: 0,
    //           flat_amount_decimal: "string",
    //           unit_amount: 0,
    //           unit_amount_decimal: "string",
    //           up_to: "inf"
    //         }
    //       ],
    //       unit_amount: 0,
    //       unit_amount_decimal: "string"
    //     },
    //     property2: {
    //       custom_unit_amount: { enabled: true, maximum: 0, minimum: 0, preset: 0 },
    //       tax_behavior: "exclusive",
    //       tiers: [
    //         {
    //           flat_amount: 0,
    //           flat_amount_decimal: "string",
    //           unit_amount: 0,
    //           unit_amount_decimal: "string",
    //           up_to: "inf"
    //         }
    //       ],
    //       unit_amount: 0,
    //       unit_amount_decimal: "string"
    //     }
    //   },
    // custom_unit_amount: { enabled: true, maximum: 0, minimum: 0, preset: 0 },
    // expand: ["string"],
    // lookup_key: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // nickname: "<string>",
    // product: "<string>",
    // product_data: {
    //     active: true,
    //     id: "string",
    //     metadata: { property1: "string", property2: "string" },
    //     name: "string",
    //     statement_descriptor: "string",
    //     tax_code: "string",
    //     unit_label: "string"
    //   },
    // recurring: {
    //     aggregate_usage: "last_during_period",
    //     interval: "day",
    //     interval_count: 0,
    //     usage_type: "licensed"
    //   },
    // tax_behavior: "<string>",
    // tiers: [
    //     {
    //       flat_amount: 0,
    //       flat_amount_decimal: "string",
    //       unit_amount: 0,
    //       unit_amount_decimal: "string",
    //       up_to: "inf"
    //     }
    //   ],
    // tiers_mode: "<string>",
    // transfer_lookup_key: "<boolean>",
    // transform_quantity: { divide_by: 0, round: "down" },
    // unit_amount: "<integer>",
    // unit_amount_decimal: "<decimal>",
    // custom_unit_amountEnabled: "<boolean>",
    // custom_unit_amountMaximum: "<integer>",
    // custom_unit_amountMinimum: "<integer>",
    // custom_unit_amountPreset: "<integer>",
    // expand0: "<string>",
    // expand1: "<string>",
    // product_dataName: "<string>",
    // product_dataActive: "<boolean>",
    // product_dataId: "<string>",
    // product_dataMetadata: "<object>",
    // product_dataStatement_descriptor: "<string>",
    // product_dataTax_code: "<string>",
    // product_dataUnit_label: "<string>",
    // recurringInterval: "<string>",
    // recurringAggregate_usage: "<string>",
    // recurringInterval_count: "<integer>",
    // recurringUsage_type: "<string>",
    // tiers0Up_to: "<string>",
    // tiers0Flat_amount: "<integer>",
    // tiers0Flat_amount_decimal: "<decimal>",
    // tiers0Unit_amount: "<integer>",
    // tiers0Unit_amount_decimal: "<decimal>",
    // tiers1Up_to: "<string>",
    // tiers1Flat_amount: "<integer>",
    // tiers1Flat_amount_decimal: "<decimal>",
    // tiers1Unit_amount: "<integer>",
    // tiers1Unit_amount_decimal: "<decimal>",
    // transform_quantityDivide_by: "<integer>",
    // transform_quantityRound: "<string>",
  };
};
