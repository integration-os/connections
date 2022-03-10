/**
 * ----------------------------------------------------------------------------------------------------
 * Sends a Message to a Channel. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/chat.postMessage
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
    channel: "string", // Required

    // as_user: "string",
    // attachments: "string",
    // blocks: "string",
    // icon_emoji: "string",
    // icon_url: "string",
    // link_names: true,
    // mrkdwn: true,
    // parse: "string",
    // reply_broadcast: true,
    // text: "string",
    // thread_ts: "string",
    // unfurl_links: true,
    // unfurl_media: true,
    // username: "string",
  };
};
