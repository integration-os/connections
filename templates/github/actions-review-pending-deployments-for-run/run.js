/**
 * ----------------------------------------------------------------------------------------------------
 * Review Pending Deployments for a Workflow Run [Run]
 *
 * @description - Review pending deployments for a workflow run using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#review-pending-deployments-for-a-workflow-run
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
    run_id,
    environment_ids,
    state,
    comment,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/pending_deployments`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { environment_ids, state, comment },
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
  run_id,
  environment_ids,
  state,
  comment,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_OWNER:
      "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_RUN_ID:
      "A valid run_id field (number) was not provided in the input.",
    INVALID_ENVIRONMENT_IDS:
      "A valid environment_ids field (object) was not provided in the input.",
    INVALID_STATE:
      "A valid state field (string) was not provided in the input.",
    INVALID_COMMENT:
      "A valid comment field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof run_id !== "number") throw new Error(ERRORS.INVALID_RUN_ID);
  if (typeof environment_ids !== "object")
    throw new Error(ERRORS.INVALID_ENVIRONMENT_IDS);
  if (typeof state !== "string") throw new Error(ERRORS.INVALID_STATE);
  if (typeof comment !== "string") throw new Error(ERRORS.INVALID_COMMENT);
};
