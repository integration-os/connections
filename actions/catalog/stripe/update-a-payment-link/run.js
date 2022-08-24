const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    payment_link,
    active,
    after_completion,
    allow_promotion_codes,
    automatic_tax,
    billing_address_collection,
    customer_creation,
    expand,
    line_items,
    metadata,
    payment_method_types,
    shipping_address_collection,
    after_completionType,
    after_completionHosted_confirmationCustom_message,
    after_completionRedirectUrl,
    automatic_taxEnabled,
    expand0,
    expand1,
    line_items0Id,
    line_items0Adjustable_quantityEnabled,
    line_items0Adjustable_quantityMaximum,
    line_items0Adjustable_quantityMinimum,
    line_items0Quantity,
    line_items1Id,
    line_items1Adjustable_quantityEnabled,
    line_items1Adjustable_quantityMaximum,
    line_items1Adjustable_quantityMinimum,
    line_items1Quantity,
    payment_method_types0,
    payment_method_types1,
    shipping_address_collectionAllowed_countries0,
    shipping_address_collectionAllowed_countries1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/payment_links/${payment_link}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(active ? { active } : {}),
        ...(after_completion ? { after_completion } : {}),
        ...(allow_promotion_codes ? { allow_promotion_codes } : {}),
        ...(automatic_tax ? { automatic_tax } : {}),
        ...(billing_address_collection ? { billing_address_collection } : {}),
        ...(customer_creation ? { customer_creation } : {}),
        ...(expand ? { expand } : {}),
        ...(line_items ? { line_items } : {}),
        ...(metadata ? { metadata } : {}),
        ...(payment_method_types ? { payment_method_types } : {}),
        ...(shipping_address_collection ? { shipping_address_collection } : {}),
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
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(line_items0Id ? { "line_items[0][id]": line_items0Id } : {}),
        ...(line_items0Adjustable_quantityEnabled
          ? { "line_items[0][adjustable_quantity][enabled]": line_items0Adjustable_quantityEnabled }
          : {}),
        ...(line_items0Adjustable_quantityMaximum
          ? { "line_items[0][adjustable_quantity][maximum]": line_items0Adjustable_quantityMaximum }
          : {}),
        ...(line_items0Adjustable_quantityMinimum
          ? { "line_items[0][adjustable_quantity][minimum]": line_items0Adjustable_quantityMinimum }
          : {}),
        ...(line_items0Quantity ? { "line_items[0][quantity]": line_items0Quantity } : {}),
        ...(line_items1Id ? { "line_items[1][id]": line_items1Id } : {}),
        ...(line_items1Adjustable_quantityEnabled
          ? { "line_items[1][adjustable_quantity][enabled]": line_items1Adjustable_quantityEnabled }
          : {}),
        ...(line_items1Adjustable_quantityMaximum
          ? { "line_items[1][adjustable_quantity][maximum]": line_items1Adjustable_quantityMaximum }
          : {}),
        ...(line_items1Adjustable_quantityMinimum
          ? { "line_items[1][adjustable_quantity][minimum]": line_items1Adjustable_quantityMinimum }
          : {}),
        ...(line_items1Quantity ? { "line_items[1][quantity]": line_items1Quantity } : {}),
        ...(payment_method_types0 ? { "payment_method_types[0]": payment_method_types0 } : {}),
        ...(payment_method_types1 ? { "payment_method_types[1]": payment_method_types1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, payment_link }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_PAYMENT_LINK: "A valid payment_link field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof payment_link !== "string") throw new Error(ERRORS.INVALID_PAYMENT_LINK);
};
