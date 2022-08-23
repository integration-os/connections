const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://circleci.com/api/v2/workflow/${id}/job`,
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, id }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
};
