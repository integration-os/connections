const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_SLACK_ACCESS_TOKEN, workflow_step_execute_id, error } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://slack.com/api/workflows.stepFailed",
      headers: { Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}` },
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN, workflow_step_execute_id, error }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_WORKFLOW_STEP_EXECUTE_ID:
      "A valid workflow_step_execute_id field (string) was not provided in the input.",
    INVALID_ERROR: "A valid error field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
  if (typeof workflow_step_execute_id !== "string")
    throw new Error(ERRORS.INVALID_WORKFLOW_STEP_EXECUTE_ID);
  if (typeof error !== "string") throw new Error(ERRORS.INVALID_ERROR);
};
