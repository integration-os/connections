/**
 * ----------------------------------------------------------------------------------------------------
 * Full Archive Search Counts [Input]
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
    query: "(from:TwitterDev OR from:TwitterAPI) has:media -is:retweet", // Required

    // start_time: "2019-08-24T14:15:22Z",
    // end_time: "2019-08-24T14:15:22Z",
    // since_id: "1346889436626259968",
    // until_id: "1346889436626259968",
    // next_token: "string",
    // pagination_token: "string",
    // granularity: "minute",
  };
};
