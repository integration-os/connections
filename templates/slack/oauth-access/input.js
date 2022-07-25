const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required

    // client_id: "string",
    // client_secret: "string",
    // code: "string",
    // redirect_uri: "string",
    // single_channel: true,
  };
};
