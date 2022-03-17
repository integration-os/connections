/**
 * ----------------------------------------------------------------------------------------------------
 * Get a List of a User's Playlists [Run]
 *
 * @description - Get a list of a user's playlists using the Spotify API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-list-users-playlists
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
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_BASE_URI, user_id, limit, offset } =
    input;

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
      method: "get",
      url: `${SPOTIFY_BASE_URI}/users/${user_id}/playlists`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: { ...(limit ? { limit } : {}), ...(offset ? { offset } : {}) },
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
const verifyInput = ({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_BASE_URI, user_id }) => {
  const ERRORS = {
    INVALID_SPOTIFY_CLIENT_ID:
      "A valid SPOTIFY_CLIENT_ID field (string) was not provided in the input.",
    INVALID_SPOTIFY_CLIENT_SECRET:
      "A valid SPOTIFY_CLIENT_SECRET field (string) was not provided in the input.",
    INVALID_SPOTIFY_BASE_URI:
      "A valid SPOTIFY_BASE_URI field (string) was not provided in the input.",
    INVALID_USER_ID: "A valid user_id field (string) was not provided in the input.",
  };

  if (typeof SPOTIFY_CLIENT_ID !== "string") throw new Error(ERRORS.INVALID_SPOTIFY_CLIENT_ID);
  if (typeof SPOTIFY_CLIENT_SECRET !== "string")
    throw new Error(ERRORS.INVALID_SPOTIFY_CLIENT_SECRET);
  if (typeof SPOTIFY_BASE_URI !== "string") throw new Error(ERRORS.INVALID_SPOTIFY_BASE_URI);
  if (typeof user_id !== "string") throw new Error(ERRORS.INVALID_USER_ID);
};
