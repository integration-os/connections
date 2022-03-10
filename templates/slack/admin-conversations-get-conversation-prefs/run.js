/**
 * ----------------------------------------------------------------------------------------------------
 * Get Conversation Preferences for a Public or Private Channel. [Run]
 *
 * @description - Get conversation preferences for a public or private channel. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.conversations.getConversationPrefs
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SLACK_ACCESS_TOKEN, channel_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/admin.conversations.getConversationPrefs",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: { channel_id },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, channel_id }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_CHANNEL_ID: "A valid channel_id field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof channel_id !== "string") throw new Error(ERRORS.INVALID_CHANNEL_ID);
};
