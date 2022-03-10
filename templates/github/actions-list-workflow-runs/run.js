/**
 * ----------------------------------------------------------------------------------------------------
 * List Workflow Runs [Run]
 *
 * @description - List workflow runs using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#list-workflow-runs
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
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    owner,
    repo,
    workflow_id,
    actor,
    branch,
    event,
    status,
    per_page,
    page,
    created,
    exclude_pull_requests,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      params: {
        ...(actor ? { actor } : {}),
        ...(branch ? { branch } : {}),
        ...(event ? { event } : {}),
        ...(status ? { status } : {}),
        ...(per_page ? { per_page } : {}),
        ...(page ? { page } : {}),
        ...(created ? { created } : {}),
        ...(exclude_pull_requests ? { exclude_pull_requests } : {}),
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
const verifyInput = ({
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  owner,
  repo,
  workflow_id,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_OWNER:
      "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_WORKFLOW_ID:
      "A valid workflow_id field (number) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof workflow_id !== "number")
    throw new Error(ERRORS.INVALID_WORKFLOW_ID);
};
