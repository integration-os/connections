/**
 * ----------------------------------------------------------------------------------------------------
 * Get a List of Authorizations for the Given Event Context. Each Authorization Represents an App Insta [Run]
 *
 * @description - Get a list of authorizations for the given event context. Each authorization represents an app installation that the event is visible to. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/apps.event.authorizations.list
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
  const { SLACK_ACCESS_TOKEN, event_context, cursor, limit } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/apps.event.authorizations.list",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: { event_context, ...(cursor ? { cursor } : {}), ...(limit ? { limit } : {}) },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, event_context }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_EVENT_CONTEXT: "A valid event_context field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof event_context !== "string") throw new Error(ERRORS.INVALID_EVENT_CONTEXT);
};
