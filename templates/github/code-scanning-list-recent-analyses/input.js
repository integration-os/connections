/**
 * ----------------------------------------------------------------------------------------------------
 * List Code Scanning Analyses for a Repository [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/code-scanning#list-code-scanning-analyses-for-a-repository
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

    // tool_name: "string",
    // tool_guid: "string",
    // page: 1,
    // per_page: 30,
    // ref: "string",
    // sarif_id: "6c81cd8e-b078-4ac3-a3be-1dad7dbd0b53",
  };
};
