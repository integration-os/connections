/**
 * ----------------------------------------------------------------------------------------------------
 * Invite a User to a Workspace. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.users.invite
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
    channel_ids: "string", // Required
    email: "string", // Required
    team_id: "string", // Required

    // custom_message: "string",
    // guest_expiration_ts: "string",
    // is_restricted: true,
    // is_ultra_restricted: true,
    // real_name: "string",
    // resend: true,
  };
};
