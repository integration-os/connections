/**
 * ----------------------------------------------------------------------------------------------------
 * Delete a Personal Access Token [Run]
 *
 * @description - Delete a Personal Access Token using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#delete-a-personal-access-token
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, token_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.github.com/admin/tokens/${token_id}`,
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
const verifyInput = ({ token_id }) => {
  const ERRORS = {
    INVALID_TOKEN_ID: "A valid token_id field (number) was not provided in the input.",
  };

  if (typeof token_id !== "number") throw new Error(ERRORS.INVALID_TOKEN_ID);
};
