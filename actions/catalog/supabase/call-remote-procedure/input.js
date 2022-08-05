const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required

    functionName: "your-function-name", // Required - The name of the function to call
    functionParams: {}, // Required - Parameters to pass to the function

    __namedParameters: {
      returning: "representation", // Required - Set this to "minimal" if you don't need this value returned
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },
  };
};
