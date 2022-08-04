const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // team_ids: "string",
    // query: "string",
    // limit: 0,
    // cursor: "string",
    // search_channel_types: "string",
    // sort: "string",
    // sort_dir: "string",
  };
};
