const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // view_id: "string",
    // external_id: "string",
    // view: "string",
    // hash: "string",
  };
};
