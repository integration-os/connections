/**
 * ----------------------------------------------------------------------------------------------------
 * List Jobs for a Workflow Run Attempt [Run]
 *
 * @description - List Jobs for a Workflow Run Attempt using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#list-jobs-for-a-workflow-run-attempt
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
    run_id,
    attempt_number,
    per_page,
    page,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/attempts/${attempt_number}/jobs`,
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
const verifyInput = ({ owner, repo, run_id, attempt_number }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_RUN_ID: "A valid run_id field (number) was not provided in the input.",
    INVALID_ATTEMPT_NUMBER: "A valid attempt_number field (number) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof run_id !== "number") throw new Error(ERRORS.INVALID_RUN_ID);
  if (typeof attempt_number !== "number") throw new Error(ERRORS.INVALID_ATTEMPT_NUMBER);
};
