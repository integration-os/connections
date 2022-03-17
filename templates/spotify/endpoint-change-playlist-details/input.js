/**
 * ----------------------------------------------------------------------------------------------------
 * Change a Playlist's Details [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.spotify.com/documentation/web-api/reference/#endpoint-change-playlist-details
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
    playlist_id: "string", // Required

    // collaborative: true,
    // description: "string",
    // name: "string",
    // public: true,
  };
};
