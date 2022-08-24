const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    card,
    cancellation_reason,
    expand,
    metadata,
    pin,
    spending_controls,
    status,
    expand0,
    expand1,
    pinEncrypted_number,
    spending_controlsAllowed_categories0,
    spending_controlsAllowed_categories1,
    spending_controlsBlocked_categories0,
    spending_controlsBlocked_categories1,
    spending_controlsSpending_limits0Amount,
    spending_controlsSpending_limits0Interval,
    spending_controlsSpending_limits0Categories0,
    spending_controlsSpending_limits0Categories1,
    spending_controlsSpending_limits1Amount,
    spending_controlsSpending_limits1Interval,
    spending_controlsSpending_limits1Categories0,
    spending_controlsSpending_limits1Categories1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/issuing/cards/${card}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(cancellation_reason ? { cancellation_reason } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(pin ? { pin } : {}),
        ...(spending_controls ? { spending_controls } : {}),
        ...(status ? { status } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(pinEncrypted_number ? { "pin[encrypted_number]": pinEncrypted_number } : {}),
        ...(spending_controlsAllowed_categories0
          ? { "spending_controls[allowed_categories][0]": spending_controlsAllowed_categories0 }
          : {}),
        ...(spending_controlsAllowed_categories1
          ? { "spending_controls[allowed_categories][1]": spending_controlsAllowed_categories1 }
          : {}),
        ...(spending_controlsBlocked_categories0
          ? { "spending_controls[blocked_categories][0]": spending_controlsBlocked_categories0 }
          : {}),
        ...(spending_controlsBlocked_categories1
          ? { "spending_controls[blocked_categories][1]": spending_controlsBlocked_categories1 }
          : {}),
        ...(spending_controlsSpending_limits0Amount
          ? {
              "spending_controls[spending_limits][0][amount]":
                spending_controlsSpending_limits0Amount,
            }
          : {}),
        ...(spending_controlsSpending_limits0Interval
          ? {
              "spending_controls[spending_limits][0][interval]":
                spending_controlsSpending_limits0Interval,
            }
          : {}),
        ...(spending_controlsSpending_limits0Categories0
          ? {
              "spending_controls[spending_limits][0][categories][0]":
                spending_controlsSpending_limits0Categories0,
            }
          : {}),
        ...(spending_controlsSpending_limits0Categories1
          ? {
              "spending_controls[spending_limits][0][categories][1]":
                spending_controlsSpending_limits0Categories1,
            }
          : {}),
        ...(spending_controlsSpending_limits1Amount
          ? {
              "spending_controls[spending_limits][1][amount]":
                spending_controlsSpending_limits1Amount,
            }
          : {}),
        ...(spending_controlsSpending_limits1Interval
          ? {
              "spending_controls[spending_limits][1][interval]":
                spending_controlsSpending_limits1Interval,
            }
          : {}),
        ...(spending_controlsSpending_limits1Categories0
          ? {
              "spending_controls[spending_limits][1][categories][0]":
                spending_controlsSpending_limits1Categories0,
            }
          : {}),
        ...(spending_controlsSpending_limits1Categories1
          ? {
              "spending_controls[spending_limits][1][categories][1]":
                spending_controlsSpending_limits1Categories1,
            }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, card }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CARD: "A valid card field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof card !== "string") throw new Error(ERRORS.INVALID_CARD);
};
