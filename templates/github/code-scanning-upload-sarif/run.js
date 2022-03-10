/**
 * ----------------------------------------------------------------------------------------------------
 * Upload an Analysis as SARIF Data [Run]
 *
 * @description - Upload an analysis as sarif data using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/code-scanning#upload-a-sarif-file
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
    commit_sha,
    ref,
    sarif,
    checkout_uri,
    started_at,
    tool_name,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/code-scanning/sarifs`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: {
        commit_sha,
        ref,
        sarif,
        ...(checkout_uri ? { checkout_uri } : {}),
        ...(started_at ? { started_at } : {}),
        ...(tool_name ? { tool_name } : {}),
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
  commit_sha,
  ref,
  sarif,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_OWNER:
      "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_COMMIT_SHA:
      "A valid commit_sha field (string) was not provided in the input.",
    INVALID_REF: "A valid ref field (string) was not provided in the input.",
    INVALID_SARIF:
      "A valid sarif field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof commit_sha !== "string")
    throw new Error(ERRORS.INVALID_COMMIT_SHA);
  if (typeof ref !== "string") throw new Error(ERRORS.INVALID_REF);
  if (typeof sarif !== "string") throw new Error(ERRORS.INVALID_SARIF);
};
