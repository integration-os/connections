/**
 * ----------------------------------------------------------------------------------------------------
 * Get Recommendations [Run]
 *
 * @description - Get recommendations using the Spotify API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-recommendations
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
  const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_BASE_URI,
    seed_artists,
    seed_genres,
    seed_tracks,
    limit,
    market,
    min_acousticness,
    max_acousticness,
    target_acousticness,
    min_danceability,
    max_danceability,
    target_danceability,
    min_duration_ms,
    max_duration_ms,
    target_duration_ms,
    min_energy,
    max_energy,
    target_energy,
    min_instrumentalness,
    max_instrumentalness,
    target_instrumentalness,
    min_key,
    max_key,
    target_key,
    min_liveness,
    max_liveness,
    target_liveness,
    min_loudness,
    max_loudness,
    target_loudness,
    min_mode,
    max_mode,
    target_mode,
    min_popularity,
    max_popularity,
    target_popularity,
    min_speechiness,
    max_speechiness,
    target_speechiness,
    min_tempo,
    max_tempo,
    target_tempo,
    min_time_signature,
    max_time_signature,
    target_time_signature,
    min_valence,
    max_valence,
    target_valence,
  } = input;

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
      url: `${SPOTIFY_BASE_URI}/recommendations`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        seed_artists,
        seed_genres,
        seed_tracks,
        ...(limit ? { limit } : {}),
        ...(market ? { market } : {}),
        ...(min_acousticness ? { min_acousticness } : {}),
        ...(max_acousticness ? { max_acousticness } : {}),
        ...(target_acousticness ? { target_acousticness } : {}),
        ...(min_danceability ? { min_danceability } : {}),
        ...(max_danceability ? { max_danceability } : {}),
        ...(target_danceability ? { target_danceability } : {}),
        ...(min_duration_ms ? { min_duration_ms } : {}),
        ...(max_duration_ms ? { max_duration_ms } : {}),
        ...(target_duration_ms ? { target_duration_ms } : {}),
        ...(min_energy ? { min_energy } : {}),
        ...(max_energy ? { max_energy } : {}),
        ...(target_energy ? { target_energy } : {}),
        ...(min_instrumentalness ? { min_instrumentalness } : {}),
        ...(max_instrumentalness ? { max_instrumentalness } : {}),
        ...(target_instrumentalness ? { target_instrumentalness } : {}),
        ...(min_key ? { min_key } : {}),
        ...(max_key ? { max_key } : {}),
        ...(target_key ? { target_key } : {}),
        ...(min_liveness ? { min_liveness } : {}),
        ...(max_liveness ? { max_liveness } : {}),
        ...(target_liveness ? { target_liveness } : {}),
        ...(min_loudness ? { min_loudness } : {}),
        ...(max_loudness ? { max_loudness } : {}),
        ...(target_loudness ? { target_loudness } : {}),
        ...(min_mode ? { min_mode } : {}),
        ...(max_mode ? { max_mode } : {}),
        ...(target_mode ? { target_mode } : {}),
        ...(min_popularity ? { min_popularity } : {}),
        ...(max_popularity ? { max_popularity } : {}),
        ...(target_popularity ? { target_popularity } : {}),
        ...(min_speechiness ? { min_speechiness } : {}),
        ...(max_speechiness ? { max_speechiness } : {}),
        ...(target_speechiness ? { target_speechiness } : {}),
        ...(min_tempo ? { min_tempo } : {}),
        ...(max_tempo ? { max_tempo } : {}),
        ...(target_tempo ? { target_tempo } : {}),
        ...(min_time_signature ? { min_time_signature } : {}),
        ...(max_time_signature ? { max_time_signature } : {}),
        ...(target_time_signature ? { target_time_signature } : {}),
        ...(min_valence ? { min_valence } : {}),
        ...(max_valence ? { max_valence } : {}),
        ...(target_valence ? { target_valence } : {}),
      },
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
const verifyInput = ({
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_BASE_URI,
  seed_artists,
  seed_genres,
  seed_tracks,
}) => {
  const ERRORS = {
    INVALID_SPOTIFY_CLIENT_ID:
      "A valid SPOTIFY_CLIENT_ID field (string) was not provided in the input.",
    INVALID_SPOTIFY_CLIENT_SECRET:
      "A valid SPOTIFY_CLIENT_SECRET field (string) was not provided in the input.",
    INVALID_SPOTIFY_BASE_URI:
      "A valid SPOTIFY_BASE_URI field (string) was not provided in the input.",
    INVALID_SEED_ARTISTS: "A valid seed_artists field (string) was not provided in the input.",
    INVALID_SEED_GENRES: "A valid seed_genres field (string) was not provided in the input.",
    INVALID_SEED_TRACKS: "A valid seed_tracks field (string) was not provided in the input.",
  };

  if (typeof SPOTIFY_CLIENT_ID !== "string") throw new Error(ERRORS.INVALID_SPOTIFY_CLIENT_ID);
  if (typeof SPOTIFY_CLIENT_SECRET !== "string")
    throw new Error(ERRORS.INVALID_SPOTIFY_CLIENT_SECRET);
  if (typeof SPOTIFY_BASE_URI !== "string") throw new Error(ERRORS.INVALID_SPOTIFY_BASE_URI);
  if (typeof seed_artists !== "string") throw new Error(ERRORS.INVALID_SEED_ARTISTS);
  if (typeof seed_genres !== "string") throw new Error(ERRORS.INVALID_SEED_GENRES);
  if (typeof seed_tracks !== "string") throw new Error(ERRORS.INVALID_SEED_TRACKS);
};
