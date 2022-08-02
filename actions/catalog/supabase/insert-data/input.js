const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required
    tableName: "your-table-name", // Required

    // Required - Object or array of objects to insert
    values: [
      {
        name: "John Doe",
        organization: "Buildable",
        organizationId: 23,
      },
    ],

    // upsert: true,
  };
};
