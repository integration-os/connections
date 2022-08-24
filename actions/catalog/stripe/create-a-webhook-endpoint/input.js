const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    enabled_events: ["*"], // Required
    url: "<string>", // Required

    // api_version: "<string>",
    // connect: "<boolean>",
    // description: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // enabled_events0: "<string>",
    // enabled_events1: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
