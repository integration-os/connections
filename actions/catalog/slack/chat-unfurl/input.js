const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel: "string", // Required
    ts: "string", // Required

    // unfurls: "string",
    // user_auth_message: "string",
    // user_auth_required: true,
    // user_auth_url: "string",
  };
};
