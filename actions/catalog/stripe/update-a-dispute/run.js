const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    dispute,
    evidence,
    expand,
    metadata,
    evidenceCanceledAdditional_documentation,
    evidenceCanceledCanceled_at,
    evidenceCanceledCancellation_policy_provided,
    evidenceCanceledCancellation_reason,
    evidenceCanceledExpected_at,
    evidenceCanceledExplanation,
    evidenceCanceledProduct_description,
    evidenceCanceledProduct_type,
    evidenceCanceledReturn_status,
    evidenceCanceledReturned_at,
    evidenceDuplicateAdditional_documentation,
    evidenceDuplicateCard_statement,
    evidenceDuplicateCash_receipt,
    evidenceDuplicateCheck_image,
    evidenceDuplicateExplanation,
    evidenceDuplicateOriginal_transaction,
    evidenceFraudulentAdditional_documentation,
    evidenceFraudulentExplanation,
    evidenceMerchandise_not_as_describedAdditional_documentation,
    evidenceMerchandise_not_as_describedExplanation,
    evidenceMerchandise_not_as_describedReceived_at,
    evidenceMerchandise_not_as_describedReturn_description,
    evidenceMerchandise_not_as_describedReturn_status,
    evidenceMerchandise_not_as_describedReturned_at,
    evidenceNot_receivedAdditional_documentation,
    evidenceNot_receivedExpected_at,
    evidenceNot_receivedExplanation,
    evidenceNot_receivedProduct_description,
    evidenceNot_receivedProduct_type,
    evidenceOtherAdditional_documentation,
    evidenceOtherExplanation,
    evidenceOtherProduct_description,
    evidenceOtherProduct_type,
    evidenceReason,
    evidenceService_not_as_describedAdditional_documentation,
    evidenceService_not_as_describedCanceled_at,
    evidenceService_not_as_describedCancellation_reason,
    evidenceService_not_as_describedExplanation,
    evidenceService_not_as_describedReceived_at,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/issuing/disputes/${dispute}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(evidence ? { evidence } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(evidenceCanceledAdditional_documentation
          ? {
              "evidence[canceled][additional_documentation]":
                evidenceCanceledAdditional_documentation,
            }
          : {}),
        ...(evidenceCanceledCanceled_at
          ? { "evidence[canceled][canceled_at]": evidenceCanceledCanceled_at }
          : {}),
        ...(evidenceCanceledCancellation_policy_provided
          ? {
              "evidence[canceled][cancellation_policy_provided]":
                evidenceCanceledCancellation_policy_provided,
            }
          : {}),
        ...(evidenceCanceledCancellation_reason
          ? { "evidence[canceled][cancellation_reason]": evidenceCanceledCancellation_reason }
          : {}),
        ...(evidenceCanceledExpected_at
          ? { "evidence[canceled][expected_at]": evidenceCanceledExpected_at }
          : {}),
        ...(evidenceCanceledExplanation
          ? { "evidence[canceled][explanation]": evidenceCanceledExplanation }
          : {}),
        ...(evidenceCanceledProduct_description
          ? { "evidence[canceled][product_description]": evidenceCanceledProduct_description }
          : {}),
        ...(evidenceCanceledProduct_type
          ? { "evidence[canceled][product_type]": evidenceCanceledProduct_type }
          : {}),
        ...(evidenceCanceledReturn_status
          ? { "evidence[canceled][return_status]": evidenceCanceledReturn_status }
          : {}),
        ...(evidenceCanceledReturned_at
          ? { "evidence[canceled][returned_at]": evidenceCanceledReturned_at }
          : {}),
        ...(evidenceDuplicateAdditional_documentation
          ? {
              "evidence[duplicate][additional_documentation]":
                evidenceDuplicateAdditional_documentation,
            }
          : {}),
        ...(evidenceDuplicateCard_statement
          ? { "evidence[duplicate][card_statement]": evidenceDuplicateCard_statement }
          : {}),
        ...(evidenceDuplicateCash_receipt
          ? { "evidence[duplicate][cash_receipt]": evidenceDuplicateCash_receipt }
          : {}),
        ...(evidenceDuplicateCheck_image
          ? { "evidence[duplicate][check_image]": evidenceDuplicateCheck_image }
          : {}),
        ...(evidenceDuplicateExplanation
          ? { "evidence[duplicate][explanation]": evidenceDuplicateExplanation }
          : {}),
        ...(evidenceDuplicateOriginal_transaction
          ? { "evidence[duplicate][original_transaction]": evidenceDuplicateOriginal_transaction }
          : {}),
        ...(evidenceFraudulentAdditional_documentation
          ? {
              "evidence[fraudulent][additional_documentation]":
                evidenceFraudulentAdditional_documentation,
            }
          : {}),
        ...(evidenceFraudulentExplanation
          ? { "evidence[fraudulent][explanation]": evidenceFraudulentExplanation }
          : {}),
        ...(evidenceMerchandise_not_as_describedAdditional_documentation
          ? {
              "evidence[merchandise_not_as_described][additional_documentation]":
                evidenceMerchandise_not_as_describedAdditional_documentation,
            }
          : {}),
        ...(evidenceMerchandise_not_as_describedExplanation
          ? {
              "evidence[merchandise_not_as_described][explanation]":
                evidenceMerchandise_not_as_describedExplanation,
            }
          : {}),
        ...(evidenceMerchandise_not_as_describedReceived_at
          ? {
              "evidence[merchandise_not_as_described][received_at]":
                evidenceMerchandise_not_as_describedReceived_at,
            }
          : {}),
        ...(evidenceMerchandise_not_as_describedReturn_description
          ? {
              "evidence[merchandise_not_as_described][return_description]":
                evidenceMerchandise_not_as_describedReturn_description,
            }
          : {}),
        ...(evidenceMerchandise_not_as_describedReturn_status
          ? {
              "evidence[merchandise_not_as_described][return_status]":
                evidenceMerchandise_not_as_describedReturn_status,
            }
          : {}),
        ...(evidenceMerchandise_not_as_describedReturned_at
          ? {
              "evidence[merchandise_not_as_described][returned_at]":
                evidenceMerchandise_not_as_describedReturned_at,
            }
          : {}),
        ...(evidenceNot_receivedAdditional_documentation
          ? {
              "evidence[not_received][additional_documentation]":
                evidenceNot_receivedAdditional_documentation,
            }
          : {}),
        ...(evidenceNot_receivedExpected_at
          ? { "evidence[not_received][expected_at]": evidenceNot_receivedExpected_at }
          : {}),
        ...(evidenceNot_receivedExplanation
          ? { "evidence[not_received][explanation]": evidenceNot_receivedExplanation }
          : {}),
        ...(evidenceNot_receivedProduct_description
          ? {
              "evidence[not_received][product_description]":
                evidenceNot_receivedProduct_description,
            }
          : {}),
        ...(evidenceNot_receivedProduct_type
          ? { "evidence[not_received][product_type]": evidenceNot_receivedProduct_type }
          : {}),
        ...(evidenceOtherAdditional_documentation
          ? { "evidence[other][additional_documentation]": evidenceOtherAdditional_documentation }
          : {}),
        ...(evidenceOtherExplanation
          ? { "evidence[other][explanation]": evidenceOtherExplanation }
          : {}),
        ...(evidenceOtherProduct_description
          ? { "evidence[other][product_description]": evidenceOtherProduct_description }
          : {}),
        ...(evidenceOtherProduct_type
          ? { "evidence[other][product_type]": evidenceOtherProduct_type }
          : {}),
        ...(evidenceReason ? { "evidence[reason]": evidenceReason } : {}),
        ...(evidenceService_not_as_describedAdditional_documentation
          ? {
              "evidence[service_not_as_described][additional_documentation]":
                evidenceService_not_as_describedAdditional_documentation,
            }
          : {}),
        ...(evidenceService_not_as_describedCanceled_at
          ? {
              "evidence[service_not_as_described][canceled_at]":
                evidenceService_not_as_describedCanceled_at,
            }
          : {}),
        ...(evidenceService_not_as_describedCancellation_reason
          ? {
              "evidence[service_not_as_described][cancellation_reason]":
                evidenceService_not_as_describedCancellation_reason,
            }
          : {}),
        ...(evidenceService_not_as_describedExplanation
          ? {
              "evidence[service_not_as_described][explanation]":
                evidenceService_not_as_describedExplanation,
            }
          : {}),
        ...(evidenceService_not_as_describedReceived_at
          ? {
              "evidence[service_not_as_described][received_at]":
                evidenceService_not_as_describedReceived_at,
            }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, dispute }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_DISPUTE: "A valid dispute field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof dispute !== "string") throw new Error(ERRORS.INVALID_DISPUTE);
};
