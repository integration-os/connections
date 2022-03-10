/**
 * ----------------------------------------------------------------------------------------------------
 * Get an Environment Public Key [Run]
 *
 * @description - Get an environment public key using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#get-an-environment-public-key
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
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    repository_id,
    environment_name,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/repositories/${repository_id}/environments/${environment_name}/secrets/public-key`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
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
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  repository_id,
  environment_name,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_REPOSITORY_ID:
      "A valid repository_id field (number) was not provided in the input.",
    INVALID_ENVIRONMENT_NAME:
      "A valid environment_name field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof repository_id !== "number")
    throw new Error(ERRORS.INVALID_REPOSITORY_ID);
  if (typeof environment_name !== "string")
    throw new Error(ERRORS.INVALID_ENVIRONMENT_NAME);
};
