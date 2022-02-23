/**
 * ----------------------------------------------------------------------------------------------------
 * Update an Organization [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/orgs/#update-an-organization
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    GITHUB_API_USERNAME: $trigger.env.GITHUB_API_USERNAME, // Required for private repos or if making structural changes (i.e modifying branch protection rules)
    GITHUB_API_TOKEN: $trigger.env.GITHUB_API_TOKEN, // Required for private repos or if making structural changes (i.e modifying branch protection rules)
    org: "string", // Required

    // billing_email: "string",
    // company: "string",
    // email: "string",
    // twitter_username: "string",
    // location: "string",
    // name: "string",
    // description: "string",
    // has_organization_projects: true,
    // has_repository_projects: true,
    // default_repository_permission: "read",
    // members_can_create_repositories: true,
    // members_can_create_internal_repositories: true,
    // members_can_create_private_repositories: true,
    // members_can_create_public_repositories: true,
    // members_allowed_repository_creation_type: "all",
    // members_can_create_pages: true,
    // members_can_fork_private_repositories: false,
    // blog: "http://github.blog",
  };
};
