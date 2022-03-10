/**
 * ----------------------------------------------------------------------------------------------------
 * Creates a Reminder. [Run]
 *
 * @description - Creates a reminder. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/reminders.add
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
  const { SLACK_ACCESS_TOKEN, text, time, user } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/reminders.add",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ text, time, ...(user ? { user } : {}) }),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, text, time }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_TEXT: "A valid text field (string) was not provided in the input.",
    INVALID_TIME: "A valid time field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof text !== "string") throw new Error(ERRORS.INVALID_TEXT);
  if (typeof time !== "string") throw new Error(ERRORS.INVALID_TIME);
};
