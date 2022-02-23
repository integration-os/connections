/**
 * ----------------------------------------------------------------------------------------------------
 * Get a Gist Revision [Run]
 *
 * @description - Get a Gist Revision using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/gists#get-a-gist-revision
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, gist_id, sha } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/gists/${gist_id}/${sha}`,
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
const verifyInput = ({ gist_id, sha }) => {
  const ERRORS = {
    INVALID_GIST_ID: "A valid gist_id field (string) was not provided in the input.",
    INVALID_SHA: "A valid sha field (string) was not provided in the input.",
  };

  if (typeof gist_id !== "string") throw new Error(ERRORS.INVALID_GIST_ID);
  if (typeof sha !== "string") throw new Error(ERRORS.INVALID_SHA);
};
