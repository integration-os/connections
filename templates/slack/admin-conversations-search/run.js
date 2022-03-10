/**
 * ----------------------------------------------------------------------------------------------------
 * Search for Public or Private Channels in an Enterprise Organization. [Run]
 *
 * @description - Search for public or private channels in an enterprise organization. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.conversations.search
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
  const {
    SLACK_ACCESS_TOKEN,
    team_ids,
    query,
    limit,
    cursor,
    search_channel_types,
    sort,
    sort_dir,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/admin.conversations.search",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: {
        ...(team_ids ? { team_ids } : {}),
        ...(query ? { query } : {}),
        ...(limit ? { limit } : {}),
        ...(cursor ? { cursor } : {}),
        ...(search_channel_types ? { search_channel_types } : {}),
        ...(sort ? { sort } : {}),
        ...(sort_dir ? { sort_dir } : {}),
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
