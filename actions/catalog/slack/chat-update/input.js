const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel: "string", // Required
    ts: "string", // Required

    // as_user: "string",
    // attachments: "string",
    // blocks: "string",
    // link_names: "string",
    // parse: "string",
    // text: "string",
  };
};
