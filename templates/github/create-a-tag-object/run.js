/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Tag Object [Run]
 *
 * @description - Create a Tag Object using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/git#create-a-tag-object
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, owner, repo, tag, message, object, type, tagger } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/git/tags`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { type, object, message, tag, ...(tagger ? { tagger } : {}) },
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
const verifyInput = ({ owner, repo, type, object, message, tag }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
    INVALID_OBJECT: "A valid object field (string) was not provided in the input.",
    INVALID_MESSAGE: "A valid message field (string) was not provided in the input.",
    INVALID_TAG: "A valid tag field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
  if (typeof object !== "string") throw new Error(ERRORS.INVALID_OBJECT);
  if (typeof message !== "string") throw new Error(ERRORS.INVALID_MESSAGE);
  if (typeof tag !== "string") throw new Error(ERRORS.INVALID_TAG);
};
