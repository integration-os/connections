const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    MONGODB_CONNECTION_KEY: $env.MONGODB_CONNECTION_KEY, // Required
    collection: "collection-name", // Required

    // query: {},
  };
};
