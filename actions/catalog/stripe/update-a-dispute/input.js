const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    dispute: "string", // Required

    // evidence: {
    //     canceled: {
    //       additional_documentation: "string",
    //       canceled_at: 0,
    //       cancellation_policy_provided: true,
    //       cancellation_reason: "string",
    //       expected_at: 0,
    //       explanation: "string",
    //       product_description: "string",
    //       product_type: "",
    //       return_status: "",
    //       returned_at: 0
    //     },
    //     duplicate: {
    //       additional_documentation: "string",
    //       card_statement: "string",
    //       cash_receipt: "string",
    //       check_image: "string",
    //       explanation: "string",
    //       original_transaction: "string"
    //     },
    //     fraudulent: { additional_documentation: "string", explanation: "string" },
    //     merchandise_not_as_described: {
    //       additional_documentation: "string",
    //       explanation: "string",
    //       received_at: 0,
    //       return_description: "string",
    //       return_status: "",
    //       returned_at: 0
    //     },
    //     not_received: {
    //       additional_documentation: "string",
    //       expected_at: 0,
    //       explanation: "string",
    //       product_description: "string",
    //       product_type: ""
    //     },
    //     other: {
    //       additional_documentation: "string",
    //       explanation: "string",
    //       product_description: "string",
    //       product_type: ""
    //     },
    //     reason: "canceled",
    //     service_not_as_described: {
    //       additional_documentation: "string",
    //       canceled_at: 0,
    //       cancellation_reason: "string",
    //       explanation: "string",
    //       received_at: 0
    //     }
    //   },
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // evidenceCanceledAdditional_documentation: "<string>",
    // evidenceCanceledCanceled_at: "<unix-time>",
    // evidenceCanceledCancellation_policy_provided: "<boolean>",
    // evidenceCanceledCancellation_reason: "<string>",
    // evidenceCanceledExpected_at: "<unix-time>",
    // evidenceCanceledExplanation: "<string>",
    // evidenceCanceledProduct_description: "<string>",
    // evidenceCanceledProduct_type: "<string>",
    // evidenceCanceledReturn_status: "<string>",
    // evidenceCanceledReturned_at: "<unix-time>",
    // evidenceDuplicateAdditional_documentation: "<string>",
    // evidenceDuplicateCard_statement: "<string>",
    // evidenceDuplicateCash_receipt: "<string>",
    // evidenceDuplicateCheck_image: "<string>",
    // evidenceDuplicateExplanation: "<string>",
    // evidenceDuplicateOriginal_transaction: "<string>",
    // evidenceFraudulentAdditional_documentation: "<string>",
    // evidenceFraudulentExplanation: "<string>",
    // evidenceMerchandise_not_as_describedAdditional_documentation: "<string>",
    // evidenceMerchandise_not_as_describedExplanation: "<string>",
    // evidenceMerchandise_not_as_describedReceived_at: "<unix-time>",
    // evidenceMerchandise_not_as_describedReturn_description: "<string>",
    // evidenceMerchandise_not_as_describedReturn_status: "<string>",
    // evidenceMerchandise_not_as_describedReturned_at: "<unix-time>",
    // evidenceNot_receivedAdditional_documentation: "<string>",
    // evidenceNot_receivedExpected_at: "<unix-time>",
    // evidenceNot_receivedExplanation: "<string>",
    // evidenceNot_receivedProduct_description: "<string>",
    // evidenceNot_receivedProduct_type: "<string>",
    // evidenceOtherAdditional_documentation: "<string>",
    // evidenceOtherExplanation: "<string>",
    // evidenceOtherProduct_description: "<string>",
    // evidenceOtherProduct_type: "<string>",
    // evidenceReason: "<string>",
    // evidenceService_not_as_describedAdditional_documentation: "<string>",
    // evidenceService_not_as_describedCanceled_at: "<unix-time>",
    // evidenceService_not_as_describedCancellation_reason: "<string>",
    // evidenceService_not_as_describedExplanation: "<string>",
    // evidenceService_not_as_describedReceived_at: "<unix-time>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
