/**
 * ----------------------------------------------------------------------------------------------------
 * Enables an App to Trigger a Permissions Modal to Grant an App Access to a User Access Scope. [Run]
 *
 * @description - Enables an app to trigger a permissions modal to grant an app access to a user access scope. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/apps.permissions.users.request
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
  const { SLACK_ACCESS_TOKEN, scopes, trigger_id, user } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/apps.permissions.users.request",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: { scopes, trigger_id, user },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, scopes, trigger_id, user }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_SCOPES: "A valid scopes field (string) was not provided in the input.",
    INVALID_TRIGGER_ID: "A valid trigger_id field (string) was not provided in the input.",
    INVALID_USER: "A valid user field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof scopes !== "string") throw new Error(ERRORS.INVALID_SCOPES);
  if (typeof trigger_id !== "string") throw new Error(ERRORS.INVALID_TRIGGER_ID);
  if (typeof user !== "string") throw new Error(ERRORS.INVALID_USER);
};
