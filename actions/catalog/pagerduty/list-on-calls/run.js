const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_PAGERDUTY_API_KEY,
    accept,
    contentType,
    time_zone,
    limit,
    offset,
    total,
    include,
    user_ids,
    escalation_policy_ids,
    schedule_ids,
    since,
    until,
    earliest,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.pagerduty.com/oncalls",
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      params: {
        ...(time_zone ? { time_zone } : {}),
        ...(limit ? { limit } : {}),
        ...(offset ? { offset } : {}),
        ...(total ? { total } : {}),
        ...(include ? { "include[]": include } : {}),
        ...(user_ids ? { "user_ids[]": user_ids } : {}),
        ...(escalation_policy_ids ? { "escalation_policy_ids[]": escalation_policy_ids } : {}),
        ...(schedule_ids ? { "schedule_ids[]": schedule_ids } : {}),
        ...(since ? { since } : {}),
        ...(until ? { until } : {}),
        ...(earliest ? { earliest } : {}),
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
const verifyInput = ({ BUILDABLE_PAGERDUTY_API_KEY, accept, contentType }) => {
  const ERRORS = {
    INVALID_BUILDABLE_PAGERDUTY_API_KEY:
      "A valid BUILDABLE_PAGERDUTY_API_KEY field (string) was not provided in the input.",
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_CONTENT_TYPE: "A valid contentType field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_PAGERDUTY_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_PAGERDUTY_API_KEY);
  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof contentType !== "string") throw new Error(ERRORS.INVALID_CONTENT_TYPE);
};
