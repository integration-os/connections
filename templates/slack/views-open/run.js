/**
 * ----------------------------------------------------------------------------------------------------
 * Open a View for a User. [Run]
 *
 * @description - Open a view for a user. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/views.open
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
  const { SLACK_ACCESS_TOKEN, trigger_id, view } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/views.open",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: { trigger_id, view },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, trigger_id, view }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_TRIGGER_ID: "A valid trigger_id field (string) was not provided in the input.",
    INVALID_VIEW: "A valid view field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof trigger_id !== "string") throw new Error(ERRORS.INVALID_TRIGGER_ID);
  if (typeof view !== "string") throw new Error(ERRORS.INVALID_VIEW);
};
