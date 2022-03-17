/**
 * ----------------------------------------------------------------------------------------------------
 * Reorder or Replace a Playlist's Items [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.spotify.com/documentation/web-api/reference/#endpoint-reorder-or-replace-playlists-tracks
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

    // uris: "string",
    // insert_before: 0,
    // range_length: 0,
    // range_start: 0,
    // snapshot_id: "string",
    // uris: ["string"],
  };
};
