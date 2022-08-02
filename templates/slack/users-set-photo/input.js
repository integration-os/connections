const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    token: "string", // Required

    // crop_w: "string",
    // crop_x: "string",
    // crop_y: "string",
    // image: "string",
  };
};
