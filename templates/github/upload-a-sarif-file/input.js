/**
 * ----------------------------------------------------------------------------------------------------
 * Upload an Analysis as SARIF Data [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/code-scanning#upload-a-sarif-file
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
    sarif: "string", // Required
    ref: "string", // Required
    commit_sha: "stringstringstringstringstringstringstri", // Required

    // checkout_uri: "file:///github/workspace/",
    // started_at: "2019-08-24T14:15:22Z",
    // tool_name: "string",
  };
};
