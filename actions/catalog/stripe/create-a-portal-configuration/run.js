const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    business_profile,
    features,
    default_return_url,
    expand,
    metadata,
    business_profileHeadline,
    business_profilePrivacy_policy_url,
    business_profileTerms_of_service_url,
    featuresCustomer_updateEnabled,
    featuresCustomer_updateAllowed_updates0,
    featuresCustomer_updateAllowed_updates1,
    featuresInvoice_historyEnabled,
    featuresPayment_method_updateEnabled,
    featuresSubscription_cancelEnabled,
    featuresSubscription_cancelCancellation_reasonEnabled,
    featuresSubscription_cancelCancellation_reasonOptions0,
    featuresSubscription_cancelCancellation_reasonOptions1,
    featuresSubscription_cancelMode,
    featuresSubscription_cancelProration_behavior,
    featuresSubscription_pauseEnabled,
    featuresSubscription_updateDefault_allowed_updates0,
    featuresSubscription_updateDefault_allowed_updates1,
    featuresSubscription_updateEnabled,
    featuresSubscription_updateProducts0Prices0,
    featuresSubscription_updateProducts0Prices1,
    featuresSubscription_updateProducts0Product,
    featuresSubscription_updateProducts1Prices0,
    featuresSubscription_updateProducts1Prices1,
    featuresSubscription_updateProducts1Product,
    featuresSubscription_updateProration_behavior,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/billing_portal/configurations",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        business_profile,
        features,
        ...(default_return_url ? { default_return_url } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(business_profileHeadline
          ? { "business_profile[headline]": business_profileHeadline }
          : {}),
        ...(business_profilePrivacy_policy_url
          ? { "business_profile[privacy_policy_url]": business_profilePrivacy_policy_url }
          : {}),
        ...(business_profileTerms_of_service_url
          ? { "business_profile[terms_of_service_url]": business_profileTerms_of_service_url }
          : {}),
        ...(featuresCustomer_updateEnabled
          ? { "features[customer_update][enabled]": featuresCustomer_updateEnabled }
          : {}),
        ...(featuresCustomer_updateAllowed_updates0
          ? {
              "features[customer_update][allowed_updates][0]":
                featuresCustomer_updateAllowed_updates0,
            }
          : {}),
        ...(featuresCustomer_updateAllowed_updates1
          ? {
              "features[customer_update][allowed_updates][1]":
                featuresCustomer_updateAllowed_updates1,
            }
          : {}),
        ...(featuresInvoice_historyEnabled
          ? { "features[invoice_history][enabled]": featuresInvoice_historyEnabled }
          : {}),
        ...(featuresPayment_method_updateEnabled
          ? { "features[payment_method_update][enabled]": featuresPayment_method_updateEnabled }
          : {}),
        ...(featuresSubscription_cancelEnabled
          ? { "features[subscription_cancel][enabled]": featuresSubscription_cancelEnabled }
          : {}),
        ...(featuresSubscription_cancelCancellation_reasonEnabled
          ? {
              "features[subscription_cancel][cancellation_reason][enabled]":
                featuresSubscription_cancelCancellation_reasonEnabled,
            }
          : {}),
        ...(featuresSubscription_cancelCancellation_reasonOptions0
          ? {
              "features[subscription_cancel][cancellation_reason][options][0]":
                featuresSubscription_cancelCancellation_reasonOptions0,
            }
          : {}),
        ...(featuresSubscription_cancelCancellation_reasonOptions1
          ? {
              "features[subscription_cancel][cancellation_reason][options][1]":
                featuresSubscription_cancelCancellation_reasonOptions1,
            }
          : {}),
        ...(featuresSubscription_cancelMode
          ? { "features[subscription_cancel][mode]": featuresSubscription_cancelMode }
          : {}),
        ...(featuresSubscription_cancelProration_behavior
          ? {
              "features[subscription_cancel][proration_behavior]":
                featuresSubscription_cancelProration_behavior,
            }
          : {}),
        ...(featuresSubscription_pauseEnabled
          ? { "features[subscription_pause][enabled]": featuresSubscription_pauseEnabled }
          : {}),
        ...(featuresSubscription_updateDefault_allowed_updates0
          ? {
              "features[subscription_update][default_allowed_updates][0]":
                featuresSubscription_updateDefault_allowed_updates0,
            }
          : {}),
        ...(featuresSubscription_updateDefault_allowed_updates1
          ? {
              "features[subscription_update][default_allowed_updates][1]":
                featuresSubscription_updateDefault_allowed_updates1,
            }
          : {}),
        ...(featuresSubscription_updateEnabled
          ? { "features[subscription_update][enabled]": featuresSubscription_updateEnabled }
          : {}),
        ...(featuresSubscription_updateProducts0Prices0
          ? {
              "features[subscription_update][products][0][prices][0]":
                featuresSubscription_updateProducts0Prices0,
            }
          : {}),
        ...(featuresSubscription_updateProducts0Prices1
          ? {
              "features[subscription_update][products][0][prices][1]":
                featuresSubscription_updateProducts0Prices1,
            }
          : {}),
        ...(featuresSubscription_updateProducts0Product
          ? {
              "features[subscription_update][products][0][product]":
                featuresSubscription_updateProducts0Product,
            }
          : {}),
        ...(featuresSubscription_updateProducts1Prices0
          ? {
              "features[subscription_update][products][1][prices][0]":
                featuresSubscription_updateProducts1Prices0,
            }
          : {}),
        ...(featuresSubscription_updateProducts1Prices1
          ? {
              "features[subscription_update][products][1][prices][1]":
                featuresSubscription_updateProducts1Prices1,
            }
          : {}),
        ...(featuresSubscription_updateProducts1Product
          ? {
              "features[subscription_update][products][1][product]":
                featuresSubscription_updateProducts1Product,
            }
          : {}),
        ...(featuresSubscription_updateProration_behavior
          ? {
              "features[subscription_update][proration_behavior]":
                featuresSubscription_updateProration_behavior,
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, business_profile, features }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_BUSINESS_PROFILE:
      "A valid business_profile field (object) was not provided in the input.",
    INVALID_FEATURES: "A valid features field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof business_profile !== "object") throw new Error(ERRORS.INVALID_BUSINESS_PROFILE);
  if (typeof features !== "object") throw new Error(ERRORS.INVALID_FEATURES);
};
