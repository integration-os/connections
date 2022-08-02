const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // user: "string",
    // channel: "string",
    // ts_from: 0,
    // ts_to: 0,
    // types: "string",
    // count: "string",
    // page: "string",
    // show_files_hidden_by_limit: true,
  };
};
