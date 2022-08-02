const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    workflow_step_edit_id,
    inputs,
    outputs,
    step_name,
    step_image_url,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/workflows.updateStep",
      headers: { Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}` },
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN, workflow_step_edit_id }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_WORKFLOW_STEP_EDIT_ID:
      "A valid workflow_step_edit_id field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
  if (typeof workflow_step_edit_id !== "string")
    throw new Error(ERRORS.INVALID_WORKFLOW_STEP_EDIT_ID);
};
