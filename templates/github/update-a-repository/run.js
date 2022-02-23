/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Repository [Run]
 *
 * @description - Update a Repository using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos/#update-a-repository
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
    description,
    homepage,
    private,
    visibility,
    security_and_analysis,
    has_issues,
    has_projects,
    has_wiki,
    is_template,
    default_branch,
    allow_squash_merge,
    allow_merge_commit,
    allow_rebase_merge,
    allow_auto_merge,
    delete_branch_on_merge,
    archived,
    allow_forking,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/repos/${owner}/${repo}`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(homepage ? { homepage } : {}),
        ...(private ? { private } : {}),
        ...(visibility ? { visibility } : {}),
        ...(security_and_analysis ? { security_and_analysis } : {}),
        ...(has_issues ? { has_issues } : {}),
        ...(has_projects ? { has_projects } : {}),
        ...(has_wiki ? { has_wiki } : {}),
        ...(is_template ? { is_template } : {}),
        ...(default_branch ? { default_branch } : {}),
        ...(allow_squash_merge ? { allow_squash_merge } : {}),
        ...(allow_merge_commit ? { allow_merge_commit } : {}),
        ...(allow_rebase_merge ? { allow_rebase_merge } : {}),
        ...(allow_auto_merge ? { allow_auto_merge } : {}),
        ...(delete_branch_on_merge ? { delete_branch_on_merge } : {}),
        ...(archived ? { archived } : {}),
        ...(allow_forking ? { allow_forking } : {}),
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
const verifyInput = ({ owner, repo }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
};
