/**
 * ----------------------------------------------------------------------------------------------------
 * Create or Update an Environment Secret [Run]
 *
 * @description - Create or Update an Environment Secret using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#create-or-update-an-environment-secret
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
    repository_id,
    environment_name,
    secret_name,
    encrypted_value,
    key_id,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/repositories/${repository_id}/environments/${environment_name}/secrets/${secret_name}`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { key_id, encrypted_value },
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
const verifyInput = ({ repository_id, environment_name, secret_name, key_id, encrypted_value }) => {
  const ERRORS = {
    INVALID_REPOSITORY_ID: "A valid repository_id field (number) was not provided in the input.",
    INVALID_ENVIRONMENT_NAME:
      "A valid environment_name field (string) was not provided in the input.",
    INVALID_SECRET_NAME: "A valid secret_name field (string) was not provided in the input.",
    INVALID_KEY_ID: "A valid key_id field (string) was not provided in the input.",
    INVALID_ENCRYPTED_VALUE:
      "A valid encrypted_value field (string) was not provided in the input.",
  };

  if (typeof repository_id !== "number") throw new Error(ERRORS.INVALID_REPOSITORY_ID);
  if (typeof environment_name !== "string") throw new Error(ERRORS.INVALID_ENVIRONMENT_NAME);
  if (typeof secret_name !== "string") throw new Error(ERRORS.INVALID_SECRET_NAME);
  if (typeof key_id !== "string") throw new Error(ERRORS.INVALID_KEY_ID);
  if (typeof encrypted_value !== "string") throw new Error(ERRORS.INVALID_ENCRYPTED_VALUE);
};
