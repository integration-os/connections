/**
 * ----------------------------------------------------------------------------------------------------
 * Create a GitHub App From a Manifest [Run]
 *
 * @description - Create a GitHub App From a Manifest using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#create-a-github-app-from-a-manifest
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, code } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/app-manifests/${code}/conversions`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
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
const verifyInput = ({ code }) => {
  const ERRORS = {
    INVALID_CODE: "A valid code field (string) was not provided in the input.",
  };

  if (typeof code !== "string") throw new Error(ERRORS.INVALID_CODE);
};
