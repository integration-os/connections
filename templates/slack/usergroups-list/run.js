/**
 * ----------------------------------------------------------------------------------------------------
 * List All User Groups for a Team [Run]
 *
 * @description - List all user groups for a team using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/usergroups.list
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
  const { SLACK_ACCESS_TOKEN, include_users, include_count, include_disabled } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/usergroups.list",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: {
        ...(include_users ? { include_users } : {}),
        ...(include_count ? { include_count } : {}),
        ...(include_disabled ? { include_disabled } : {}),
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
