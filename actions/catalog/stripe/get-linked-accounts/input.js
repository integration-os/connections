const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required

    // account_holder: { account: "string", customer: "string" },
    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // session: "string",
    // starting_after: "string",
  };
};
