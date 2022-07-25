const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_POSTGRESQL_CONNECTION_KEY: $env.BUILDABLE_POSTGRESQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required

    column1: "value1",
    //column2: "value2"
  };
};
