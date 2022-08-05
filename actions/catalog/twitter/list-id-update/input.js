const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_TWITTER_BEARER_TOKEN: $env.BUILDABLE_TWITTER_BEARER_TOKEN, // Required
    id: "1146654567674912769", // Required

    // description: "string",
    // name: "string",
    // private: true,
  };
};
