const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    entity_type: "users", // Required
    id: "string", // Required

    // add: [{ type: "tag", label: "string" }],
    // remove: [{ type: "tag_reference" }],
  };
};
