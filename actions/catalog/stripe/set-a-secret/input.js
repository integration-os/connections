const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    name: "<string>", // Required
    payload: "<string>", // Required
    scope: { type: "account", user: "string" }, // Required

    // expand: ["string"],
    // scopeType: "<string>",
    // scopeUser: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
