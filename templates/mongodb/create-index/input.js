const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_MONGODB_CONNECTION_KEY: $env.BUILDABLE_MONGODB_CONNECTION_KEY, // Required
    collection: "collection-name", // Required
    keys: {
      createdAt: 1, // At least one key is required
    },

    // options: {
    //   unique: true,
    //   background: true,
    // },
  };
};
