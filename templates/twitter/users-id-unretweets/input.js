/**
 * ----------------------------------------------------------------------------------------------------
 * Causes the User (in the Path) to Unretweet the Specified Tweet [Input]
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
    source_tweet_id: "1346889436626259968", // Required
  };
};
