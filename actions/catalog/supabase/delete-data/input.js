const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required
    tableName: "your-table-name", // Required
    __namedParameters: {
      returning: "minimal", // Required - Set this to "representation" if you need the whole value returned
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },

    // Required - Object with match values
    match: {
      name: "John Doe",
    },
  };
};
