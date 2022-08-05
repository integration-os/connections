const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel: "string", // Required
    scheduled_message_id: "string", // Required

    // as_user: true,
  };
};
