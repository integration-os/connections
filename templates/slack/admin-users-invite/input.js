const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    channel_ids: "string", // Required
    email: "string", // Required
    team_id: "string", // Required

    // custom_message: "string",
    // guest_expiration_ts: "string",
    // is_restricted: true,
    // is_ultra_restricted: true,
    // real_name: "string",
    // resend: true,
  };
};
