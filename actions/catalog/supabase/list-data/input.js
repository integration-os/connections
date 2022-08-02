const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required
    tableName: "your-table-name", // Required
    columns: "column1, column2", // Required - Comma separated list of columns to select
    __namedParameters: {
      head: false, // Required - When set to true, select will void data
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },

    // pageSize: 10,
    // page: 1,
  };
};
