/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Self-Hosted Runner Group for an Enterprise [Run]
 *
 * @description - Create a Self-Hosted Runner Group for an Enterprise using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#create-self-hosted-runner-group-for-an-enterprise
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
    enterprise,
    name,
    visibility,
    selected_organization_ids,
    runners,
    allows_public_repositories,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/enterprises/${enterprise}/actions/runner-groups`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        name,
        ...(visibility ? { visibility } : {}),
        ...(selected_organization_ids ? { selected_organization_ids } : {}),
        ...(runners ? { runners } : {}),
        ...(allows_public_repositories ? { allows_public_repositories } : {}),
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
const verifyInput = ({ enterprise, name }) => {
  const ERRORS = {
    INVALID_ENTERPRISE: "A valid enterprise field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof enterprise !== "string") throw new Error(ERRORS.INVALID_ENTERPRISE);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
