/**
 * ----------------------------------------------------------------------------------------------------
 * Get User's Followed Lists [Input]
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
    id: "2244994945", // Required

    // max_results: 100,
    // pagination_token: 0,
    // listFields: ["created_at", "description", "follower_count", "member_count", "name", "private"],
    // expansions: ["owner_id"],
    // userFields: ["username", "verified", "profile_image_url"],
  };
};
