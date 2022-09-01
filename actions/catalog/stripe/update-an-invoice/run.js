const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    invoice,
    account_tax_ids,
    application_fee_amount,
    auto_advance,
    automatic_tax,
    collection_method,
    custom_fields,
    days_until_due,
    default_payment_method,
    default_source,
    default_tax_rates,
    description,
    discounts,
    due_date,
    expand,
    footer,
    metadata,
    on_behalf_of,
    payment_settings,
    rendering_options,
    statement_descriptor,
    transfer_data,
    account_tax_ids0,
    account_tax_ids1,
    automatic_taxEnabled,
    custom_fields0Name,
    custom_fields0Value,
    custom_fields1Name,
    custom_fields1Value,
    default_tax_rates0,
    default_tax_rates1,
    discounts0Coupon,
    discounts0Discount,
    discounts1Coupon,
    discounts1Discount,
    expand0,
    expand1,
    payment_settingsDefault_mandate,
    payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type,
    payment_settingsPayment_method_optionsAcss_debitVerification_method,
    payment_settingsPayment_method_optionsBancontactPreferred_language,
    payment_settingsPayment_method_optionsCardInstallmentsEnabled,
    payment_settingsPayment_method_optionsCardInstallmentsPlanCount,
    payment_settingsPayment_method_optionsCardInstallmentsPlanInterval,
    payment_settingsPayment_method_optionsCardInstallmentsPlanType,
    payment_settingsPayment_method_optionsCardRequest_three_d_secure,
    payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
    payment_settingsPayment_method_optionsCustomer_balanceBank_transferType,
    payment_settingsPayment_method_optionsCustomer_balanceFunding_type,
    payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
    payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
    payment_settingsPayment_method_optionsUs_bank_accountVerification_method,
    payment_settingsPayment_method_types0,
    payment_settingsPayment_method_types1,
    rendering_optionsAmount_tax_display,
    transfer_dataDestination,
    transfer_dataAmount,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/invoices/${invoice}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(account_tax_ids ? { account_tax_ids } : {}),
        ...(application_fee_amount ? { application_fee_amount } : {}),
        ...(auto_advance ? { auto_advance } : {}),
        ...(automatic_tax ? { automatic_tax } : {}),
        ...(collection_method ? { collection_method } : {}),
        ...(custom_fields ? { custom_fields } : {}),
        ...(days_until_due ? { days_until_due } : {}),
        ...(default_payment_method ? { default_payment_method } : {}),
        ...(default_source ? { default_source } : {}),
        ...(default_tax_rates ? { default_tax_rates } : {}),
        ...(description ? { description } : {}),
        ...(discounts ? { discounts } : {}),
        ...(due_date ? { due_date } : {}),
        ...(expand ? { expand } : {}),
        ...(footer ? { footer } : {}),
        ...(metadata ? { metadata } : {}),
        ...(on_behalf_of ? { on_behalf_of } : {}),
        ...(payment_settings ? { payment_settings } : {}),
        ...(rendering_options ? { rendering_options } : {}),
        ...(statement_descriptor ? { statement_descriptor } : {}),
        ...(transfer_data ? { transfer_data } : {}),
        ...(account_tax_ids0 ? { "account_tax_ids[0]": account_tax_ids0 } : {}),
        ...(account_tax_ids1 ? { "account_tax_ids[1]": account_tax_ids1 } : {}),
        ...(automatic_taxEnabled ? { "automatic_tax[enabled]": automatic_taxEnabled } : {}),
        ...(custom_fields0Name ? { "custom_fields[0][name]": custom_fields0Name } : {}),
        ...(custom_fields0Value ? { "custom_fields[0][value]": custom_fields0Value } : {}),
        ...(custom_fields1Name ? { "custom_fields[1][name]": custom_fields1Name } : {}),
        ...(custom_fields1Value ? { "custom_fields[1][value]": custom_fields1Value } : {}),
        ...(default_tax_rates0 ? { "default_tax_rates[0]": default_tax_rates0 } : {}),
        ...(default_tax_rates1 ? { "default_tax_rates[1]": default_tax_rates1 } : {}),
        ...(discounts0Coupon ? { "discounts[0][coupon]": discounts0Coupon } : {}),
        ...(discounts0Discount ? { "discounts[0][discount]": discounts0Discount } : {}),
        ...(discounts1Coupon ? { "discounts[1][coupon]": discounts1Coupon } : {}),
        ...(discounts1Discount ? { "discounts[1][discount]": discounts1Discount } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(payment_settingsDefault_mandate
          ? { "payment_settings[default_mandate]": payment_settingsDefault_mandate }
          : {}),
        ...(payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type
          ? {
              "payment_settings[payment_method_options][acss_debit][mandate_options][transaction_type]":
                payment_settingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsAcss_debitVerification_method
          ? {
              "payment_settings[payment_method_options][acss_debit][verification_method]":
                payment_settingsPayment_method_optionsAcss_debitVerification_method,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsBancontactPreferred_language
          ? {
              "payment_settings[payment_method_options][bancontact][preferred_language]":
                payment_settingsPayment_method_optionsBancontactPreferred_language,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardInstallmentsEnabled
          ? {
              "payment_settings[payment_method_options][card][installments][enabled]":
                payment_settingsPayment_method_optionsCardInstallmentsEnabled,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardInstallmentsPlanCount
          ? {
              "payment_settings[payment_method_options][card][installments][plan][count]":
                payment_settingsPayment_method_optionsCardInstallmentsPlanCount,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardInstallmentsPlanInterval
          ? {
              "payment_settings[payment_method_options][card][installments][plan][interval]":
                payment_settingsPayment_method_optionsCardInstallmentsPlanInterval,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardInstallmentsPlanType
          ? {
              "payment_settings[payment_method_options][card][installments][plan][type]":
                payment_settingsPayment_method_optionsCardInstallmentsPlanType,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCardRequest_three_d_secure
          ? {
              "payment_settings[payment_method_options][card][request_three_d_secure]":
                payment_settingsPayment_method_optionsCardRequest_three_d_secure,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry
          ? {
              "payment_settings[payment_method_options][customer_balance][bank_transfer][eu_bank_transfer][country]":
                payment_settingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCustomer_balanceBank_transferType
          ? {
              "payment_settings[payment_method_options][customer_balance][bank_transfer][type]":
                payment_settingsPayment_method_optionsCustomer_balanceBank_transferType,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsCustomer_balanceFunding_type
          ? {
              "payment_settings[payment_method_options][customer_balance][funding_type]":
                payment_settingsPayment_method_optionsCustomer_balanceFunding_type,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0
          ? {
              "payment_settings[payment_method_options][us_bank_account][financial_connections][permissions][0]":
                payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1
          ? {
              "payment_settings[payment_method_options][us_bank_account][financial_connections][permissions][1]":
                payment_settingsPayment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
            }
          : {}),
        ...(payment_settingsPayment_method_optionsUs_bank_accountVerification_method
          ? {
              "payment_settings[payment_method_options][us_bank_account][verification_method]":
                payment_settingsPayment_method_optionsUs_bank_accountVerification_method,
            }
          : {}),
        ...(payment_settingsPayment_method_types0
          ? { "payment_settings[payment_method_types][0]": payment_settingsPayment_method_types0 }
          : {}),
        ...(payment_settingsPayment_method_types1
          ? { "payment_settings[payment_method_types][1]": payment_settingsPayment_method_types1 }
          : {}),
        ...(rendering_optionsAmount_tax_display
          ? { "rendering_options[amount_tax_display]": rendering_optionsAmount_tax_display }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, invoice }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_INVOICE: "A valid invoice field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof invoice !== "string") throw new Error(ERRORS.INVALID_INVOICE);
};
