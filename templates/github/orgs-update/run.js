/**
 * ----------------------------------------------------------------------------------------------------
 * Update an Organization [Run]
 *
 * @description - Update an organization using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/orgs/#update-an-organization
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
    org,
    billing_email,
    company,
    email,
    twitter_username,
    location,
    name,
    description,
    has_organization_projects,
    has_repository_projects,
    default_repository_permission,
    members_can_create_repositories,
    members_can_create_internal_repositories,
    members_can_create_private_repositories,
    members_can_create_public_repositories,
    members_allowed_repository_creation_type,
    members_can_create_pages,
    members_can_fork_private_repositories,
    blog,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/orgs/${org}`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: {
        ...(billing_email ? { billing_email } : {}),
        ...(company ? { company } : {}),
        ...(email ? { email } : {}),
        ...(twitter_username ? { twitter_username } : {}),
        ...(location ? { location } : {}),
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(has_organization_projects ? { has_organization_projects } : {}),
        ...(has_repository_projects ? { has_repository_projects } : {}),
        ...(default_repository_permission
          ? { default_repository_permission }
          : {}),
        ...(members_can_create_repositories
          ? { members_can_create_repositories }
          : {}),
        ...(members_can_create_internal_repositories
          ? { members_can_create_internal_repositories }
          : {}),
        ...(members_can_create_private_repositories
          ? { members_can_create_private_repositories }
          : {}),
        ...(members_can_create_public_repositories
          ? { members_can_create_public_repositories }
          : {}),
        ...(members_allowed_repository_creation_type
          ? { members_allowed_repository_creation_type }
          : {}),
        ...(members_can_create_pages ? { members_can_create_pages } : {}),
        ...(members_can_fork_private_repositories
          ? { members_can_fork_private_repositories }
          : {}),
        ...(blog ? { blog } : {}),
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
const verifyInput = ({ GITHUB_API_TOKEN, GITHUB_API_USERNAME, org }) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
};
