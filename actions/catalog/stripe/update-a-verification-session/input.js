const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    session: "string", // Required

    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // options: {
    //     document: {
    //       allowed_types: ["driving_license"],
    //       require_id_number: true,
    //       require_live_capture: true,
    //       require_matching_selfie: true
    //     }
    //   },
    // type: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // optionsDocumentAllowed_types0: "<string>",
    // optionsDocumentAllowed_types1: "<string>",
    // optionsDocumentRequire_id_number: "<boolean>",
    // optionsDocumentRequire_live_capture: "<boolean>",
    // optionsDocumentRequire_matching_selfie: "<boolean>",
  };
};
