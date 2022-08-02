const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    POSTGRESQL_CONNECTION_KEY: $env.POSTGRESQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required

    // query: {},
    // fields: ['_id', 'name', 'summary'],
    // pageSize: 10,
    // page: 1,
    // sort: { createdAt: -1 },
  };
};
