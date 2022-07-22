const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_MONGODB_CONNECTION_KEY: $env.BUILDABLE_MONGODB_CONNECTION_KEY, // Required
    collection: "collection-name", // Required
    field: "field-name", // Required

    // query: {},
    // options: {},
  };
};
