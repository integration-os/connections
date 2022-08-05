const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    query: "string", // Required

    // count: 0,
    // highlight: true,
    // page: 0,
    // sort: "string",
    // sort_dir: "string",
  };
};
