const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    currency,
    destination,
    amount,
    description,
    expand,
    metadata,
    source_transaction,
    source_type,
    transfer_group,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/transfers",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        currency,
        destination,
        ...(amount ? { amount } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(source_transaction ? { source_transaction } : {}),
        ...(source_type ? { source_type } : {}),
        ...(transfer_group ? { transfer_group } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, currency, destination }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CURRENCY: "A valid currency field (string) was not provided in the input.",
    INVALID_DESTINATION: "A valid destination field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
  if (typeof destination !== "string") throw new Error(ERRORS.INVALID_DESTINATION);
};
