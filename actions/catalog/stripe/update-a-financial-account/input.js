const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    financial_account: "string", // Required

    // expand: ["string"],
    // features: {
    //     card_issuing: { requested: true },
    //     deposit_insurance: { requested: true },
    //     financial_addresses: { aba: { requested: true } },
    //     inbound_transfers: { ach: { requested: true } },
    //     intra_stripe_flows: { requested: true },
    //     outbound_payments: { ach: { requested: true }, us_domestic_wire: { requested: true } },
    //     outbound_transfers: { ach: { requested: true }, us_domestic_wire: { requested: true } }
    //   },
    // metadata: { property1: "string", property2: "string" },
    // platform_restrictions: { inbound_flows: "restricted", outbound_flows: "restricted" },
    // expand0: "<string>",
    // expand1: "<string>",
    // featuresCard_issuingRequested: "<boolean>",
    // featuresDeposit_insuranceRequested: "<boolean>",
    // featuresFinancial_addressesAbaRequested: "<boolean>",
    // featuresInbound_transfersAchRequested: "<boolean>",
    // featuresIntra_stripe_flowsRequested: "<boolean>",
    // featuresOutbound_paymentsAchRequested: "<boolean>",
    // featuresOutbound_paymentsUs_domestic_wireRequested: "<boolean>",
    // featuresOutbound_transfersAchRequested: "<boolean>",
    // featuresOutbound_transfersUs_domestic_wireRequested: "<boolean>",
    // platform_restrictionsInbound_flows: "<string>",
    // platform_restrictionsOutbound_flows: "<string>",
  };
};
