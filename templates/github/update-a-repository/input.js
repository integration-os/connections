/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Repository [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos/#update-a-repository
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
    owner: "string", // Required
    repo: "string", // Required

    // name: "string",
    // description: "string",
    // homepage: "string",
    // private: false,
    // visibility: "public",
    // security_and_analysis: {"advanced_security":{"status":"string"},"secret_scanning":{"status":"string"}},
    // has_issues: true,
    // has_projects: true,
    // has_wiki: true,
    // is_template: false,
    // default_branch: "string",
    // allow_squash_merge: true,
    // allow_merge_commit: true,
    // allow_rebase_merge: true,
    // allow_auto_merge: false,
    // delete_branch_on_merge: false,
    // archived: false,
    // allow_forking: false,
  };
};
