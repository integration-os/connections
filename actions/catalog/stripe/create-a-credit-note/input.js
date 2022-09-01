const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    invoice: "<string>", // Required

    // amount: "<integer>",
    // credit_amount: "<integer>",
    // expand: ["string"],
    // lines: [
    //     {
    //       amount: 0,
    //       description: "string",
    //       invoice_line_item: "string",
    //       quantity: 0,
    //       tax_rates: ["string"],
    //       type: "custom_line_item",
    //       unit_amount: 0,
    //       unit_amount_decimal: "string"
    //     }
    //   ],
    // memo: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // out_of_band_amount: "<integer>",
    // reason: "<string>",
    // refund: "<string>",
    // refund_amount: "<integer>",
    // expand0: "<string>",
    // expand1: "<string>",
    // lines0Type: "<string>",
    // lines0Amount: "<integer>",
    // lines0Description: "<string>",
    // lines0Invoice_line_item: "<string>",
    // lines0Quantity: "<integer>",
    // lines0Tax_rates0: "<string>",
    // lines0Tax_rates1: "<string>",
    // lines0Unit_amount: "<integer>",
    // lines0Unit_amount_decimal: "<decimal>",
    // lines1Type: "<string>",
    // lines1Amount: "<integer>",
    // lines1Description: "<string>",
    // lines1Invoice_line_item: "<string>",
    // lines1Quantity: "<integer>",
    // lines1Tax_rates0: "<string>",
    // lines1Tax_rates1: "<string>",
    // lines1Unit_amount: "<integer>",
    // lines1Unit_amount_decimal: "<decimal>",
  };
};
