const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    address,
    display_name,
    configuration_overrides,
    expand,
    metadata,
    addressCountry,
    addressCity,
    addressLine1,
    addressLine2,
    addressPostal_code,
    addressState,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/terminal/locations",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        address,
        display_name,
        ...(configuration_overrides ? { configuration_overrides } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(addressCountry ? { "address[country]": addressCountry } : {}),
        ...(addressCity ? { "address[city]": addressCity } : {}),
        ...(addressLine1 ? { "address[line1]": addressLine1 } : {}),
        ...(addressLine2 ? { "address[line2]": addressLine2 } : {}),
        ...(addressPostal_code ? { "address[postal_code]": addressPostal_code } : {}),
        ...(addressState ? { "address[state]": addressState } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, address, display_name }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_ADDRESS: "A valid address field (object) was not provided in the input.",
    INVALID_DISPLAY_NAME: "A valid display_name field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof address !== "object") throw new Error(ERRORS.INVALID_ADDRESS);
  if (typeof display_name !== "string") throw new Error(ERRORS.INVALID_DISPLAY_NAME);
};
