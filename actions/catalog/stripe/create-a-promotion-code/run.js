const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    coupon,
    active,
    code,
    customer,
    expand,
    expires_at,
    max_redemptions,
    metadata,
    restrictions,
    expand0,
    expand1,
    restrictionsCurrency_options,
    restrictionsFirst_time_transaction,
    restrictionsMinimum_amount,
    restrictionsMinimum_amount_currency,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/promotion_codes",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        coupon,
        ...(active ? { active } : {}),
        ...(code ? { code } : {}),
        ...(customer ? { customer } : {}),
        ...(expand ? { expand } : {}),
        ...(expires_at ? { expires_at } : {}),
        ...(max_redemptions ? { max_redemptions } : {}),
        ...(metadata ? { metadata } : {}),
        ...(restrictions ? { restrictions } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(restrictionsCurrency_options
          ? { "restrictions[currency_options]": restrictionsCurrency_options }
          : {}),
        ...(restrictionsFirst_time_transaction
          ? { "restrictions[first_time_transaction]": restrictionsFirst_time_transaction }
          : {}),
        ...(restrictionsMinimum_amount
          ? { "restrictions[minimum_amount]": restrictionsMinimum_amount }
          : {}),
        ...(restrictionsMinimum_amount_currency
          ? { "restrictions[minimum_amount_currency]": restrictionsMinimum_amount_currency }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, coupon }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_COUPON: "A valid coupon field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof coupon !== "string") throw new Error(ERRORS.INVALID_COUPON);
};
