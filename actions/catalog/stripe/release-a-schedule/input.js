const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    schedule: "string", // Required

    // expand: ["string"],
    // preserve_cancel_date: "<boolean>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
