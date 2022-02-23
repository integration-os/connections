/**
 * ----------------------------------------------------------------------------------------------------
 * User Lookup by Usernames [Input]
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
    usernames: ["string"], // Required

    // expansions: ["pinned_tweet_id"],
    // tweetFields: ["created_at","author_id","entities","conversation_id","reply_settings","public_metrics"],
    // userFields: ["username","verified","profile_image_url"],
  };
};
