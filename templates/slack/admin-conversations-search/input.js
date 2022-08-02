const nodeInput = ({ $body, $headers, $env, $data }) => {
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
