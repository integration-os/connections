/**
 * ----------------------------------------------------------------------------------------------------
 * List Pre-Receive Hooks for an Organization [Run]
 *
 * @description - List Pre-Receive Hooks for an Organization using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#list-pre-receive-hooks-for-an-organization
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, org, per_page, page, direction, sort } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/orgs/${org}/pre-receive-hooks`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {
        ...(per_page ? { per_page } : {}),
        ...(page ? { page } : {}),
        ...(direction ? { direction } : {}),
        ...(sort ? { sort } : {}),
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
const verifyInput = ({ org }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
};
