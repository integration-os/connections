const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    customer,
    alipay_account,
    bank_account,
    card,
    expand,
    metadata,
    source,
    bank_accountAccount_number,
    bank_accountCountry,
    bank_accountAccount_holder_name,
    bank_accountAccount_holder_type,
    bank_accountCurrency,
    bank_accountObject,
    bank_accountRouting_number,
    cardExp_month,
    cardExp_year,
    cardNumber,
    cardAddress_city,
    cardAddress_country,
    cardAddress_line1,
    cardAddress_line2,
    cardAddress_state,
    cardAddress_zip,
    cardCvc,
    cardMetadata,
    cardName,
    cardObject,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/customers/${customer}/sources`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(alipay_account ? { alipay_account } : {}),
        ...(bank_account ? { bank_account } : {}),
        ...(card ? { card } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(source ? { source } : {}),
        ...(bank_accountAccount_number
          ? { "bank_account[account_number]": bank_accountAccount_number }
          : {}),
        ...(bank_accountCountry ? { "bank_account[country]": bank_accountCountry } : {}),
        ...(bank_accountAccount_holder_name
          ? { "bank_account[account_holder_name]": bank_accountAccount_holder_name }
          : {}),
        ...(bank_accountAccount_holder_type
          ? { "bank_account[account_holder_type]": bank_accountAccount_holder_type }
          : {}),
        ...(bank_accountCurrency ? { "bank_account[currency]": bank_accountCurrency } : {}),
        ...(bank_accountObject ? { "bank_account[object]": bank_accountObject } : {}),
        ...(bank_accountRouting_number
          ? { "bank_account[routing_number]": bank_accountRouting_number }
          : {}),
        ...(cardExp_month ? { "card[exp_month]": cardExp_month } : {}),
        ...(cardExp_year ? { "card[exp_year]": cardExp_year } : {}),
        ...(cardNumber ? { "card[number]": cardNumber } : {}),
        ...(cardAddress_city ? { "card[address_city]": cardAddress_city } : {}),
        ...(cardAddress_country ? { "card[address_country]": cardAddress_country } : {}),
        ...(cardAddress_line1 ? { "card[address_line1]": cardAddress_line1 } : {}),
        ...(cardAddress_line2 ? { "card[address_line2]": cardAddress_line2 } : {}),
        ...(cardAddress_state ? { "card[address_state]": cardAddress_state } : {}),
        ...(cardAddress_zip ? { "card[address_zip]": cardAddress_zip } : {}),
        ...(cardCvc ? { "card[cvc]": cardCvc } : {}),
        ...(cardMetadata ? { "card[metadata]": cardMetadata } : {}),
        ...(cardName ? { "card[name]": cardName } : {}),
        ...(cardObject ? { "card[object]": cardObject } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, customer }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CUSTOMER: "A valid customer field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof customer !== "string") throw new Error(ERRORS.INVALID_CUSTOMER);
};
