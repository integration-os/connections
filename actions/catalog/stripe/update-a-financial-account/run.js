const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    financial_account,
    expand,
    features,
    metadata,
    platform_restrictions,
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
      url: `https://api.stripe.com/v1/treasury/financial_accounts/${financial_account}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(expand ? { expand } : {}),
        ...(features ? { features } : {}),
        ...(metadata ? { metadata } : {}),
        ...(platform_restrictions ? { platform_restrictions } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, financial_account }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_FINANCIAL_ACCOUNT:
      "A valid financial_account field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof financial_account !== "string") throw new Error(ERRORS.INVALID_FINANCIAL_ACCOUNT);
};
