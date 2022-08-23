const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    file: "<string>", // Required

    // expand: ["string"],
    // expires_at: "<unix-time>",
    // metadata: { property1: "string", property2: "string" },
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
