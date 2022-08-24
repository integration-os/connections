const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    customer,
    address,
    balance,
    bank_account,
    card,
    cash_balance,
    coupon,
    default_alipay_account,
    default_bank_account,
    default_card,
    default_source,
    description,
    email,
    expand,
    invoice_prefix,
    invoice_settings,
    metadata,
    name,
    next_invoice_sequence,
    phone,
    preferred_locales,
    promotion_code,
    shipping,
    source,
    tax,
    tax_exempt,
    trial_end,
    addressCity,
    addressCountry,
    addressLine1,
    addressLine2,
    addressPostal_code,
    addressState,
    bank_accountAccount_number,
    bank_accountCountry,
    bank_accountAccount_holder_name,
    bank_accountAccount_holder_type,
    bank_accountCurrency,
    bank_accountObject,
    bank_accountRouting_number,
    cardExp_month,
    cardExp_year,
    cardNumber,
    cardAddress_city,
    cardAddress_country,
    cardAddress_line1,
    cardAddress_line2,
    cardAddress_state,
    cardAddress_zip,
    cardCvc,
    cardMetadata,
    cardName,
    cardObject,
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
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/customers/${customer}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(address ? { address } : {}),
        ...(balance ? { balance } : {}),
        ...(bank_account ? { bank_account } : {}),
        ...(card ? { card } : {}),
        ...(cash_balance ? { cash_balance } : {}),
        ...(coupon ? { coupon } : {}),
        ...(default_alipay_account ? { default_alipay_account } : {}),
        ...(default_bank_account ? { default_bank_account } : {}),
        ...(default_card ? { default_card } : {}),
        ...(default_source ? { default_source } : {}),
        ...(description ? { description } : {}),
        ...(email ? { email } : {}),
        ...(expand ? { expand } : {}),
        ...(invoice_prefix ? { invoice_prefix } : {}),
        ...(invoice_settings ? { invoice_settings } : {}),
        ...(metadata ? { metadata } : {}),
        ...(name ? { name } : {}),
        ...(next_invoice_sequence ? { next_invoice_sequence } : {}),
        ...(phone ? { phone } : {}),
        ...(preferred_locales ? { preferred_locales } : {}),
        ...(promotion_code ? { promotion_code } : {}),
        ...(shipping ? { shipping } : {}),
        ...(source ? { source } : {}),
        ...(tax ? { tax } : {}),
        ...(tax_exempt ? { tax_exempt } : {}),
        ...(trial_end ? { trial_end } : {}),
        ...(addressCity ? { "address[city]": addressCity } : {}),
        ...(addressCountry ? { "address[country]": addressCountry } : {}),
        ...(addressLine1 ? { "address[line1]": addressLine1 } : {}),
        ...(addressLine2 ? { "address[line2]": addressLine2 } : {}),
        ...(addressPostal_code ? { "address[postal_code]": addressPostal_code } : {}),
        ...(addressState ? { "address[state]": addressState } : {}),
        ...(bank_accountAccount_number
          ? { "bank_account[account_number]": bank_accountAccount_number }
          : {}),
        ...(bank_accountCountry ? { "bank_account[country]": bank_accountCountry } : {}),
        ...(bank_accountAccount_holder_name
          ? { "bank_account[account_holder_name]": bank_accountAccount_holder_name }
          : {}),
        ...(bank_accountAccount_holder_type
          ? { "bank_account[account_holder_type]": bank_accountAccount_holder_type }
          : {}),
        ...(bank_accountCurrency ? { "bank_account[currency]": bank_accountCurrency } : {}),
        ...(bank_accountObject ? { "bank_account[object]": bank_accountObject } : {}),
        ...(bank_accountRouting_number
          ? { "bank_account[routing_number]": bank_accountRouting_number }
          : {}),
        ...(cardExp_month ? { "card[exp_month]": cardExp_month } : {}),
        ...(cardExp_year ? { "card[exp_year]": cardExp_year } : {}),
        ...(cardNumber ? { "card[number]": cardNumber } : {}),
        ...(cardAddress_city ? { "card[address_city]": cardAddress_city } : {}),
        ...(cardAddress_country ? { "card[address_country]": cardAddress_country } : {}),
        ...(cardAddress_line1 ? { "card[address_line1]": cardAddress_line1 } : {}),
        ...(cardAddress_line2 ? { "card[address_line2]": cardAddress_line2 } : {}),
        ...(cardAddress_state ? { "card[address_state]": cardAddress_state } : {}),
        ...(cardAddress_zip ? { "card[address_zip]": cardAddress_zip } : {}),
        ...(cardCvc ? { "card[cvc]": cardCvc } : {}),
        ...(cardMetadata ? { "card[metadata]": cardMetadata } : {}),
        ...(cardName ? { "card[name]": cardName } : {}),
        ...(cardObject ? { "card[object]": cardObject } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, customer }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CUSTOMER: "A valid customer field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof customer !== "string") throw new Error(ERRORS.INVALID_CUSTOMER);
};
