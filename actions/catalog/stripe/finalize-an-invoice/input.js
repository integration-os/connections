const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    invoice: "string", // Required

    // auto_advance: "<boolean>",
    // expand: ["string"],
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
