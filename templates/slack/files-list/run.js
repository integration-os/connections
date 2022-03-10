/**
 * ----------------------------------------------------------------------------------------------------
 * List for a Team, in a Channel, or From a User with Applied Filters. [Run]
 *
 * @description - List for a team, in a channel, or from a user with applied filters. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/files.list
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
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
};
