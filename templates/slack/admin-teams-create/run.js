/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Enterprise Team. [Run]
 *
 * @description - Create an enterprise team. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.teams.create
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
  const { SLACK_ACCESS_TOKEN, team_domain, team_name, team_description, team_discoverability } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.teams.create",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        team_domain,
        team_name,
        ...(team_description ? { team_description } : {}),
        ...(team_discoverability ? { team_discoverability } : {}),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, team_domain, team_name }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_TEAM_DOMAIN: "A valid team_domain field (string) was not provided in the input.",
    INVALID_TEAM_NAME: "A valid team_name field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof team_domain !== "string") throw new Error(ERRORS.INVALID_TEAM_DOMAIN);
  if (typeof team_name !== "string") throw new Error(ERRORS.INVALID_TEAM_NAME);
};
