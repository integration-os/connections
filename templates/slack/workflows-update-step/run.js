/**
 * ----------------------------------------------------------------------------------------------------
 * Update the Configuration for a Workflow Extension Step. [Run]
 *
 * @description - Update the configuration for a workflow extension step. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/workflows.updateStep
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
  const { SLACK_ACCESS_TOKEN, workflow_step_edit_id, inputs, outputs, step_name, step_image_url } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/workflows.updateStep",
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` },
      params: {
        workflow_step_edit_id,
        ...(inputs ? { inputs } : {}),
        ...(outputs ? { outputs } : {}),
        ...(step_name ? { step_name } : {}),
        ...(step_image_url ? { step_image_url } : {}),
      },
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, workflow_step_edit_id }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_WORKFLOW_STEP_EDIT_ID:
      "A valid workflow_step_edit_id field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof workflow_step_edit_id !== "string")
    throw new Error(ERRORS.INVALID_WORKFLOW_STEP_EDIT_ID);
};
