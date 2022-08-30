const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required

    // limit: 0,
    // cursor: "string",
    // since: "2019-08-24T14:15:22Z",
    // until: "2019-08-24T14:15:22Z",
    // root_resource_types: "users",
    // actor_type: "user_reference",
    // actor_id: "P123456",
    // method_type: "browser",
    // method_truncated_token: "3xyz",
    // actions: "create",
  };
};
