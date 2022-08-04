const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // channel: "string",
    // ts: 0,
    // latest: 0,
    // oldest: 0,
    // inclusive: true,
    // limit: 0,
    // cursor: "string",
  };
};
