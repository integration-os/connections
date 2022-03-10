/**
 * ----------------------------------------------------------------------------------------------------
 * Create or Update File Contents [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#create-or-update-file-contents
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
    path: "string", // Required
    message: "string", // Required
    content: "string", // Required

    // sha: "string",
    // branch: "string",
    // committer: { name: "string", email: "string", date: "2013-01-05T13:13:22+05:00" },
    // author: { name: "string", email: "string", date: "2013-01-15T17:13:22+05:00" },
  };
};
