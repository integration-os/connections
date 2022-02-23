/**
 * ----------------------------------------------------------------------------------------------------
 * Set GitHub Actions Permissions for an Organization [Run]
 *
 * @description - Set GitHub Actions Permissions for an Organization using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#set-github-actions-permissions-for-an-organization
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, org, enabled_repositories, allowed_actions } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/orgs/${org}/actions/permissions`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        enabled_repositories,
        ...(allowed_actions ? { allowed_actions } : {}),
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
const verifyInput = ({ org, enabled_repositories }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_ENABLED_REPOSITORIES:
      "A valid enabled_repositories field (string) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof enabled_repositories !== "string") throw new Error(ERRORS.INVALID_ENABLED_REPOSITORIES);
};
