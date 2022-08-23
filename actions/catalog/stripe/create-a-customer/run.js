const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    address,
    balance,
    cash_balance,
    coupon,
    description,
    email,
    expand,
    invoice_prefix,
    invoice_settings,
    metadata,
    name,
    next_invoice_sequence,
    payment_method,
    phone,
    preferred_locales,
    promotion_code,
    shipping,
    source,
    tax,
    tax_exempt,
    tax_id_data,
    test_clock,
    addressCity,
    addressCountry,
    addressLine1,
    addressLine2,
    addressPostal_code,
    addressState,
    cash_balanceSettingsReconciliation_mode,
    expand0,
    expand1,
    invoice_settingsCustom_fields0Name,
    invoice_settingsCustom_fields0Value,
    invoice_settingsCustom_fields1Name,
    invoice_settingsCustom_fields1Value,
    invoice_settingsDefault_payment_method,
    invoice_settingsFooter,
    invoice_settingsRendering_optionsAmount_tax_display,
    preferred_locales0,
    preferred_locales1,
    shippingAddressCity,
    shippingAddressCountry,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingAddressPostal_code,
    shippingAddressState,
    shippingName,
    shippingPhone,
    taxIp_address,
    tax_id_data0Type,
    tax_id_data0Value,
    tax_id_data1Type,
    tax_id_data1Value,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/customers",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(address ? { address } : {}),
        ...(balance ? { balance } : {}),
        ...(cash_balance ? { cash_balance } : {}),
        ...(coupon ? { coupon } : {}),
        ...(description ? { description } : {}),
        ...(email ? { email } : {}),
        ...(expand ? { expand } : {}),
        ...(invoice_prefix ? { invoice_prefix } : {}),
        ...(invoice_settings ? { invoice_settings } : {}),
        ...(metadata ? { metadata } : {}),
        ...(name ? { name } : {}),
        ...(next_invoice_sequence ? { next_invoice_sequence } : {}),
        ...(payment_method ? { payment_method } : {}),
        ...(phone ? { phone } : {}),
        ...(preferred_locales ? { preferred_locales } : {}),
        ...(promotion_code ? { promotion_code } : {}),
        ...(shipping ? { shipping } : {}),
        ...(source ? { source } : {}),
        ...(tax ? { tax } : {}),
        ...(tax_exempt ? { tax_exempt } : {}),
        ...(tax_id_data ? { tax_id_data } : {}),
        ...(test_clock ? { test_clock } : {}),
        ...(addressCity ? { "address[city]": addressCity } : {}),
        ...(addressCountry ? { "address[country]": addressCountry } : {}),
        ...(addressLine1 ? { "address[line1]": addressLine1 } : {}),
        ...(addressLine2 ? { "address[line2]": addressLine2 } : {}),
        ...(addressPostal_code ? { "address[postal_code]": addressPostal_code } : {}),
        ...(addressState ? { "address[state]": addressState } : {}),
        ...(cash_balanceSettingsReconciliation_mode
          ? {
              "cash_balance[settings][reconciliation_mode]":
                cash_balanceSettingsReconciliation_mode,
            }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(invoice_settingsCustom_fields0Name
          ? { "invoice_settings[custom_fields][0][name]": invoice_settingsCustom_fields0Name }
          : {}),
        ...(invoice_settingsCustom_fields0Value
          ? { "invoice_settings[custom_fields][0][value]": invoice_settingsCustom_fields0Value }
          : {}),
        ...(invoice_settingsCustom_fields1Name
          ? { "invoice_settings[custom_fields][1][name]": invoice_settingsCustom_fields1Name }
          : {}),
        ...(invoice_settingsCustom_fields1Value
          ? { "invoice_settings[custom_fields][1][value]": invoice_settingsCustom_fields1Value }
          : {}),
        ...(invoice_settingsDefault_payment_method
          ? { "invoice_settings[default_payment_method]": invoice_settingsDefault_payment_method }
          : {}),
        ...(invoice_settingsFooter ? { "invoice_settings[footer]": invoice_settingsFooter } : {}),
        ...(invoice_settingsRendering_optionsAmount_tax_display
          ? {
              "invoice_settings[rendering_options][amount_tax_display]":
                invoice_settingsRendering_optionsAmount_tax_display,
            }
          : {}),
        ...(preferred_locales0 ? { "preferred_locales[0]": preferred_locales0 } : {}),
        ...(preferred_locales1 ? { "preferred_locales[1]": preferred_locales1 } : {}),
        ...(shippingAddressCity ? { "shipping[address][city]": shippingAddressCity } : {}),
        ...(shippingAddressCountry ? { "shipping[address][country]": shippingAddressCountry } : {}),
        ...(shippingAddressLine1 ? { "shipping[address][line1]": shippingAddressLine1 } : {}),
        ...(shippingAddressLine2 ? { "shipping[address][line2]": shippingAddressLine2 } : {}),
        ...(shippingAddressPostal_code
          ? { "shipping[address][postal_code]": shippingAddressPostal_code }
          : {}),
        ...(shippingAddressState ? { "shipping[address][state]": shippingAddressState } : {}),
        ...(shippingName ? { "shipping[name]": shippingName } : {}),
        ...(shippingPhone ? { "shipping[phone]": shippingPhone } : {}),
        ...(taxIp_address ? { "tax[ip_address]": taxIp_address } : {}),
        ...(tax_id_data0Type ? { "tax_id_data[0][type]": tax_id_data0Type } : {}),
        ...(tax_id_data0Value ? { "tax_id_data[0][value]": tax_id_data0Value } : {}),
        ...(tax_id_data1Type ? { "tax_id_data[1][type]": tax_id_data1Type } : {}),
        ...(tax_id_data1Value ? { "tax_id_data[1][value]": tax_id_data1Value } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
};
