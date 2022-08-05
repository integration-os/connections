const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    outbound_transfer: "string", // Required

    // expand: ["string"],
    // returned_details: { code: "account_closed" },
  };
};
