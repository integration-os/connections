const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SPOTIFY_CLIENT_ID: $env.BUILDABLE_SPOTIFY_CLIENT_ID, // Required
    BUILDABLE_SPOTIFY_CLIENT_SECRET: $env.BUILDABLE_SPOTIFY_CLIENT_SECRET, // Required
    BUILDABLE_SPOTIFY_BASE_URI: $env.BUILDABLE_SPOTIFY_BASE_URI, // Required
    seed_artists: "string", // Required
    seed_genres: "string", // Required
    seed_tracks: "string", // Required

    // limit: 0,
    // market: "string",
    // min_acousticness: 0,
    // max_acousticness: 0,
    // target_acousticness: 0,
    // min_danceability: 0,
    // max_danceability: 0,
    // target_danceability: 0,
    // min_duration_ms: 0,
    // max_duration_ms: 0,
    // target_duration_ms: 0,
    // min_energy: 0,
    // max_energy: 0,
    // target_energy: 0,
    // min_instrumentalness: 0,
    // max_instrumentalness: 0,
    // target_instrumentalness: 0,
    // min_key: 0,
    // max_key: 0,
    // target_key: 0,
    // min_liveness: 0,
    // max_liveness: 0,
    // target_liveness: 0,
    // min_loudness: 0,
    // max_loudness: 0,
    // target_loudness: 0,
    // min_mode: 0,
    // max_mode: 0,
    // target_mode: 0,
    // min_popularity: 0,
    // max_popularity: 0,
    // target_popularity: 0,
    // min_speechiness: 0,
    // max_speechiness: 0,
    // target_speechiness: 0,
    // min_tempo: 0,
    // max_tempo: 0,
    // target_tempo: 0,
    // min_time_signature: 0,
    // max_time_signature: 0,
    // target_time_signature: 0,
    // min_valence: 0,
    // max_valence: 0,
    // target_valence: 0,
  };
};
