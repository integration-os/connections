const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    account_holder: { account: "string", customer: "string", type: "account" }, // Required
    permissions: ["balances"], // Required

    // expand: ["string"],
    // filters: { countries: ["string"] },
    // return_url: "<string>",
    // account_holderType: "<string>",
    // account_holderAccount: "<string>",
    // account_holderCustomer: "<string>",
    // permissions0: "<string>",
    // permissions1: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // filtersCountries0: "<string>",
    // filtersCountries1: "<string>",
  };
};
