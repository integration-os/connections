const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    invoice: "string", // Required

    // expand: ["string"],
    // forgive: "<boolean>",
    // off_session: "<boolean>",
    // paid_out_of_band: "<boolean>",
    // payment_method: "<string>",
    // source: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // mandate: "<string>",
  };
};
