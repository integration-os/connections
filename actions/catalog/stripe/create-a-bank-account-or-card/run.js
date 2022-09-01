const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    account,
    bank_account,
    default_for_currency,
    expand,
    external_account,
    metadata,
    bank_accountAccount_number,
    bank_accountCountry,
    bank_accountAccount_holder_name,
    bank_accountAccount_holder_type,
    bank_accountAccount_type,
    bank_accountCurrency,
    bank_accountObject,
    bank_accountRouting_number,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/accounts/${account}/external_accounts`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(bank_account ? { bank_account } : {}),
        ...(default_for_currency ? { default_for_currency } : {}),
        ...(expand ? { expand } : {}),
        ...(external_account ? { external_account } : {}),
        ...(metadata ? { metadata } : {}),
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
        ...(bank_accountAccount_type
          ? { "bank_account[account_type]": bank_accountAccount_type }
          : {}),
        ...(bank_accountCurrency ? { "bank_account[currency]": bank_accountCurrency } : {}),
        ...(bank_accountObject ? { "bank_account[object]": bank_accountObject } : {}),
        ...(bank_accountRouting_number
          ? { "bank_account[routing_number]": bank_accountRouting_number }
          : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, account }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_ACCOUNT: "A valid account field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof account !== "string") throw new Error(ERRORS.INVALID_ACCOUNT);
};
