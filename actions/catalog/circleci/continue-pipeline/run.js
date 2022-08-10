const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, continuationKey, configuration, parameters } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://circleci.com/api/v2/pipeline/continue",
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: {
        "continuation-key": continuationKey,
        configuration,
        ...(parameters ? { parameters } : {}),
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, continuationKey, configuration }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_CONTINUATION_KEY:
      "A valid continuationKey field (string) was not provided in the input.",
    INVALID_CONFIGURATION: "A valid configuration field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof continuationKey !== "string") throw new Error(ERRORS.INVALID_CONTINUATION_KEY);
  if (typeof configuration !== "string") throw new Error(ERRORS.INVALID_CONFIGURATION);
};
