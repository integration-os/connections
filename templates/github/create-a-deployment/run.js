/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Deployment [Run]
 *
 * @description - Create a Deployment using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-a-deployment
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
    ref,
    task,
    auto_merge,
    required_contexts,
    payload,
    environment,
    description,
    transient_environment,
    production_environment,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/deployments`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        ref,
        ...(task ? { task } : {}),
        ...(auto_merge ? { auto_merge } : {}),
        ...(required_contexts ? { required_contexts } : {}),
        ...(payload ? { payload } : {}),
        ...(environment ? { environment } : {}),
        ...(description ? { description } : {}),
        ...(transient_environment ? { transient_environment } : {}),
        ...(production_environment ? { production_environment } : {}),
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
const verifyInput = ({ owner, repo, ref }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_REF: "A valid ref field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof ref !== "string") throw new Error(ERRORS.INVALID_REF);
};
