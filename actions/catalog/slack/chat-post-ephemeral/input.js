const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel: "string", // Required
    user: "string", // Required

    // as_user: true,
    // attachments: "string",
    // blocks: "string",
    // icon_emoji: "string",
    // icon_url: "string",
    // link_names: true,
    // parse: "string",
    // text: "string",
    // thread_ts: "string",
    // username: "string",
  };
};
