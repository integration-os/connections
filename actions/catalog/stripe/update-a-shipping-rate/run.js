const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    shipping_rate_token,
    active,
    expand,
    fixed_amount,
    metadata,
    tax_behavior,
    expand0,
    expand1,
    fixed_amountCurrency_options,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/shipping_rates/${shipping_rate_token}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(active ? { active } : {}),
        ...(expand ? { expand } : {}),
        ...(fixed_amount ? { fixed_amount } : {}),
        ...(metadata ? { metadata } : {}),
        ...(tax_behavior ? { tax_behavior } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(fixed_amountCurrency_options
          ? { "fixed_amount[currency_options]": fixed_amountCurrency_options }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, shipping_rate_token }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_SHIPPING_RATE_TOKEN:
      "A valid shipping_rate_token field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof shipping_rate_token !== "string") throw new Error(ERRORS.INVALID_SHIPPING_RATE_TOKEN);
};
