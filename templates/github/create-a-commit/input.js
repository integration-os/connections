/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Commit [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/git#create-a-commit
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
    tree: "string", // Required
    message: "string", // Required

    // parents: ["string"],
    // author: {"name":"string","email":"string","date":"2019-08-24T14:15:22Z"},
    // committer: {"name":"string","email":"string","date":"2019-08-24T14:15:22Z"},
    // signature: "string",
  };
};
