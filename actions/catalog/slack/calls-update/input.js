const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    id: "string", // Required

    // desktop_app_join_url: "string",
    // join_url: "string",
    // title: "string",
  };
};
