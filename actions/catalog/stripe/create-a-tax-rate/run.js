const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    display_name,
    inclusive,
    percentage,
    active,
    country,
    description,
    expand,
    jurisdiction,
    metadata,
    state,
    tax_type,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/tax_rates",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        display_name,
        inclusive,
        percentage,
        ...(active ? { active } : {}),
        ...(country ? { country } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(jurisdiction ? { jurisdiction } : {}),
        ...(metadata ? { metadata } : {}),
        ...(state ? { state } : {}),
        ...(tax_type ? { tax_type } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, display_name, inclusive, percentage }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_DISPLAY_NAME: "A valid display_name field (string) was not provided in the input.",
    INVALID_INCLUSIVE: "A valid inclusive field (string) was not provided in the input.",
    INVALID_PERCENTAGE: "A valid percentage field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof display_name !== "string") throw new Error(ERRORS.INVALID_DISPLAY_NAME);
  if (typeof inclusive !== "string") throw new Error(ERRORS.INVALID_INCLUSIVE);
  if (typeof percentage !== "string") throw new Error(ERRORS.INVALID_PERCENTAGE);
};
