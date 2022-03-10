/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Issue [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/issues#create-an-issue
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
    title: "string", // Required

    // body: "string",
    // assignee: "string",
    // milestone: "string",
    // labels: ["string"],
    // assignees: ["string"],
  };
};
