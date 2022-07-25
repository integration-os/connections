const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_POSTGRESQL_CONNECTION_KEY: $env.BUILDABLE_POSTGRESQL_CONNECTION_KEY, // Required
    query: "SELECT id FROM table_name LIMIT 10;",
    maxLimit: 100
  };
};
