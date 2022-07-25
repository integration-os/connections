const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // external_id: "string",
    // external_url: "string",
    // file: "string",
    // filetype: "string",
    // indexable_file_contents: "string",
    // preview_image: "string",
    // title: "string",
    // token: "string",
  };
};
