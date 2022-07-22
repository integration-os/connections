const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_MYSQL_CONNECTION_KEY: $env.BUILDABLE_MYSQL_CONNECTION_KEY, // Required
    query: "SELECT id FROM table_name LIMIT 10;",
    maxLimit: 100
  };
};
