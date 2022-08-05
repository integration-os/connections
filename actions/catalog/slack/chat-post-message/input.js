const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel: "string", // Required

    // as_user: "string",
    // attachments: "string",
    // blocks: "string",
    // icon_emoji: "string",
    // icon_url: "string",
    // link_names: true,
    // mrkdwn: true,
    // parse: "string",
    // reply_broadcast: true,
    // text: "string",
    // thread_ts: "string",
    // unfurl_links: true,
    // unfurl_media: true,
    // username: "string",
  };
};
