/**
 * ----------------------------------------------------------------------------------------------------
 * Set an Expiration for a Guest User [Run]
 *
 * @description - Set an expiration for a guest user using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.users.setExpiration
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
  const { SLACK_ACCESS_TOKEN, expiration_ts, team_id, user_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.users.setExpiration",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ expiration_ts, team_id, user_id }),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, expiration_ts, team_id, user_id }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_EXPIRATION_TS: "A valid expiration_ts field (number) was not provided in the input.",
    INVALID_TEAM_ID: "A valid team_id field (string) was not provided in the input.",
    INVALID_USER_ID: "A valid user_id field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof expiration_ts !== "number") throw new Error(ERRORS.INVALID_EXPIRATION_TS);
  if (typeof team_id !== "string") throw new Error(ERRORS.INVALID_TEAM_ID);
  if (typeof user_id !== "string") throw new Error(ERRORS.INVALID_USER_ID);
};
