/**
 * ----------------------------------------------------------------------------------------------------
 * List Repositories Accessible to the User Access Token [Run]
 *
 * @description - List Repositories Accessible to the User Access Token using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#list-repositories-accessible-to-the-user-access-token
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, installation_id, per_page, page } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/user/installations/${installation_id}/repositories`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: { ...(per_page ? { per_page } : {}), ...(page ? { page } : {}) },
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
const verifyInput = ({ installation_id }) => {
  const ERRORS = {
    INVALID_INSTALLATION_ID:
      "A valid installation_id field (number) was not provided in the input.",
  };

  if (typeof installation_id !== "number") throw new Error(ERRORS.INVALID_INSTALLATION_ID);
};
