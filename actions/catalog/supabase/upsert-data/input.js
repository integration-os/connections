const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required
    tableName: "your-table-name", // Required
    __namedParameters: {
      returning: "representation", // Required - Set this to "minimal" if you don't need this value returned
      onConflict: undefined, // Required - Set this to a parameter name to UPSERT columns with a UNIQUE constraint
      ignoreDuplicates: true, // Required - Set this to true to ignore duplicate rows
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },

    // Required - Object or array of objects to insert
    values: {
      name: "John Doe",
      organization: "Buildable",
      organizationId: 23,
    },
  };
};
