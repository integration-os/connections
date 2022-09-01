const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required

    // account_holder: { account: "string", customer: "string" },
    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // session: "string",
    // starting_after: "string",
  };
};
