/**
 * ----------------------------------------------------------------------------------------------------
 * Start/Resume a User's Playback [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.spotify.com/documentation/web-api/reference/#endpoint-start-a-users-playback
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
    SPOTIFY_CLIENT_ID: $trigger.env.SPOTIFY_CLIENT_ID, // Required
    SPOTIFY_CLIENT_SECRET: $trigger.env.SPOTIFY_CLIENT_SECRET, // Required
    SPOTIFY_BASE_URI: $trigger.env.SPOTIFY_BASE_URI, // Required

    // device_id: "string",
    // context_uri: "string",
    // offset: {},
    // position_ms: 0,
    // uris: ["string"],
  };
};
