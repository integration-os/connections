const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_MONGODB_CONNECTION_KEY: $env.BUILDABLE_MONGODB_CONNECTION_KEY, // Required
    collection: "collection-1", // Required

    key: "new",
    // otherKeys: 10051164
  };
};
