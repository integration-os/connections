/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Check Run [Run]
 *
 * @description - Create a Check Run using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/checks#create-a-check-run
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
    name,
    head_sha,
    details_url,
    external_id,
    status,
    started_at,
    conclusion,
    completed_at,
    output,
    actions,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/check-runs`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        head_sha,
        name,
        ...(details_url ? { details_url } : {}),
        ...(external_id ? { external_id } : {}),
        ...(status ? { status } : {}),
        ...(started_at ? { started_at } : {}),
        ...(conclusion ? { conclusion } : {}),
        ...(completed_at ? { completed_at } : {}),
        ...(output ? { output } : {}),
        ...(actions ? { actions } : {}),
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
const verifyInput = ({ owner, repo, head_sha, name }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_HEAD_SHA: "A valid head_sha field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof head_sha !== "string") throw new Error(ERRORS.INVALID_HEAD_SHA);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
