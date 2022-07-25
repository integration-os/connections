const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required
    tableName: "your-table-name", // Required
    __namedParameters: {
      returning: "representation", // Required - Set this to "minimal" if you don't need this value returned
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },

    // Required - Object with updated values
    values: {
      status: "DO_NOT_DISTURB",
    },

    // Required - Object with match values
    match: {
      name: "John Doe",
    },
  };
};
