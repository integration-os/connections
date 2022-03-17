/**
 * ----------------------------------------------------------------------------------------------------
 * Toggle Shuffle For User’s Playback [Run]
 *
 * @description - Toggle shuffle for user’s playback using the Spotify API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.spotify.com/documentation/web-api/reference/#endpoint-toggle-shuffle-for-users-playback
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_BASE_URI, state, device_id } = input;

  verifyInput(input);

  try {
    const {
      data: { access_token },
    } = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: SPOTIFY_CLIENT_ID,
        password: SPOTIFY_CLIENT_SECRET,
      },
      data: qs.stringify({ grant_type: "client_credentials" }),
    });

    const { data } = await axios({
      method: "put",
      url: `${SPOTIFY_BASE_URI}/me/player/shuffle`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: { state, ...(device_id ? { device_id } : {}) },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_BASE_URI, state }) => {
  const ERRORS = {
    INVALID_SPOTIFY_CLIENT_ID:
      "A valid SPOTIFY_CLIENT_ID field (string) was not provided in the input.",
    INVALID_SPOTIFY_CLIENT_SECRET:
      "A valid SPOTIFY_CLIENT_SECRET field (string) was not provided in the input.",
    INVALID_SPOTIFY_BASE_URI:
      "A valid SPOTIFY_BASE_URI field (string) was not provided in the input.",
    INVALID_STATE: "A valid state field (boolean) was not provided in the input.",
  };

  if (typeof SPOTIFY_CLIENT_ID !== "string") throw new Error(ERRORS.INVALID_SPOTIFY_CLIENT_ID);
  if (typeof SPOTIFY_CLIENT_SECRET !== "string")
    throw new Error(ERRORS.INVALID_SPOTIFY_CLIENT_SECRET);
  if (typeof SPOTIFY_BASE_URI !== "string") throw new Error(ERRORS.INVALID_SPOTIFY_BASE_URI);
  if (typeof state !== "boolean") throw new Error(ERRORS.INVALID_STATE);
};
