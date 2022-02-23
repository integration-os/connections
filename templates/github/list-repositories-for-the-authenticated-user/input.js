/**
 * ----------------------------------------------------------------------------------------------------
 * List Repositories for the Authenticated User [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#list-repositories-for-the-authenticated-user
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

    // visibility: "all",
    // affiliation: "owner,collaborator,organization_member",
    // type: "all",
    // sort: "created",
    // direction: "asc",
    // per_page: 30,
    // page: 1,
    // since: "2019-08-24T14:15:22Z",
    // before: "2019-08-24T14:15:22Z",
  };
};
