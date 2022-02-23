/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Pull Request [Run]
 *
 * @description - Create a Pull Request using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/pulls#create-a-pull-request
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
    title,
    head,
    base,
    body,
    maintainer_can_modify,
    draft,
    issue,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        base,
        head,
        ...(title ? { title } : {}),
        ...(body ? { body } : {}),
        ...(maintainer_can_modify ? { maintainer_can_modify } : {}),
        ...(draft ? { draft } : {}),
        ...(issue ? { issue } : {}),
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
const verifyInput = ({ owner, repo, base, head }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_BASE: "A valid base field (string) was not provided in the input.",
    INVALID_HEAD: "A valid head field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof base !== "string") throw new Error(ERRORS.INVALID_BASE);
  if (typeof head !== "string") throw new Error(ERRORS.INVALID_HEAD);
};
