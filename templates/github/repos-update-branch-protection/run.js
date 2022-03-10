/**
 * ----------------------------------------------------------------------------------------------------
 * Update Branch Protection [Run]
 *
 * @description - Update branch protection using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#update-branch-protection
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
    branch,
    required_status_checks,
    enforce_admins,
    required_pull_request_reviews,
    restrictions,
    required_linear_history,
    allow_force_pushes,
    allow_deletions,
    required_conversation_resolution,
    contexts,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/repos/${owner}/${repo}/branches/${branch}/protection`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: {
        required_status_checks,
        enforce_admins,
        required_pull_request_reviews,
        restrictions,
        ...(required_linear_history ? { required_linear_history } : {}),
        ...(allow_force_pushes ? { allow_force_pushes } : {}),
        ...(allow_deletions ? { allow_deletions } : {}),
        ...(required_conversation_resolution
          ? { required_conversation_resolution }
          : {}),
        ...(contexts ? { contexts } : {}),
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
  branch,
  required_status_checks,
  enforce_admins,
  required_pull_request_reviews,
  restrictions,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_OWNER:
      "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_BRANCH:
      "A valid branch field (string) was not provided in the input.",
    INVALID_REQUIRED_STATUS_CHECKS:
      "A valid required_status_checks field (object) was not provided in the input.",
    INVALID_ENFORCE_ADMINS:
      "A valid enforce_admins field (boolean) was not provided in the input.",
    INVALID_REQUIRED_PULL_REQUEST_REVIEWS:
      "A valid required_pull_request_reviews field (object) was not provided in the input.",
    INVALID_RESTRICTIONS:
      "A valid restrictions field (object) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof branch !== "string") throw new Error(ERRORS.INVALID_BRANCH);
  if (typeof required_status_checks !== "object")
    throw new Error(ERRORS.INVALID_REQUIRED_STATUS_CHECKS);
  if (typeof enforce_admins !== "boolean")
    throw new Error(ERRORS.INVALID_ENFORCE_ADMINS);
  if (typeof required_pull_request_reviews !== "object")
    throw new Error(ERRORS.INVALID_REQUIRED_PULL_REQUEST_REVIEWS);
  if (typeof restrictions !== "object")
    throw new Error(ERRORS.INVALID_RESTRICTIONS);
};
