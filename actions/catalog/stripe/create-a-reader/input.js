const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    registration_code: "<string>", // Required

    // expand: ["string"],
    // label: "<string>",
    // location: "<string>",
    // metadata: { property1: "string", property2: "string" },
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
