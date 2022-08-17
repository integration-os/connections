const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, contextId, envVarName, value } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://circleci.com/api/v2/context/${contextId}/environment-variable/${envVarName}`,
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: { value },
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, contextId, envVarName, value }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_CONTEXT_ID: "A valid contextId field (string) was not provided in the input.",
    INVALID_ENV_VAR_NAME: "A valid envVarName field (string) was not provided in the input.",
    INVALID_VALUE: "A valid value field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof contextId !== "string") throw new Error(ERRORS.INVALID_CONTEXT_ID);
  if (typeof envVarName !== "string") throw new Error(ERRORS.INVALID_ENV_VAR_NAME);
  if (typeof value !== "string") throw new Error(ERRORS.INVALID_VALUE);
};
