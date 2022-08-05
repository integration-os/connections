const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_SLACK_ACCESS_TOKEN, app_id, change_type, count, page, service_id, user } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/team.integrationLogs",
      headers: { Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}` },
      params: {
        ...(app_id ? { app_id } : {}),
        ...(change_type ? { change_type } : {}),
        ...(count ? { count } : {}),
        ...(page ? { page } : {}),
        ...(service_id ? { service_id } : {}),
        ...(user ? { user } : {}),
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
};
