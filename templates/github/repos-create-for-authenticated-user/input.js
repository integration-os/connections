/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Repository for the Authenticated User [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-a-repository-for-the-authenticated-user
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
    GITHUB_API_TOKEN: $trigger.env.GITHUB_API_TOKEN, // Required
    GITHUB_API_USERNAME: $trigger.env.GITHUB_API_USERNAME, // Required
    name: "Team Environment", // Required

    // description: "string",
    // homepage: "string",
    // private: false,
    // has_issues: true,
    // has_projects: true,
    // has_wiki: true,
    // team_id: 0,
    // auto_init: false,
    // gitignore_template: "Haskell",
    // license_template: "mit",
    // allow_squash_merge: true,
    // allow_merge_commit: true,
    // allow_rebase_merge: true,
    // allow_auto_merge: false,
    // delete_branch_on_merge: false,
    // has_downloads: true,
    // is_template: true,
  };
};
