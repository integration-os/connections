/**
 * ----------------------------------------------------------------------------------------------------
 * List All Disconnected Channels—i.e., Channels that Were Once Connected to Other Workspaces and Then  [Run]
 *
 * @description - List all disconnected channels—i.E., channels that were once connected to other workspaces and then disconnected—and the corresponding original channel ids for key revocation with ekm. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
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
  const { SLACK_ACCESS_TOKEN, channel_ids, team_ids, limit, cursor } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/admin.conversations.ekm.listOriginalConnectedChannelInfo",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: {
        ...(channel_ids ? { channel_ids } : {}),
        ...(team_ids ? { team_ids } : {}),
        ...(limit ? { limit } : {}),
        ...(cursor ? { cursor } : {}),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
};
