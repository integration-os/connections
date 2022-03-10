/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Repository Webhook [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#update-a-repository-webhook
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
    hook_id: 0, // Required

    // config: {
    //     url: "https://example.com/webhook",
    //     content_type: "json",
    //     secret: "********",
    //     insecure_ssl: "0",
    //     address: "bar@example.com",
    //     room: "The Serious Room"
    //   },
    // events: ["push"],
    // add_events: ["string"],
    // remove_events: ["string"],
    // active: true,
  };
};
