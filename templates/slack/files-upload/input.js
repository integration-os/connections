const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // channels: "string",
    // content: "string",
    // file: "string",
    // filename: "string",
    // filetype: "string",
    // initial_comment: "string",
    // thread_ts: 0,
    // title: "string",
    // token: "string",
  };
};
