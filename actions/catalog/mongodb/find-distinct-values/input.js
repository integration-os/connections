const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    MONGODB_CONNECTION_KEY: $env.MONGODB_CONNECTION_KEY, // Required
    collection: "collection-name", // Required
    field: "field-name", // Required

    // query: {},
    // options: {},
  };
};
