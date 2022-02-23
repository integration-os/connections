/**
 * ----------------------------------------------------------------------------------------------------
 * List Repositories for the Authenticated User [Run]
 *
 * @description - List Repositories for the Authenticated User using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#list-repositories-for-the-authenticated-user
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
    visibility,
    affiliation,
    type,
    sort,
    direction,
    per_page,
    page,
    since,
    before,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.github.com/user/repos",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {
        ...(visibility ? { visibility } : {}),
        ...(affiliation ? { affiliation } : {}),
        ...(type ? { type } : {}),
        ...(sort ? { sort } : {}),
        ...(direction ? { direction } : {}),
        ...(per_page ? { per_page } : {}),
        ...(page ? { page } : {}),
        ...(since ? { since } : {}),
        ...(before ? { before } : {}),
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
const verifyInput = () => {
  const ERRORS = {};
};
