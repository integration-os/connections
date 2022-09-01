const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    report_type: "<string>", // Required

    // expand: ["string"],
    // parameters: {
    //     columns: ["string"],
    //     connected_account: "string",
    //     currency: "string",
    //     interval_end: 0,
    //     interval_start: 0,
    //     payout: "string",
    //     reporting_category: "advance",
    //     timezone: "Africa/Abidjan"
    //   },
    // expand0: "<string>",
    // expand1: "<string>",
    // parametersColumns0: "<string>",
    // parametersColumns1: "<string>",
    // parametersConnected_account: "<string>",
    // parametersCurrency: "<string>",
    // parametersInterval_end: "<unix-time>",
    // parametersInterval_start: "<unix-time>",
    // parametersPayout: "<string>",
    // parametersReporting_category: "<string>",
    // parametersTimezone: "<string>",
  };
};
