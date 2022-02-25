/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Organization Webhook [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/orgs#create-an-organization-webhook
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
    org: "string", // Required
    config: {
      url: "https://example.com/webhook",
      content_type: '"json"',
      secret: '"********"',
      insecure_ssl: '"0"',
      username: '"kdaigle"',
      password: '"password"',
    }, // Required
    name: "string", // Required

    // events: ["push"],
    // active: true,
  };
};
