const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    account: "string", // Required
    capability: "string", // Required

    // expand: ["string"],
    // requested: "<boolean>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
