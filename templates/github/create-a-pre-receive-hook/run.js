/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Pre-Receive Hook [Run]
 *
 * @description - Create a Pre-Receive Hook using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#create-a-pre-receive-hook
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
  const {
    GITHUB_API_USERNAME,
    GITHUB_API_TOKEN,
    name,
    script,
    script_repository,
    environment,
    enforcement,
    allow_downstream_configuration,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.github.com/admin/pre-receive-hooks",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        environment,
        script_repository,
        script,
        name,
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
const verifyInput = ({ environment, script_repository, script, name }) => {
  const ERRORS = {
    INVALID_ENVIRONMENT: "A valid environment field (object) was not provided in the input.",
    INVALID_SCRIPT_REPOSITORY:
      "A valid script_repository field (object) was not provided in the input.",
    INVALID_SCRIPT: "A valid script field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof environment !== "object") throw new Error(ERRORS.INVALID_ENVIRONMENT);
  if (typeof script_repository !== "object") throw new Error(ERRORS.INVALID_SCRIPT_REPOSITORY);
  if (typeof script !== "string") throw new Error(ERRORS.INVALID_SCRIPT);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
