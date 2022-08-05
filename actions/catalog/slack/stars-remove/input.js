const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // channel: "string",
    // file: "string",
    // file_comment: "string",
    // timestamp: "string",
  };
};
