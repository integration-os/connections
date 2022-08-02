const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    external_unique_id: "string", // Required
    join_url: "string", // Required

    // created_by: "string",
    // date_start: 0,
    // desktop_app_join_url: "string",
    // external_display_id: "string",
    // title: "string",
    // users: "string",
  };
};
