const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_PAGERDUTY_API_KEY,
    accept,
    contentType,
    id,
    from,
    alerts,
    limit,
    offset,
    total,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.pagerduty.com/incidents/${id}/alerts`,
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      params: {
        ...(limit ? { limit } : {}),
        ...(offset ? { offset } : {}),
        ...(total ? { total } : {}),
      },
      data: { alerts },
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
const verifyInput = ({ BUILDABLE_PAGERDUTY_API_KEY, accept, contentType, id, from, alerts }) => {
  const ERRORS = {
    INVALID_BUILDABLE_PAGERDUTY_API_KEY:
      "A valid BUILDABLE_PAGERDUTY_API_KEY field (string) was not provided in the input.",
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_CONTENT_TYPE: "A valid contentType field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_FROM: "A valid from field (string) was not provided in the input.",
    INVALID_ALERTS: "A valid alerts field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_PAGERDUTY_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_PAGERDUTY_API_KEY);
  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof contentType !== "string") throw new Error(ERRORS.INVALID_CONTENT_TYPE);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof from !== "string") throw new Error(ERRORS.INVALID_FROM);
  if (typeof alerts !== "object") throw new Error(ERRORS.INVALID_ALERTS);
};
