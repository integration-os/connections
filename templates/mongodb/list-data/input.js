const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    MONGODB_CONNECTION_KEY: $env.MONGODB_CONNECTION_KEY, // Required
    collection: "collection-name", // Required

    // query: {},
    // fields: ['_id', 'name', 'summary'],
    // pageSize: 10,
    // page: 1,
    // sort: { createdAt: -1 },
  };
};
