const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    location: "string", // Required

    // address: {
    //     city: "string",
    //     country: "string",
    //     line1: "string",
    //     line2: "string",
    //     postal_code: "string",
    //     state: "string"
    //   },
    // configuration_overrides: "<string>",
    // display_name: "<string>",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // addressCity: "<string>",
    // addressCountry: "<string>",
    // addressLine1: "<string>",
    // addressLine2: "<string>",
    // addressPostal_code: "<string>",
    // addressState: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
