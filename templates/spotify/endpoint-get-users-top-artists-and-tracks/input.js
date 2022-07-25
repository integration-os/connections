const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SPOTIFY_CLIENT_ID: $env.BUILDABLE_SPOTIFY_CLIENT_ID, // Required
    BUILDABLE_SPOTIFY_CLIENT_SECRET: $env.BUILDABLE_SPOTIFY_CLIENT_SECRET, // Required
    BUILDABLE_SPOTIFY_BASE_URI: $env.BUILDABLE_SPOTIFY_BASE_URI, // Required
    type: "string", // Required

    // time_range: "string",
    // limit: 0,
    // offset: 0,
  };
};
