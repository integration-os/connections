const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_GITHUB_ACCESS_TOKEN,
    BUILDABLE_GITHUB_ACCOUNT_USERNAME,
    org,
    pre_receive_hook_id,
    enforcement,
    allow_downstream_configuration,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/orgs/${org}/pre-receive-hooks/${pre_receive_hook_id}`,
      auth: {
        password: BUILDABLE_GITHUB_ACCESS_TOKEN,
        username: BUILDABLE_GITHUB_ACCOUNT_USERNAME,
      },
      data: {
        ...(enforcement ? { enforcement } : {}),
        ...(allow_downstream_configuration ? { allow_downstream_configuration } : {}),
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
const verifyInput = ({
  BUILDABLE_GITHUB_ACCESS_TOKEN,
  BUILDABLE_GITHUB_ACCOUNT_USERNAME,
  org,
  pre_receive_hook_id,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_GITHUB_ACCESS_TOKEN:
      "A valid BUILDABLE_GITHUB_ACCESS_TOKEN field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_BUILDABLE_GITHUB_ACCOUNT_USERNAME:
      "A valid BUILDABLE_GITHUB_ACCOUNT_USERNAME field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_PRE_RECEIVE_HOOK_ID:
      "A valid pre_receive_hook_id field (number) was not provided in the input.",
  };

  if (typeof BUILDABLE_GITHUB_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_GITHUB_ACCESS_TOKEN);
  if (typeof BUILDABLE_GITHUB_ACCOUNT_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_GITHUB_ACCOUNT_USERNAME);
  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof pre_receive_hook_id !== "number") throw new Error(ERRORS.INVALID_PRE_RECEIVE_HOOK_ID);
};
