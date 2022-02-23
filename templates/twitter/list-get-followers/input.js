/**
 * ----------------------------------------------------------------------------------------------------
 * Returns User Objects that Follow a List by the Provided List ID [Input]
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
    id: "1146654567674912769", // Required

    // max_results: 100,
    // pagination_token: 0,
    // expansions: ["pinned_tweet_id"],
    // tweetFields: ["created_at","author_id","entities","conversation_id","reply_settings","public_metrics"],
    // userFields: ["username","verified","profile_image_url"],
  };
};
