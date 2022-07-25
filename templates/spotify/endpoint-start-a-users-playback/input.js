const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SPOTIFY_CLIENT_ID: $env.BUILDABLE_SPOTIFY_CLIENT_ID, // Required
    BUILDABLE_SPOTIFY_CLIENT_SECRET: $env.BUILDABLE_SPOTIFY_CLIENT_SECRET, // Required
    BUILDABLE_SPOTIFY_BASE_URI: $env.BUILDABLE_SPOTIFY_BASE_URI, // Required

    // device_id: "string",
    // context_uri: "string",
    // offset: {},
    // position_ms: 0,
    // uris: ["string"],
  };
};
