/**
 * ----------------------------------------------------------------------------------------------------
 * Exchanges a Temporary OAuth Verifier Code for a Workspace Token. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/oauth.token
 *
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
    SLACK_ACCESS_TOKEN: $trigger.env.SLACK_ACCESS_TOKEN, // Required

    // client_id: "string",
    // client_secret: "string",
    // code: "string",
    // redirect_uri: "string",
    // single_channel: true,
  };
};
