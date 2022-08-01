const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    POSTGRESQL_CONNECTION_KEY: $env.POSTGRESQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required
    id: 1, // Required
  };
};
