/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Organization Repository [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-an-organization-repository
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
    name: "string", // Required

    // description: "string",
    // homepage: "string",
    // private: false,
    // visibility: "public",
    // has_issues: true,
    // has_projects: true,
    // has_wiki: true,
    // is_template: false,
    // team_id: 0,
    // auto_init: false,
    // gitignore_template: "string",
    // license_template: "string",
    // allow_squash_merge: true,
    // allow_merge_commit: true,
    // allow_rebase_merge: true,
    // allow_auto_merge: false,
    // delete_branch_on_merge: false,
  };
};
