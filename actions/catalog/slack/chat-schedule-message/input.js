const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // as_user: true,
    // attachments: "string",
    // blocks: "string",
    // channel: "string",
    // link_names: true,
    // parse: "string",
    // post_at: "string",
    // reply_broadcast: true,
    // text: "string",
    // thread_ts: 0,
    // unfurl_links: true,
    // unfurl_media: true,
  };
};
