/**
 * ----------------------------------------------------------------------------------------------------
 * Space Lookup up Space IDs [Input]
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
    ids: ["1SLjjRYNejbKM"], // Required

    // spaceFields: ["created_at","creator_id","host_ids","invited_user_ids","is_ticketed","lang","participant_count","scheduled_start","speaker_ids","started_at","title","updated_at"],
    // expansions: ["creator_id","host_ids","invited_user_ids","speaker_ids"],
  };
};
