const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_POSTGRESQL_CONNECTION_KEY: $env.BUILDABLE_POSTGRESQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required

    // query: {
    //   column1: "someValue"
    // },
  };
};
