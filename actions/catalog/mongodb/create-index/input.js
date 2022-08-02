const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    MONGODB_CONNECTION_KEY: $env.MONGODB_CONNECTION_KEY, // Required
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
