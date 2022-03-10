/**
 * ----------------------------------------------------------------------------------------------------
 * An API Method that Allows Admins to Set the Discoverability of a Given Workspace [Run]
 *
 * @description - An api method that allows admins to set the discoverability of a given workspace using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.teams.settings.setDiscoverability
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SLACK_ACCESS_TOKEN, discoverability, team_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.teams.settings.setDiscoverability",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ discoverability, team_id }),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, discoverability, team_id }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_DISCOVERABILITY:
      "A valid discoverability field (string) was not provided in the input.",
    INVALID_TEAM_ID: "A valid team_id field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof discoverability !== "string") throw new Error(ERRORS.INVALID_DISCOVERABILITY);
  if (typeof team_id !== "string") throw new Error(ERRORS.INVALID_TEAM_ID);
};
