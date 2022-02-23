/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Deployment Status [Run]
 *
 * @description - Create a Deployment Status using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-a-deployment-status
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
    owner,
    repo,
    deployment_id,
    state,
    target_url,
    log_url,
    description,
    environment,
    environment_url,
    auto_inactive,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/deployments/${deployment_id}/statuses`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        state,
        ...(target_url ? { target_url } : {}),
        ...(log_url ? { log_url } : {}),
        ...(description ? { description } : {}),
        ...(environment ? { environment } : {}),
        ...(environment_url ? { environment_url } : {}),
        ...(auto_inactive ? { auto_inactive } : {}),
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
const verifyInput = ({ owner, repo, deployment_id, state }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_DEPLOYMENT_ID: "A valid deployment_id field (number) was not provided in the input.",
    INVALID_STATE: "A valid state field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof deployment_id !== "number") throw new Error(ERRORS.INVALID_DEPLOYMENT_ID);
  if (typeof state !== "string") throw new Error(ERRORS.INVALID_STATE);
};
