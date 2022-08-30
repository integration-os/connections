const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_PAGERDUTY_API_KEY,
    xEARLYACCESS,
    accept,
    contentType,
    filters,
    starting_after,
    ending_before,
    order,
    order_by,
    limit,
    time_zone,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.pagerduty.com/analytics/raw/incidents",
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      data: {
        ...(filters ? { filters } : {}),
        ...(starting_after ? { starting_after } : {}),
        ...(ending_before ? { ending_before } : {}),
        ...(order ? { order } : {}),
        ...(order_by ? { order_by } : {}),
        ...(limit ? { limit } : {}),
        ...(time_zone ? { time_zone } : {}),
      },
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
const verifyInput = ({ BUILDABLE_PAGERDUTY_API_KEY, xEARLYACCESS, accept, contentType }) => {
  const ERRORS = {
    INVALID_BUILDABLE_PAGERDUTY_API_KEY:
      "A valid BUILDABLE_PAGERDUTY_API_KEY field (string) was not provided in the input.",
    INVALID_X_EARLYACCESS: "A valid xEARLYACCESS field (string) was not provided in the input.",
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_CONTENT_TYPE: "A valid contentType field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_PAGERDUTY_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_PAGERDUTY_API_KEY);
  if (typeof xEARLYACCESS !== "string") throw new Error(ERRORS.INVALID_X_EARLYACCESS);
  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof contentType !== "string") throw new Error(ERRORS.INVALID_CONTENT_TYPE);
};
