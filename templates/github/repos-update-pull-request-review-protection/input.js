/**
 * ----------------------------------------------------------------------------------------------------
 * Update Pull Request Review Protection [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#update-pull-request-review-protection
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

    // dismissal_restrictions: { users: ["string"], teams: ["string"] },
    // dismiss_stale_reviews: true,
    // require_code_owner_reviews: true,
    // required_approving_review_count: 0,
  };
};
