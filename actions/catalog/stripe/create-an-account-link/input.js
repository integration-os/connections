const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    account: "<string>", // Required
    type: "<string>", // Required

    // collect: "<string>",
    // expand: ["string"],
    // refresh_url: "<string>",
    // return_url: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
