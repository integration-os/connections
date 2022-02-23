/**
 * ----------------------------------------------------------------------------------------------------
 * Get a Public SSH Key for the Authenticated User [Run]
 *
 * @description - Get a Public SSH Key for the Authenticated User using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/users#get-a-public-ssh-key-for-the-authenticated-user
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, key_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/user/keys/${key_id}`,
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
const verifyInput = ({ key_id }) => {
  const ERRORS = {
    INVALID_KEY_ID: "A valid key_id field (number) was not provided in the input.",
  };

  if (typeof key_id !== "number") throw new Error(ERRORS.INVALID_KEY_ID);
};
