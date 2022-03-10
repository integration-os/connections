/**
 * ----------------------------------------------------------------------------------------------------
 * Indicate that an App's Step in a Workflow Failed to Execute. [Run]
 *
 * @description - Indicate that an app's step in a workflow failed to execute. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/workflows.stepFailed
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
  const { SLACK_ACCESS_TOKEN, workflow_step_execute_id, error } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/workflows.stepFailed",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: { workflow_step_execute_id, error },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, workflow_step_execute_id, error }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_WORKFLOW_STEP_EXECUTE_ID:
      "A valid workflow_step_execute_id field (string) was not provided in the input.",
    INVALID_ERROR: "A valid error field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof workflow_step_execute_id !== "string")
    throw new Error(ERRORS.INVALID_WORKFLOW_STEP_EXECUTE_ID);
  if (typeof error !== "string") throw new Error(ERRORS.INVALID_ERROR);
};
