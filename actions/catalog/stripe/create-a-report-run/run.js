const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    report_type,
    expand,
    parameters,
    expand0,
    expand1,
    parametersColumns0,
    parametersColumns1,
    parametersConnected_account,
    parametersCurrency,
    parametersInterval_end,
    parametersInterval_start,
    parametersPayout,
    parametersReporting_category,
    parametersTimezone,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/reporting/report_runs",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        report_type,
        ...(expand ? { expand } : {}),
        ...(parameters ? { parameters } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(parametersColumns0 ? { "parameters[columns][0]": parametersColumns0 } : {}),
        ...(parametersColumns1 ? { "parameters[columns][1]": parametersColumns1 } : {}),
        ...(parametersConnected_account
          ? { "parameters[connected_account]": parametersConnected_account }
          : {}),
        ...(parametersCurrency ? { "parameters[currency]": parametersCurrency } : {}),
        ...(parametersInterval_end ? { "parameters[interval_end]": parametersInterval_end } : {}),
        ...(parametersInterval_start
          ? { "parameters[interval_start]": parametersInterval_start }
          : {}),
        ...(parametersPayout ? { "parameters[payout]": parametersPayout } : {}),
        ...(parametersReporting_category
          ? { "parameters[reporting_category]": parametersReporting_category }
          : {}),
        ...(parametersTimezone ? { "parameters[timezone]": parametersTimezone } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, report_type }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_REPORT_TYPE: "A valid report_type field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof report_type !== "string") throw new Error(ERRORS.INVALID_REPORT_TYPE);
};
