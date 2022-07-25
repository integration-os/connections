const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // channel: "string",
    // include_locale: true,
    // include_num_members: true,
  };
};
