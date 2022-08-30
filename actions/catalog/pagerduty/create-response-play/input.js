const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    response_play: {
      type: "response_play",
      name: "string",
      description: "string",
      team: { type: "team_reference" },
      subscribers: [{ type: "user_reference" }],
      subscribers_message: "string",
      responders: [{ type: "user_reference" }],
      responders_message: "string",
      runnability: "services",
      conference_number: "string",
      conference_url: "string",
      conference_type: "none",
    }, // Required
  };
};
