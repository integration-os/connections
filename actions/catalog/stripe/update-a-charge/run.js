const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    charge,
    customer,
    description,
    expand,
    fraud_details,
    metadata,
    receipt_email,
    shipping,
    transfer_group,
    expand0,
    expand1,
    fraud_detailsUser_report,
    shippingAddressCity,
    shippingAddressCountry,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingAddressPostal_code,
    shippingAddressState,
    shippingName,
    shippingCarrier,
    shippingPhone,
    shippingTracking_number,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/charges/${charge}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(customer ? { customer } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(fraud_details ? { fraud_details } : {}),
        ...(metadata ? { metadata } : {}),
        ...(receipt_email ? { receipt_email } : {}),
        ...(shipping ? { shipping } : {}),
        ...(transfer_group ? { transfer_group } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(fraud_detailsUser_report
          ? { "fraud_details[user_report]": fraud_detailsUser_report }
          : {}),
        ...(shippingAddressCity ? { "shipping[address][city]": shippingAddressCity } : {}),
        ...(shippingAddressCountry ? { "shipping[address][country]": shippingAddressCountry } : {}),
        ...(shippingAddressLine1 ? { "shipping[address][line1]": shippingAddressLine1 } : {}),
        ...(shippingAddressLine2 ? { "shipping[address][line2]": shippingAddressLine2 } : {}),
        ...(shippingAddressPostal_code
          ? { "shipping[address][postal_code]": shippingAddressPostal_code }
          : {}),
        ...(shippingAddressState ? { "shipping[address][state]": shippingAddressState } : {}),
        ...(shippingName ? { "shipping[name]": shippingName } : {}),
        ...(shippingCarrier ? { "shipping[carrier]": shippingCarrier } : {}),
        ...(shippingPhone ? { "shipping[phone]": shippingPhone } : {}),
        ...(shippingTracking_number
          ? { "shipping[tracking_number]": shippingTracking_number }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, charge }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CHARGE: "A valid charge field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof charge !== "string") throw new Error(ERRORS.INVALID_CHARGE);
};
