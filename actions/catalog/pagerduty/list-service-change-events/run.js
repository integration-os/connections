const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_PAGERDUTY_API_KEY,
    id,
    accept,
    contentType,
    since,
    until,
    limit,
    offset,
    total,
    team_ids,
    integration_ids,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.pagerduty.com/services/${id}/change_events`,
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      params: {
        ...(since ? { since } : {}),
        ...(until ? { until } : {}),
        ...(limit ? { limit } : {}),
        ...(offset ? { offset } : {}),
        ...(total ? { total } : {}),
        ...(team_ids ? { "team_ids[]": team_ids } : {}),
        ...(integration_ids ? { "integration_ids[]": integration_ids } : {}),
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
const verifyInput = ({ BUILDABLE_PAGERDUTY_API_KEY, id, accept, contentType }) => {
  const ERRORS = {
    INVALID_BUILDABLE_PAGERDUTY_API_KEY:
      "A valid BUILDABLE_PAGERDUTY_API_KEY field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_CONTENT_TYPE: "A valid contentType field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_PAGERDUTY_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_PAGERDUTY_API_KEY);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof contentType !== "string") throw new Error(ERRORS.INVALID_CONTENT_TYPE);
};
