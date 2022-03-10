/**
 * ----------------------------------------------------------------------------------------------------
 * Registers a New Call. [Run]
 *
 * @description - Registers a new call. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/calls.add
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
  const {
    SLACK_ACCESS_TOKEN,
    external_unique_id,
    join_url,
    created_by,
    date_start,
    desktop_app_join_url,
    external_display_id,
    title,
    users,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/calls.add",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        external_unique_id,
        join_url,
        ...(created_by ? { created_by } : {}),
        ...(date_start ? { date_start } : {}),
        ...(desktop_app_join_url ? { desktop_app_join_url } : {}),
        ...(external_display_id ? { external_display_id } : {}),
        ...(title ? { title } : {}),
        ...(users ? { users } : {}),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, external_unique_id, join_url }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_EXTERNAL_UNIQUE_ID:
      "A valid external_unique_id field (string) was not provided in the input.",
    INVALID_JOIN_URL: "A valid join_url field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof external_unique_id !== "string") throw new Error(ERRORS.INVALID_EXTERNAL_UNIQUE_ID);
  if (typeof join_url !== "string") throw new Error(ERRORS.INVALID_JOIN_URL);
};
