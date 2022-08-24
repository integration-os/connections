const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const { BUILDABLE_STRIPE_SECRET_KEY, customer, type, value, expand, expand0, expand1 } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/customers/${customer}/tax_ids`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        type,
        value,
        ...(expand ? { expand } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, customer, type, value }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CUSTOMER: "A valid customer field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
    INVALID_VALUE: "A valid value field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof customer !== "string") throw new Error(ERRORS.INVALID_CUSTOMER);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
  if (typeof value !== "string") throw new Error(ERRORS.INVALID_VALUE);
};
