/**
 * ----------------------------------------------------------------------------------------------------
 * Create or Update File Contents [Run]
 *
 * @description - Create or Update File Contents using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-or-update-file-contents
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
    path,
    message,
    content,
    sha,
    branch,
    committer,
    author,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        content,
        message,
        ...(sha ? { sha } : {}),
        ...(branch ? { branch } : {}),
        ...(committer ? { committer } : {}),
        ...(author ? { author } : {}),
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
const verifyInput = ({ owner, repo, path, content, message }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_PATH: "A valid path field (string) was not provided in the input.",
    INVALID_CONTENT: "A valid content field (string) was not provided in the input.",
    INVALID_MESSAGE: "A valid message field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof path !== "string") throw new Error(ERRORS.INVALID_PATH);
  if (typeof content !== "string") throw new Error(ERRORS.INVALID_CONTENT);
  if (typeof message !== "string") throw new Error(ERRORS.INVALID_MESSAGE);
};
