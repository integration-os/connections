const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    usergroup: "string", // Required
    users: "string", // Required

    // include_count: true,
  };
};
