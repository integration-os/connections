const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    account_holder,
    permissions,
    expand,
    filters,
    return_url,
    account_holderType,
    account_holderAccount,
    account_holderCustomer,
    permissions0,
    permissions1,
    expand0,
    expand1,
    filtersCountries0,
    filtersCountries1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/financial_connections/sessions",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        account_holder,
        permissions,
        ...(expand ? { expand } : {}),
        ...(filters ? { filters } : {}),
        ...(return_url ? { return_url } : {}),
        ...(account_holderType ? { "account_holder[type]": account_holderType } : {}),
        ...(account_holderAccount ? { "account_holder[account]": account_holderAccount } : {}),
        ...(account_holderCustomer ? { "account_holder[customer]": account_holderCustomer } : {}),
        ...(permissions0 ? { "permissions[0]": permissions0 } : {}),
        ...(permissions1 ? { "permissions[1]": permissions1 } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(filtersCountries0 ? { "filters[countries][0]": filtersCountries0 } : {}),
        ...(filtersCountries1 ? { "filters[countries][1]": filtersCountries1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, account_holder, permissions }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_ACCOUNT_HOLDER: "A valid account_holder field (object) was not provided in the input.",
    INVALID_PERMISSIONS: "A valid permissions field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof account_holder !== "object") throw new Error(ERRORS.INVALID_ACCOUNT_HOLDER);
  if (typeof permissions !== "object") throw new Error(ERRORS.INVALID_PERMISSIONS);
};
