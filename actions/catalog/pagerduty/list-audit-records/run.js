const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_PAGERDUTY_API_KEY,
    accept,
    contentType,
    limit,
    cursor,
    since,
    until,
    root_resource_types,
    actor_type,
    actor_id,
    method_type,
    method_truncated_token,
    actions,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.pagerduty.com/audit/records",
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      params: {
        ...(limit ? { limit } : {}),
        ...(cursor ? { cursor } : {}),
        ...(since ? { since } : {}),
        ...(until ? { until } : {}),
        ...(root_resource_types ? { "root_resource_types[]": root_resource_types } : {}),
        ...(actor_type ? { actor_type } : {}),
        ...(actor_id ? { actor_id } : {}),
        ...(method_type ? { method_type } : {}),
        ...(method_truncated_token ? { method_truncated_token } : {}),
        ...(actions ? { "actions[]": actions } : {}),
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
