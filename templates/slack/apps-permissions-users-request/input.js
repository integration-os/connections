/**
 * ----------------------------------------------------------------------------------------------------
 * Enables an App to Trigger a Permissions Modal to Grant an App Access to a User Access Scope. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/apps.permissions.users.request
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
    scopes: "string", // Required
    trigger_id: "string", // Required
    user: "string", // Required
  };
};
