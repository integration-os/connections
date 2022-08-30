const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    requester_id: "string", // Required
    message: "string", // Required
    responder_request_targets: [
      {
        type: "string",
        id: "string",
        summary: "string",
        incident_responders: [
          {
            state: "pending",
            user: { type: "user_reference" },
            incident: { type: "incident_reference" },
            updated_at: "string",
            message: "string",
            requester: { type: "user_reference" },
            requested_at: "string",
          },
        ],
      },
    ], // Required
  };
};
