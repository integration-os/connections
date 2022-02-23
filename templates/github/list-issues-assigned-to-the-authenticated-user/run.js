/**
 * ----------------------------------------------------------------------------------------------------
 * List Issues Assigned to the Authenticated User [Run]
 *
 * @description - List Issues Assigned to the Authenticated User using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/issues#list-issues-assigned-to-the-authenticated-user
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
    filter,
    state,
    labels,
    sort,
    direction,
    since,
    collab,
    orgs,
    owned,
    pulls,
    per_page,
    page,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.github.com/issues",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {
        ...(filter ? { filter } : {}),
        ...(state ? { state } : {}),
        ...(labels ? { labels } : {}),
        ...(sort ? { sort } : {}),
        ...(direction ? { direction } : {}),
        ...(since ? { since } : {}),
        ...(collab ? { collab } : {}),
        ...(orgs ? { orgs } : {}),
        ...(owned ? { owned } : {}),
        ...(pulls ? { pulls } : {}),
        ...(per_page ? { per_page } : {}),
        ...(page ? { page } : {}),
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
