const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    name: "string", // Required

    // channel: "string",
    // file: "string",
    // file_comment: "string",
    // timestamp: "string",
  };
};
