const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // file: "string",
    // count: "string",
    // page: "string",
    // limit: 0,
    // cursor: "string",
  };
};