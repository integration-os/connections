const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    MONGODB_CONNECTION_KEY: $env.MONGODB_CONNECTION_KEY, // Required
    collection: "posts", // Required
    fieldToSum: "likes", // Required

    // fieldToGroupBy: "name",
    // query: {},
  };
};
