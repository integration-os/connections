const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    subscription_item,
    quantity,
    action,
    expand,
    timestamp,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/subscription_items/${subscription_item}/usage_records`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        quantity,
        ...(action ? { action } : {}),
        ...(expand ? { expand } : {}),
        ...(timestamp ? { timestamp } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, subscription_item, quantity }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_SUBSCRIPTION_ITEM:
      "A valid subscription_item field (string) was not provided in the input.",
    INVALID_QUANTITY: "A valid quantity field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof subscription_item !== "string") throw new Error(ERRORS.INVALID_SUBSCRIPTION_ITEM);
  if (typeof quantity !== "string") throw new Error(ERRORS.INVALID_QUANTITY);
};
