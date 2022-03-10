/**
 * ----------------------------------------------------------------------------------------------------
 * Rename an Emoji. [Run]
 *
 * @description - Rename an emoji. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.emoji.rename
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
  const { SLACK_ACCESS_TOKEN, name, new_name, token } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.emoji.rename",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ name, new_name, token }),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, name, new_name, token }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
    INVALID_NEW_NAME: "A valid new_name field (string) was not provided in the input.",
    INVALID_TOKEN: "A valid token field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
  if (typeof new_name !== "string") throw new Error(ERRORS.INVALID_NEW_NAME);
  if (typeof token !== "string") throw new Error(ERRORS.INVALID_TOKEN);
};
