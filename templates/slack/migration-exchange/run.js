/**
 * ----------------------------------------------------------------------------------------------------
 * For Enterprise Grid Workspaces, Map Local User IDs to Global User IDs [Run]
 *
 * @description - For enterprise grid workspaces, map local user ids to global user ids using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/migration.exchange
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
  const { SLACK_ACCESS_TOKEN, users, team_id, to_old } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/migration.exchange",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: { users, ...(team_id ? { team_id } : {}), ...(to_old ? { to_old } : {}) },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, users }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_USERS: "A valid users field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof users !== "string") throw new Error(ERRORS.INVALID_USERS);
};
