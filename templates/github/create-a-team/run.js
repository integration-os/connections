/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Team [Run]
 *
 * @description - Create a Team using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/teams#create-a-team
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
    org,
    name,
    description,
    maintainers,
    repo_names,
    privacy,
    permission,
    parent_team_id,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/orgs/${org}/teams`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        name,
        ...(description ? { description } : {}),
        ...(maintainers ? { maintainers } : {}),
        ...(repo_names ? { repo_names } : {}),
        ...(privacy ? { privacy } : {}),
        ...(permission ? { permission } : {}),
        ...(parent_team_id ? { parent_team_id } : {}),
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
const verifyInput = ({ org, name }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
