const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SENDGRID_API_KEY: $env.BUILDABLE_SENDGRID_API_KEY, // Required
    page_size: 10, // Required

    // generation: "legacy,dynamic", // Generations of templates to return (i.e. "legacy", "dynamic", "legacy,dynamic")
    // page_token: "", // A token corresponding to a specific page of results, as provided by metadata
  };
};
