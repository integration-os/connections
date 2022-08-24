const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    webhook_endpoint: "string", // Required

    // description: "<string>",
    // disabled: "<boolean>",
    // enabled_events: ["*"],
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // url: "<string>",
    // enabled_events0: "<string>",
    // enabled_events1: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
