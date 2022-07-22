const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_MYSQL_CONNECTION_KEY: $env.BUILDABLE_MYSQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required

    column1: "value1",
    //column2: "value2"
  };
};
