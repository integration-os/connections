const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    change_event: {
      summary: "Build Success - Increase snapshot create timeout to 30 seconds",
      timestamp: "2020-07-17T08:42:58Z",
      type: "change_event",
      source: "acme-build-pipeline-tool-default-i-9999",
      integration: { id: "PEYSGVF", type: "inbound_integration_reference" },
      services: [{ id: "PEYSGRV", type: "service_reference" }],
      custom_details: { build_state: "passed", build_number: "2", run_time: "1236s" },
      links: [{ href: "https://acme.pagerduty.dev/build/2", text: "View more details in Acme!" }],
    }, // Required
  };
};
