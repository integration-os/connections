/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Scoped Access Token [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#create-a-scoped-access-token
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
    client_id: "string", // Required
    access_token: "e72e16c7e42f292c6912e7710c838347ae178b4a", // Required

    // target: "octocat",
    // target_id: 1,
    // repositories: ["rails"],
    // repository_ids: [1],
    // permissions: { contents: "read", issues: "read", deployments: "write", single_file: "read" },
  };
};
