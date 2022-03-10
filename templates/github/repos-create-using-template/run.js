/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Repository Using a Template [Run]
 *
 * @description - Create a repository using a template using the Github API
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
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    template_owner,
    template_repo,
    name,
    owner,
    description,
    include_all_branches,
    private,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${template_owner}/${template_repo}/generate`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
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
const verifyInput = ({
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  template_owner,
  template_repo,
  name,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_TEMPLATE_OWNER:
      "A valid template_owner field (string) was not provided in the input.",
    INVALID_TEMPLATE_REPO:
      "A valid template_repo field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof template_owner !== "string")
    throw new Error(ERRORS.INVALID_TEMPLATE_OWNER);
  if (typeof template_repo !== "string")
    throw new Error(ERRORS.INVALID_TEMPLATE_REPO);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
