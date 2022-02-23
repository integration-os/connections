/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Repository Using a Template [Run]
 *
 * @description - Create a Repository Using a Template using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-a-repository-using-a-template
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
    template_owner,
    template_repo,
    owner,
    name,
    description,
    include_all_branches,
    private,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${template_owner}/${template_repo}/generate`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        name,
        ...(owner ? { owner } : {}),
        ...(description ? { description } : {}),
        ...(include_all_branches ? { include_all_branches } : {}),
        ...(private ? { private } : {}),
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
const verifyInput = ({ template_owner, template_repo, name }) => {
  const ERRORS = {
    INVALID_TEMPLATE_OWNER: "A valid template_owner field (string) was not provided in the input.",
    INVALID_TEMPLATE_REPO: "A valid template_repo field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof template_owner !== "string") throw new Error(ERRORS.INVALID_TEMPLATE_OWNER);
  if (typeof template_repo !== "string") throw new Error(ERRORS.INVALID_TEMPLATE_REPO);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
