const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    line_items,
    after_completion,
    allow_promotion_codes,
    application_fee_amount,
    application_fee_percent,
    automatic_tax,
    billing_address_collection,
    consent_collection,
    currency,
    customer_creation,
    expand,
    metadata,
    on_behalf_of,
    payment_intent_data,
    payment_method_types,
    phone_number_collection,
    shipping_address_collection,
    shipping_options,
    submit_type,
    subscription_data,
    tax_id_collection,
    transfer_data,
    line_items0Price,
    line_items0Quantity,
    line_items0Adjustable_quantityEnabled,
    line_items0Adjustable_quantityMaximum,
    line_items0Adjustable_quantityMinimum,
    line_items1Price,
    line_items1Quantity,
    line_items1Adjustable_quantityEnabled,
    line_items1Adjustable_quantityMaximum,
    line_items1Adjustable_quantityMinimum,
    after_completionType,
    after_completionHosted_confirmationCustom_message,
    after_completionRedirectUrl,
    automatic_taxEnabled,
    consent_collectionPromotions,
    expand0,
    expand1,
    payment_intent_dataCapture_method,
    payment_intent_dataSetup_future_usage,
    payment_method_types0,
    payment_method_types1,
    phone_number_collectionEnabled,
    shipping_address_collectionAllowed_countries0,
    shipping_address_collectionAllowed_countries1,
    shipping_options0Shipping_rate,
    shipping_options1Shipping_rate,
    subscription_dataTrial_period_days,
    tax_id_collectionEnabled,
    transfer_dataDestination,
    transfer_dataAmount,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/payment_links",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        line_items,
        ...(after_completion ? { after_completion } : {}),
        ...(allow_promotion_codes ? { allow_promotion_codes } : {}),
        ...(application_fee_amount ? { application_fee_amount } : {}),
        ...(application_fee_percent ? { application_fee_percent } : {}),
        ...(automatic_tax ? { automatic_tax } : {}),
        ...(billing_address_collection ? { billing_address_collection } : {}),
        ...(consent_collection ? { consent_collection } : {}),
        ...(currency ? { currency } : {}),
        ...(customer_creation ? { customer_creation } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(on_behalf_of ? { on_behalf_of } : {}),
        ...(payment_intent_data ? { payment_intent_data } : {}),
        ...(payment_method_types ? { payment_method_types } : {}),
        ...(phone_number_collection ? { phone_number_collection } : {}),
        ...(shipping_address_collection ? { shipping_address_collection } : {}),
        ...(shipping_options ? { shipping_options } : {}),
        ...(submit_type ? { submit_type } : {}),
        ...(subscription_data ? { subscription_data } : {}),
        ...(tax_id_collection ? { tax_id_collection } : {}),
        ...(transfer_data ? { transfer_data } : {}),
        ...(line_items0Price ? { "line_items[0][price]": line_items0Price } : {}),
        ...(line_items0Quantity ? { "line_items[0][quantity]": line_items0Quantity } : {}),
        ...(line_items0Adjustable_quantityEnabled
          ? { "line_items[0][adjustable_quantity][enabled]": line_items0Adjustable_quantityEnabled }
          : {}),
        ...(line_items0Adjustable_quantityMaximum
          ? { "line_items[0][adjustable_quantity][maximum]": line_items0Adjustable_quantityMaximum }
          : {}),
        ...(line_items0Adjustable_quantityMinimum
          ? { "line_items[0][adjustable_quantity][minimum]": line_items0Adjustable_quantityMinimum }
          : {}),
        ...(line_items1Price ? { "line_items[1][price]": line_items1Price } : {}),
        ...(line_items1Quantity ? { "line_items[1][quantity]": line_items1Quantity } : {}),
        ...(line_items1Adjustable_quantityEnabled
          ? { "line_items[1][adjustable_quantity][enabled]": line_items1Adjustable_quantityEnabled }
          : {}),
        ...(line_items1Adjustable_quantityMaximum
          ? { "line_items[1][adjustable_quantity][maximum]": line_items1Adjustable_quantityMaximum }
          : {}),
        ...(line_items1Adjustable_quantityMinimum
          ? { "line_items[1][adjustable_quantity][minimum]": line_items1Adjustable_quantityMinimum }
          : {}),
        ...(after_completionType ? { "after_completion[type]": after_completionType } : {}),
        ...(after_completionHosted_confirmationCustom_message
          ? {
              "after_completion[hosted_confirmation][custom_message]":
                after_completionHosted_confirmationCustom_message,
            }
          : {}),
        ...(after_completionRedirectUrl
          ? { "after_completion[redirect][url]": after_completionRedirectUrl }
          : {}),
        ...(automatic_taxEnabled ? { "automatic_tax[enabled]": automatic_taxEnabled } : {}),
        ...(consent_collectionPromotions
          ? { "consent_collection[promotions]": consent_collectionPromotions }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(payment_intent_dataCapture_method
          ? { "payment_intent_data[capture_method]": payment_intent_dataCapture_method }
          : {}),
        ...(payment_intent_dataSetup_future_usage
          ? { "payment_intent_data[setup_future_usage]": payment_intent_dataSetup_future_usage }
          : {}),
        ...(payment_method_types0 ? { "payment_method_types[0]": payment_method_types0 } : {}),
        ...(payment_method_types1 ? { "payment_method_types[1]": payment_method_types1 } : {}),
        ...(phone_number_collectionEnabled
          ? { "phone_number_collection[enabled]": phone_number_collectionEnabled }
          : {}),
        ...(shipping_address_collectionAllowed_countries0
          ? {
              "shipping_address_collection[allowed_countries][0]":
                shipping_address_collectionAllowed_countries0,
            }
          : {}),
        ...(shipping_address_collectionAllowed_countries1
          ? {
              "shipping_address_collection[allowed_countries][1]":
                shipping_address_collectionAllowed_countries1,
            }
          : {}),
        ...(shipping_options0Shipping_rate
          ? { "shipping_options[0][shipping_rate]": shipping_options0Shipping_rate }
          : {}),
        ...(shipping_options1Shipping_rate
          ? { "shipping_options[1][shipping_rate]": shipping_options1Shipping_rate }
          : {}),
        ...(subscription_dataTrial_period_days
          ? { "subscription_data[trial_period_days]": subscription_dataTrial_period_days }
          : {}),
        ...(tax_id_collectionEnabled
          ? { "tax_id_collection[enabled]": tax_id_collectionEnabled }
          : {}),
        ...(transfer_dataDestination
          ? { "transfer_data[destination]": transfer_dataDestination }
          : {}),
        ...(transfer_dataAmount ? { "transfer_data[amount]": transfer_dataAmount } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, line_items }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_LINE_ITEMS: "A valid line_items field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof line_items !== "object") throw new Error(ERRORS.INVALID_LINE_ITEMS);
};
