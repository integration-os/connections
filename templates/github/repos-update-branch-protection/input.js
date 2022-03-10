/**
 * ----------------------------------------------------------------------------------------------------
 * Update Branch Protection [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#update-branch-protection
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
    owner: "string", // Required
    repo: "string", // Required
    branch: "string", // Required
    required_status_checks: {
      strict: true,
      contexts: ["string"],
      checks: [{ context: "string", app_id: 0 }],
    }, // Required
    enforce_admins: true, // Required
    required_pull_request_reviews: {
      dismissal_restrictions: { users: ["string"], teams: ["string"] },
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true,
      required_approving_review_count: 0,
    }, // Required
    restrictions: { users: ["string"], teams: ["string"], apps: ["string"] }, // Required

    // required_linear_history: true,
    // allow_force_pushes: true,
    // allow_deletions: true,
    // required_conversation_resolution: true,
    // contexts: ["string"],
  };
};
