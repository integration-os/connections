/**
 * ----------------------------------------------------------------------------------------------------
 * Creation of a Tweet [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
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
    TWITTER_BEARER_TOKEN: $trigger.env.TWITTER_BEARER_TOKEN, // Required

    // text: "Learn how to use the user Tweet timeline and user mention timeline endpoints in the Twitter API v2 to explore Tweet\u2026 https://t.co/56a0vZUx7i",
    // direct_message_deep_link: "string",
    // quote_tweet_id: "1346889436626259968",
    // for_super_followers_only: true,
    // reply: { in_reply_to_tweet_id: "1346889436626259968", exclude_reply_user_ids: ["2244994945"] },
    // media: { media_ids: ["1146654567674912769"], tagged_user_ids: ["2244994945"] },
    // poll: { options: ["string"], duration_minutes: 5 },
    // reply_settings: "following",
    // geo: { place_id: "string" },
  };
};
