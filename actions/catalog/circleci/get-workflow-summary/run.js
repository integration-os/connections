const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, projectSlug, workflowName, allBranches, branches } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://circleci.com/api/v2/insights/${projectSlug}/workflows/${workflowName}/summary`,
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      params: {
        ...(allBranches ? { "all-branches": allBranches } : {}),
        ...(branches ? { branches } : {}),
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, projectSlug, workflowName }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_PROJECT_SLUG: "A valid projectSlug field (string) was not provided in the input.",
    INVALID_WORKFLOW_NAME: "A valid workflowName field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof projectSlug !== "string") throw new Error(ERRORS.INVALID_PROJECT_SLUG);
  if (typeof workflowName !== "string") throw new Error(ERRORS.INVALID_WORKFLOW_NAME);
};
