/**
 * ----------------------------------------------------------------------------------------------------
 * Check a Token [Run]
 *
 * @description - Check a Token using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#check-a-token
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, client_id, access_token } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/applications/${client_id}/token`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { access_token },
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
const verifyInput = ({ client_id, access_token }) => {
  const ERRORS = {
    INVALID_CLIENT_ID: "A valid client_id field (string) was not provided in the input.",
    INVALID_ACCESS_TOKEN: "A valid access_token field (string) was not provided in the input.",
  };

  if (typeof client_id !== "string") throw new Error(ERRORS.INVALID_CLIENT_ID);
  if (typeof access_token !== "string") throw new Error(ERRORS.INVALID_ACCESS_TOKEN);
};
