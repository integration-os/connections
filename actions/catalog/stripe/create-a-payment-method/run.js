const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    acss_debit,
    affirm,
    afterpay_clearpay,
    alipay,
    au_becs_debit,
    bacs_debit,
    bancontact,
    billing_details,
    blik,
    boleto,
    card,
    customer,
    customer_balance,
    eps,
    expand,
    fpx,
    giropay,
    grabpay,
    ideal,
    interac_present,
    klarna,
    konbini,
    link,
    metadata,
    oxxo,
    p24,
    payment_method,
    paynow,
    promptpay,
    radar_options,
    sepa_debit,
    sofort,
    type,
    us_bank_account,
    wechat_pay,
    acss_debitAccount_number,
    acss_debitInstitution_number,
    acss_debitTransit_number,
    au_becs_debitAccount_number,
    au_becs_debitBsb_number,
    bacs_debitAccount_number,
    bacs_debitSort_code,
    billing_detailsAddressCity,
    billing_detailsAddressCountry,
    billing_detailsAddressLine1,
    billing_detailsAddressLine2,
    billing_detailsAddressPostal_code,
    billing_detailsAddressState,
    billing_detailsEmail,
    billing_detailsName,
    billing_detailsPhone,
    boletoTax_id,
    cardExp_month,
    cardExp_year,
    cardNumber,
    cardCvc,
    epsBank,
    expand0,
    expand1,
    fpxBank,
    idealBank,
    klarnaDobDay,
    klarnaDobMonth,
    klarnaDobYear,
    p24Bank,
    radar_optionsSession,
    sepa_debitIban,
    sofortCountry,
    us_bank_accountAccount_holder_type,
    us_bank_accountAccount_number,
    us_bank_accountAccount_type,
    us_bank_accountFinancial_connections_account,
    us_bank_accountRouting_number,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/payment_methods",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(acss_debit ? { acss_debit } : {}),
        ...(affirm ? { affirm } : {}),
        ...(afterpay_clearpay ? { afterpay_clearpay } : {}),
        ...(alipay ? { alipay } : {}),
        ...(au_becs_debit ? { au_becs_debit } : {}),
        ...(bacs_debit ? { bacs_debit } : {}),
        ...(bancontact ? { bancontact } : {}),
        ...(billing_details ? { billing_details } : {}),
        ...(blik ? { blik } : {}),
        ...(boleto ? { boleto } : {}),
        ...(card ? { card } : {}),
        ...(customer ? { customer } : {}),
        ...(customer_balance ? { customer_balance } : {}),
        ...(eps ? { eps } : {}),
        ...(expand ? { expand } : {}),
        ...(fpx ? { fpx } : {}),
        ...(giropay ? { giropay } : {}),
        ...(grabpay ? { grabpay } : {}),
        ...(ideal ? { ideal } : {}),
        ...(interac_present ? { interac_present } : {}),
        ...(klarna ? { klarna } : {}),
        ...(konbini ? { konbini } : {}),
        ...(link ? { link } : {}),
        ...(metadata ? { metadata } : {}),
        ...(oxxo ? { oxxo } : {}),
        ...(p24 ? { p24 } : {}),
        ...(payment_method ? { payment_method } : {}),
        ...(paynow ? { paynow } : {}),
        ...(promptpay ? { promptpay } : {}),
        ...(radar_options ? { radar_options } : {}),
        ...(sepa_debit ? { sepa_debit } : {}),
        ...(sofort ? { sofort } : {}),
        ...(type ? { type } : {}),
        ...(us_bank_account ? { us_bank_account } : {}),
        ...(wechat_pay ? { wechat_pay } : {}),
        ...(acss_debitAccount_number
          ? { "acss_debit[account_number]": acss_debitAccount_number }
          : {}),
        ...(acss_debitInstitution_number
          ? { "acss_debit[institution_number]": acss_debitInstitution_number }
          : {}),
        ...(acss_debitTransit_number
          ? { "acss_debit[transit_number]": acss_debitTransit_number }
          : {}),
        ...(au_becs_debitAccount_number
          ? { "au_becs_debit[account_number]": au_becs_debitAccount_number }
          : {}),
        ...(au_becs_debitBsb_number
          ? { "au_becs_debit[bsb_number]": au_becs_debitBsb_number }
          : {}),
        ...(bacs_debitAccount_number
          ? { "bacs_debit[account_number]": bacs_debitAccount_number }
          : {}),
        ...(bacs_debitSort_code ? { "bacs_debit[sort_code]": bacs_debitSort_code } : {}),
        ...(billing_detailsAddressCity
          ? { "billing_details[address][city]": billing_detailsAddressCity }
          : {}),
        ...(billing_detailsAddressCountry
          ? { "billing_details[address][country]": billing_detailsAddressCountry }
          : {}),
        ...(billing_detailsAddressLine1
          ? { "billing_details[address][line1]": billing_detailsAddressLine1 }
          : {}),
        ...(billing_detailsAddressLine2
          ? { "billing_details[address][line2]": billing_detailsAddressLine2 }
          : {}),
        ...(billing_detailsAddressPostal_code
          ? { "billing_details[address][postal_code]": billing_detailsAddressPostal_code }
          : {}),
        ...(billing_detailsAddressState
          ? { "billing_details[address][state]": billing_detailsAddressState }
          : {}),
        ...(billing_detailsEmail ? { "billing_details[email]": billing_detailsEmail } : {}),
        ...(billing_detailsName ? { "billing_details[name]": billing_detailsName } : {}),
        ...(billing_detailsPhone ? { "billing_details[phone]": billing_detailsPhone } : {}),
        ...(boletoTax_id ? { "boleto[tax_id]": boletoTax_id } : {}),
        ...(cardExp_month ? { "card[exp_month]": cardExp_month } : {}),
        ...(cardExp_year ? { "card[exp_year]": cardExp_year } : {}),
        ...(cardNumber ? { "card[number]": cardNumber } : {}),
        ...(cardCvc ? { "card[cvc]": cardCvc } : {}),
        ...(epsBank ? { "eps[bank]": epsBank } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(fpxBank ? { "fpx[bank]": fpxBank } : {}),
        ...(idealBank ? { "ideal[bank]": idealBank } : {}),
        ...(klarnaDobDay ? { "klarna[dob][day]": klarnaDobDay } : {}),
        ...(klarnaDobMonth ? { "klarna[dob][month]": klarnaDobMonth } : {}),
        ...(klarnaDobYear ? { "klarna[dob][year]": klarnaDobYear } : {}),
        ...(p24Bank ? { "p24[bank]": p24Bank } : {}),
        ...(radar_optionsSession ? { "radar_options[session]": radar_optionsSession } : {}),
        ...(sepa_debitIban ? { "sepa_debit[iban]": sepa_debitIban } : {}),
        ...(sofortCountry ? { "sofort[country]": sofortCountry } : {}),
        ...(us_bank_accountAccount_holder_type
          ? { "us_bank_account[account_holder_type]": us_bank_accountAccount_holder_type }
          : {}),
        ...(us_bank_accountAccount_number
          ? { "us_bank_account[account_number]": us_bank_accountAccount_number }
          : {}),
        ...(us_bank_accountAccount_type
          ? { "us_bank_account[account_type]": us_bank_accountAccount_type }
          : {}),
        ...(us_bank_accountFinancial_connections_account
          ? {
              "us_bank_account[financial_connections_account]":
                us_bank_accountFinancial_connections_account,
            }
          : {}),
        ...(us_bank_accountRouting_number
          ? { "us_bank_account[routing_number]": us_bank_accountRouting_number }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
};
