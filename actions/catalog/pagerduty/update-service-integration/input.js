const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    integration_id: "string", // Required
    integration: {
      type: "aws_cloudwatch_inbound_integration",
      name: "string",
      service: { type: "service_reference" },
      vendor: { type: "vendor_reference" },
      integration_email: "string",
      email_incident_creation: "on_new_email",
      email_filter_mode: "all-email",
      email_parsers: [
        {
          action: "trigger",
          match_predicate: { type: "all", matcher: "string", part: "body", children: [{}] },
          value_extractors: [
            {
              type: "entire",
              part: "body",
              value_name: "string",
              regex: "string",
              starts_after: "string",
              ends_with: "string",
            },
          ],
        },
      ],
      email_parsing_fallback: "open_new_incident",
      email_filters: [
        {
          subject_mode: "match",
          subject_regex: "string",
          body_mode: "match",
          body_regex: "string",
          from_email_mode: "match",
          from_email_regex: "string",
        },
      ],
    }, // Required
  };
};
