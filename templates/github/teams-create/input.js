/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Team [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/teams#create-a-team
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
    org: "string", // Required
    name: "string", // Required

    // description: "string",
    // maintainers: ["string"],
    // repo_names: ["string"],
    // privacy: "secret",
    // permission: "pull",
    // parent_team_id: 0,
  };
};
