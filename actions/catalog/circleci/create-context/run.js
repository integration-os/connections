const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, name, owner } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://circleci.com/api/v2/context",
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: { name, owner },
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, name, owner }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
    INVALID_OWNER: "A valid owner field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
  if (typeof owner !== "object") throw new Error(ERRORS.INVALID_OWNER);
};
