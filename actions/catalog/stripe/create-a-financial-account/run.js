const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    supported_currencies,
    expand,
    features,
    metadata,
    platform_restrictions,
    supported_currencies0,
    supported_currencies1,
    expand0,
    expand1,
    featuresCard_issuingRequested,
    featuresDeposit_insuranceRequested,
    featuresFinancial_addressesAbaRequested,
    featuresInbound_transfersAchRequested,
    featuresIntra_stripe_flowsRequested,
    featuresOutbound_paymentsAchRequested,
    featuresOutbound_paymentsUs_domestic_wireRequested,
    featuresOutbound_transfersAchRequested,
    featuresOutbound_transfersUs_domestic_wireRequested,
    platform_restrictionsInbound_flows,
    platform_restrictionsOutbound_flows,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/treasury/financial_accounts",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        supported_currencies,
        ...(expand ? { expand } : {}),
        ...(features ? { features } : {}),
        ...(metadata ? { metadata } : {}),
        ...(platform_restrictions ? { platform_restrictions } : {}),
        ...(supported_currencies0 ? { "supported_currencies[0]": supported_currencies0 } : {}),
        ...(supported_currencies1 ? { "supported_currencies[1]": supported_currencies1 } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(featuresCard_issuingRequested
          ? { "features[card_issuing][requested]": featuresCard_issuingRequested }
          : {}),
        ...(featuresDeposit_insuranceRequested
          ? { "features[deposit_insurance][requested]": featuresDeposit_insuranceRequested }
          : {}),
        ...(featuresFinancial_addressesAbaRequested
          ? {
              "features[financial_addresses][aba][requested]":
                featuresFinancial_addressesAbaRequested,
            }
          : {}),
        ...(featuresInbound_transfersAchRequested
          ? { "features[inbound_transfers][ach][requested]": featuresInbound_transfersAchRequested }
          : {}),
        ...(featuresIntra_stripe_flowsRequested
          ? { "features[intra_stripe_flows][requested]": featuresIntra_stripe_flowsRequested }
          : {}),
        ...(featuresOutbound_paymentsAchRequested
          ? { "features[outbound_payments][ach][requested]": featuresOutbound_paymentsAchRequested }
          : {}),
        ...(featuresOutbound_paymentsUs_domestic_wireRequested
          ? {
              "features[outbound_payments][us_domestic_wire][requested]":
                featuresOutbound_paymentsUs_domestic_wireRequested,
            }
          : {}),
        ...(featuresOutbound_transfersAchRequested
          ? {
              "features[outbound_transfers][ach][requested]":
                featuresOutbound_transfersAchRequested,
            }
          : {}),
        ...(featuresOutbound_transfersUs_domestic_wireRequested
          ? {
              "features[outbound_transfers][us_domestic_wire][requested]":
                featuresOutbound_transfersUs_domestic_wireRequested,
            }
          : {}),
        ...(platform_restrictionsInbound_flows
          ? { "platform_restrictions[inbound_flows]": platform_restrictionsInbound_flows }
          : {}),
        ...(platform_restrictionsOutbound_flows
          ? { "platform_restrictions[outbound_flows]": platform_restrictionsOutbound_flows }
          : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, supported_currencies }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_SUPPORTED_CURRENCIES:
      "A valid supported_currencies field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof supported_currencies !== "object")
    throw new Error(ERRORS.INVALID_SUPPORTED_CURRENCIES);
};
