const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    channel,
    ts,
    unfurls,
    user_auth_message,
    user_auth_required,
    user_auth_url,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/chat.unfurl",
      headers: {
        Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        channel,
        ts,
        ...(unfurls ? { unfurls } : {}),
        ...(user_auth_message ? { user_auth_message } : {}),
        ...(user_auth_required ? { user_auth_required } : {}),
        ...(user_auth_url ? { user_auth_url } : {}),
      }),
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN, channel, ts }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_CHANNEL: "A valid channel field (string) was not provided in the input.",
    INVALID_TS: "A valid ts field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
  if (typeof channel !== "string") throw new Error(ERRORS.INVALID_CHANNEL);
  if (typeof ts !== "string") throw new Error(ERRORS.INVALID_TS);
};
