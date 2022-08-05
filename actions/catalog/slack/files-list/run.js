const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    user,
    channel,
    ts_from,
    ts_to,
    types,
    count,
    page,
    show_files_hidden_by_limit,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/files.list",
      headers: { Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}` },
      params: {
        ...(user ? { user } : {}),
        ...(channel ? { channel } : {}),
        ...(ts_from ? { ts_from } : {}),
        ...(ts_to ? { ts_to } : {}),
        ...(types ? { types } : {}),
        ...(count ? { count } : {}),
        ...(page ? { page } : {}),
        ...(show_files_hidden_by_limit ? { show_files_hidden_by_limit } : {}),
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
