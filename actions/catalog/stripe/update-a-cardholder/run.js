const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    cardholder,
    billing,
    company,
    email,
    expand,
    individual,
    metadata,
    phone_number,
    spending_controls,
    status,
    billingAddressCity,
    billingAddressCountry,
    billingAddressLine1,
    billingAddressPostal_code,
    billingAddressLine2,
    billingAddressState,
    companyTax_id,
    expand0,
    expand1,
    individualFirst_name,
    individualLast_name,
    individualDobDay,
    individualDobMonth,
    individualDobYear,
    individualVerificationDocumentBack,
    individualVerificationDocumentFront,
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
    spending_controlsSpending_limits_currency,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/issuing/cardholders/${cardholder}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(billing ? { billing } : {}),
        ...(company ? { company } : {}),
        ...(email ? { email } : {}),
        ...(expand ? { expand } : {}),
        ...(individual ? { individual } : {}),
        ...(metadata ? { metadata } : {}),
        ...(phone_number ? { phone_number } : {}),
        ...(spending_controls ? { spending_controls } : {}),
        ...(status ? { status } : {}),
        ...(billingAddressCity ? { "billing[address][city]": billingAddressCity } : {}),
        ...(billingAddressCountry ? { "billing[address][country]": billingAddressCountry } : {}),
        ...(billingAddressLine1 ? { "billing[address][line1]": billingAddressLine1 } : {}),
        ...(billingAddressPostal_code
          ? { "billing[address][postal_code]": billingAddressPostal_code }
          : {}),
        ...(billingAddressLine2 ? { "billing[address][line2]": billingAddressLine2 } : {}),
        ...(billingAddressState ? { "billing[address][state]": billingAddressState } : {}),
        ...(companyTax_id ? { "company[tax_id]": companyTax_id } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(individualFirst_name ? { "individual[first_name]": individualFirst_name } : {}),
        ...(individualLast_name ? { "individual[last_name]": individualLast_name } : {}),
        ...(individualDobDay ? { "individual[dob][day]": individualDobDay } : {}),
        ...(individualDobMonth ? { "individual[dob][month]": individualDobMonth } : {}),
        ...(individualDobYear ? { "individual[dob][year]": individualDobYear } : {}),
        ...(individualVerificationDocumentBack
          ? { "individual[verification][document][back]": individualVerificationDocumentBack }
          : {}),
        ...(individualVerificationDocumentFront
          ? { "individual[verification][document][front]": individualVerificationDocumentFront }
          : {}),
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
        ...(spending_controlsSpending_limits_currency
          ? {
              "spending_controls[spending_limits_currency]":
                spending_controlsSpending_limits_currency,
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, cardholder }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CARDHOLDER: "A valid cardholder field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof cardholder !== "string") throw new Error(ERRORS.INVALID_CARDHOLDER);
};
