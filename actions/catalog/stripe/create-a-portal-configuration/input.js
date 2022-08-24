const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    business_profile: {
      headline: "string",
      privacy_policy_url: "string",
      terms_of_service_url: "string",
    }, // Required
    features: {
      customer_update: { allowed_updates: ["address"], enabled: true },
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: {
        cancellation_reason: { enabled: true, options: ["customer_service"] },
        enabled: true,
        mode: "at_period_end",
        proration_behavior: "always_invoice",
      },
      subscription_pause: { enabled: true },
      subscription_update: {
        default_allowed_updates: ["price"],
        enabled: true,
        products: [{ prices: ["string"], product: "string" }],
        proration_behavior: "always_invoice",
      },
    }, // Required

    // default_return_url: "string",
    // expand: ["string"],
    // metadata: { property1: "string", property2: "string" },
    // business_profileHeadline: "<string>",
    // business_profilePrivacy_policy_url: "<string>",
    // business_profileTerms_of_service_url: "<string>",
    // featuresCustomer_updateEnabled: "<boolean>",
    // featuresCustomer_updateAllowed_updates0: "<string>",
    // featuresCustomer_updateAllowed_updates1: "<string>",
    // featuresInvoice_historyEnabled: "<boolean>",
    // featuresPayment_method_updateEnabled: "<boolean>",
    // featuresSubscription_cancelEnabled: "<boolean>",
    // featuresSubscription_cancelCancellation_reasonEnabled: "<boolean>",
    // featuresSubscription_cancelCancellation_reasonOptions0: "<string>",
    // featuresSubscription_cancelCancellation_reasonOptions1: "<string>",
    // featuresSubscription_cancelMode: "<string>",
    // featuresSubscription_cancelProration_behavior: "<string>",
    // featuresSubscription_pauseEnabled: "<boolean>",
    // featuresSubscription_updateDefault_allowed_updates0: "<string>",
    // featuresSubscription_updateDefault_allowed_updates1: "<string>",
    // featuresSubscription_updateEnabled: "<boolean>",
    // featuresSubscription_updateProducts0Prices0: "<string>",
    // featuresSubscription_updateProducts0Prices1: "<string>",
    // featuresSubscription_updateProducts0Product: "<string>",
    // featuresSubscription_updateProducts1Prices0: "<string>",
    // featuresSubscription_updateProducts1Prices1: "<string>",
    // featuresSubscription_updateProducts1Product: "<string>",
    // featuresSubscription_updateProration_behavior: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
