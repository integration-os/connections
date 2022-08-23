const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    payment_method,
    billing_details,
    card,
    expand,
    link,
    metadata,
    us_bank_account,
    billing_detailsAddressCity,
    billing_detailsAddressCountry,
    billing_detailsAddressLine1,
    billing_detailsAddressLine2,
    billing_detailsAddressPostal_code,
    billing_detailsAddressState,
    billing_detailsEmail,
    billing_detailsName,
    billing_detailsPhone,
    cardExp_month,
    cardExp_year,
    expand0,
    expand1,
    us_bank_accountAccount_holder_type,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/payment_methods/${payment_method}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(billing_details ? { billing_details } : {}),
        ...(card ? { card } : {}),
        ...(expand ? { expand } : {}),
        ...(link ? { link } : {}),
        ...(metadata ? { metadata } : {}),
        ...(us_bank_account ? { us_bank_account } : {}),
        ...(billing_detailsAddressCity
          ? { "billing_details[address][city]": billing_detailsAddressCity }
          : {}),
        ...(billing_detailsAddressCountry
          ? { "billing_details[address][country]": billing_detailsAddressCountry }
          : {}),
        ...(billing_detailsAddressLine1
          ? { "billing_details[address][line1]": billing_detailsAddressLine1 }
          : {}),
        ...(billing_detailsAddressLine2
          ? { "billing_details[address][line2]": billing_detailsAddressLine2 }
          : {}),
        ...(billing_detailsAddressPostal_code
          ? { "billing_details[address][postal_code]": billing_detailsAddressPostal_code }
          : {}),
        ...(billing_detailsAddressState
          ? { "billing_details[address][state]": billing_detailsAddressState }
          : {}),
        ...(billing_detailsEmail ? { "billing_details[email]": billing_detailsEmail } : {}),
        ...(billing_detailsName ? { "billing_details[name]": billing_detailsName } : {}),
        ...(billing_detailsPhone ? { "billing_details[phone]": billing_detailsPhone } : {}),
        ...(cardExp_month ? { "card[exp_month]": cardExp_month } : {}),
        ...(cardExp_year ? { "card[exp_year]": cardExp_year } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(us_bank_accountAccount_holder_type
          ? { "us_bank_account[account_holder_type]": us_bank_accountAccount_holder_type }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, payment_method }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_PAYMENT_METHOD: "A valid payment_method field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof payment_method !== "string") throw new Error(ERRORS.INVALID_PAYMENT_METHOD);
};
