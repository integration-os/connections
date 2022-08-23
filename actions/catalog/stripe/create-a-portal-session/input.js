const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    customer: "<string>", // Required

    // configuration: "<string>",
    // expand: ["string"],
    // locale: "<string>",
    // on_behalf_of: "<string>",
    // return_url: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
