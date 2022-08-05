const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    client_id,
    client_secret,
    code,
    redirect_uri,
    single_channel,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/oauth.token",
      headers: { Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}` },
      params: {
        ...(client_id ? { client_id } : {}),
        ...(client_secret ? { client_secret } : {}),
        ...(code ? { code } : {}),
        ...(redirect_uri ? { redirect_uri } : {}),
        ...(single_channel ? { single_channel } : {}),
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
