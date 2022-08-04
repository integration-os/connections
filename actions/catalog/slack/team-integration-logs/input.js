const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // app_id: "string",
    // change_type: "string",
    // count: "string",
    // page: "string",
    // service_id: "string",
    // user: "string",
  };
};
