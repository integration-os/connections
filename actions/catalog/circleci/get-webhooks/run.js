const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, scopeId, scopeType } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://circleci.com/api/v2/webhook",
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      params: { "scope-id": scopeId, "scope-type": scopeType },
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, scopeId, scopeType }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_SCOPE_ID: "A valid scopeId field (string) was not provided in the input.",
    INVALID_SCOPE_TYPE: "A valid scopeType field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof scopeId !== "string") throw new Error(ERRORS.INVALID_SCOPE_ID);
  if (typeof scopeType !== "string") throw new Error(ERRORS.INVALID_SCOPE_TYPE);
};
