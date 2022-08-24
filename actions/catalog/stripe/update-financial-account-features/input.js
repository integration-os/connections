const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    financial_account: "string", // Required

    // card_issuing: { requested: true },
    // deposit_insurance: { requested: true },
    // expand: ["string"],
    // financial_addresses: { aba: { requested: true } },
    // inbound_transfers: { ach: { requested: true } },
    // intra_stripe_flows: { requested: true },
    // outbound_payments: { ach: { requested: true }, us_domestic_wire: { requested: true } },
    // outbound_transfers: { ach: { requested: true }, us_domestic_wire: { requested: true } },
    // card_issuingRequested: "<boolean>",
    // deposit_insuranceRequested: "<boolean>",
    // expand0: "<string>",
    // expand1: "<string>",
    // financial_addressesAbaRequested: "<boolean>",
    // inbound_transfersAchRequested: "<boolean>",
    // intra_stripe_flowsRequested: "<boolean>",
    // outbound_paymentsAchRequested: "<boolean>",
    // outbound_paymentsUs_domestic_wireRequested: "<boolean>",
    // outbound_transfersAchRequested: "<boolean>",
    // outbound_transfersUs_domestic_wireRequested: "<boolean>",
  };
};
