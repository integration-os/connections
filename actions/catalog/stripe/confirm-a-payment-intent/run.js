const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    intent,
    capture_method,
    client_secret,
    error_on_requires_action,
    expand,
    mandate,
    mandate_data,
    off_session,
    payment_method,
    payment_method_data,
    payment_method_options,
    payment_method_types,
    radar_options,
    receipt_email,
    return_url,
    setup_future_usage,
    shipping,
    use_stripe_sdk,
    expand0,
    expand1,
    mandate_dataCustomer_acceptanceType,
    mandate_dataCustomer_acceptanceAccepted_at,
    mandate_dataCustomer_acceptanceOnlineIp_address,
    mandate_dataCustomer_acceptanceOnlineUser_agent,
    payment_method_dataType,
    payment_method_dataAcss_debitAccount_number,
    payment_method_dataAcss_debitInstitution_number,
    payment_method_dataAcss_debitTransit_number,
    payment_method_dataAu_becs_debitAccount_number,
    payment_method_dataAu_becs_debitBsb_number,
    payment_method_dataBacs_debitAccount_number,
    payment_method_dataBacs_debitSort_code,
    payment_method_dataBilling_detailsAddressCity,
    payment_method_dataBilling_detailsAddressCountry,
    payment_method_dataBilling_detailsAddressLine1,
    payment_method_dataBilling_detailsAddressLine2,
    payment_method_dataBilling_detailsAddressPostal_code,
    payment_method_dataBilling_detailsAddressState,
    payment_method_dataBilling_detailsEmail,
    payment_method_dataBilling_detailsName,
    payment_method_dataBilling_detailsPhone,
    payment_method_dataBoletoTax_id,
    payment_method_dataEpsBank,
    payment_method_dataFpxBank,
    payment_method_dataIdealBank,
    payment_method_dataKlarnaDobDay,
    payment_method_dataKlarnaDobMonth,
    payment_method_dataKlarnaDobYear,
    payment_method_dataMetadata,
    payment_method_dataP24Bank,
    payment_method_dataRadar_optionsSession,
    payment_method_dataSepa_debitIban,
    payment_method_dataSofortCountry,
    payment_method_dataUs_bank_accountAccount_holder_type,
    payment_method_dataUs_bank_accountAccount_number,
    payment_method_dataUs_bank_accountAccount_type,
    payment_method_dataUs_bank_accountFinancial_connections_account,
    payment_method_dataUs_bank_accountRouting_number,
    payment_method_optionsAcss_debitMandate_optionsCustom_mandate_url,
    payment_method_optionsAcss_debitMandate_optionsInterval_description,
    payment_method_optionsAcss_debitMandate_optionsPayment_schedule,
    payment_method_optionsAcss_debitMandate_optionsTransaction_type,
    payment_method_optionsAcss_debitSetup_future_usage,
    payment_method_optionsAcss_debitVerification_method,
    payment_method_optionsAffirmCapture_method,
    payment_method_optionsAffirmSetup_future_usage,
    payment_method_optionsAfterpay_clearpayCapture_method,
    payment_method_optionsAfterpay_clearpayReference,
    payment_method_optionsAfterpay_clearpaySetup_future_usage,
    payment_method_optionsAlipaySetup_future_usage,
    payment_method_optionsAu_becs_debitSetup_future_usage,
    payment_method_optionsBacs_debitSetup_future_usage,
    payment_method_optionsBancontactPreferred_language,
    payment_method_optionsBancontactSetup_future_usage,
    payment_method_optionsBlikCode,
    payment_method_optionsBoletoExpires_after_days,
    payment_method_optionsBoletoSetup_future_usage,
    payment_method_optionsCardCapture_method,
    payment_method_optionsCardCvc_token,
    payment_method_optionsCardInstallmentsEnabled,
    payment_method_optionsCardInstallmentsPlanCount,
    payment_method_optionsCardInstallmentsPlanInterval,
    payment_method_optionsCardInstallmentsPlanType,
    payment_method_optionsCardMandate_optionsAmount,
    payment_method_optionsCardMandate_optionsAmount_type,
    payment_method_optionsCardMandate_optionsInterval,
    payment_method_optionsCardMandate_optionsReference,
    payment_method_optionsCardMandate_optionsStart_date,
    payment_method_optionsCardMandate_optionsDescription,
    payment_method_optionsCardMandate_optionsEnd_date,
    payment_method_optionsCardMandate_optionsInterval_count,
    payment_method_optionsCardMandate_optionsSupported_types0,
    payment_method_optionsCardMandate_optionsSupported_types1,
    payment_method_optionsCardNetwork,
    payment_method_optionsCardRequest_three_d_secure,
    payment_method_optionsCardSetup_future_usage,
    payment_method_optionsCardStatement_descriptor_suffix_kana,
    payment_method_optionsCardStatement_descriptor_suffix_kanji,
    payment_method_optionsCard_presentRequest_extended_authorization,
    payment_method_optionsCard_presentRequest_incremental_authorization_support,
    payment_method_optionsCustomer_balanceBank_transferType,
    payment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
    payment_method_optionsCustomer_balanceBank_transferRequested_address_types0,
    payment_method_optionsCustomer_balanceBank_transferRequested_address_types1,
    payment_method_optionsCustomer_balanceFunding_type,
    payment_method_optionsCustomer_balanceSetup_future_usage,
    payment_method_optionsEpsSetup_future_usage,
    payment_method_optionsFpxSetup_future_usage,
    payment_method_optionsGiropaySetup_future_usage,
    payment_method_optionsGrabpaySetup_future_usage,
    payment_method_optionsIdealSetup_future_usage,
    payment_method_optionsKlarnaCapture_method,
    payment_method_optionsKlarnaPreferred_locale,
    payment_method_optionsKlarnaSetup_future_usage,
    payment_method_optionsKonbiniConfirmation_number,
    payment_method_optionsKonbiniExpires_after_days,
    payment_method_optionsKonbiniExpires_at,
    payment_method_optionsKonbiniProduct_description,
    payment_method_optionsKonbiniSetup_future_usage,
    payment_method_optionsLinkCapture_method,
    payment_method_optionsLinkPersistent_token,
    payment_method_optionsLinkSetup_future_usage,
    payment_method_optionsOxxoExpires_after_days,
    payment_method_optionsOxxoSetup_future_usage,
    payment_method_optionsP24Setup_future_usage,
    payment_method_optionsP24Tos_shown_and_accepted,
    payment_method_optionsPaynowSetup_future_usage,
    payment_method_optionsPromptpaySetup_future_usage,
    payment_method_optionsSepa_debitSetup_future_usage,
    payment_method_optionsSofortPreferred_language,
    payment_method_optionsSofortSetup_future_usage,
    payment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
    payment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
    payment_method_optionsUs_bank_accountFinancial_connectionsReturn_url,
    payment_method_optionsUs_bank_accountNetworksRequested0,
    payment_method_optionsUs_bank_accountNetworksRequested1,
    payment_method_optionsUs_bank_accountSetup_future_usage,
    payment_method_optionsUs_bank_accountVerification_method,
    payment_method_optionsWechat_payClient,
    payment_method_optionsWechat_payApp_id,
    payment_method_optionsWechat_paySetup_future_usage,
    payment_method_types0,
    payment_method_types1,
    radar_optionsSession,
    shippingAddressCity,
    shippingAddressCountry,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingAddressPostal_code,
    shippingAddressState,
    shippingName,
    shippingCarrier,
    shippingPhone,
    shippingTracking_number,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/payment_intents/${intent}/confirm`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(capture_method ? { capture_method } : {}),
        ...(client_secret ? { client_secret } : {}),
        ...(error_on_requires_action ? { error_on_requires_action } : {}),
        ...(expand ? { expand } : {}),
        ...(mandate ? { mandate } : {}),
        ...(mandate_data ? { mandate_data } : {}),
        ...(off_session ? { off_session } : {}),
        ...(payment_method ? { payment_method } : {}),
        ...(payment_method_data ? { payment_method_data } : {}),
        ...(payment_method_options ? { payment_method_options } : {}),
        ...(payment_method_types ? { payment_method_types } : {}),
        ...(radar_options ? { radar_options } : {}),
        ...(receipt_email ? { receipt_email } : {}),
        ...(return_url ? { return_url } : {}),
        ...(setup_future_usage ? { setup_future_usage } : {}),
        ...(shipping ? { shipping } : {}),
        ...(use_stripe_sdk ? { use_stripe_sdk } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(mandate_dataCustomer_acceptanceType
          ? { "mandate_data[customer_acceptance][type]": mandate_dataCustomer_acceptanceType }
          : {}),
        ...(mandate_dataCustomer_acceptanceAccepted_at
          ? {
              "mandate_data[customer_acceptance][accepted_at]":
                mandate_dataCustomer_acceptanceAccepted_at,
            }
          : {}),
        ...(mandate_dataCustomer_acceptanceOnlineIp_address
          ? {
              "mandate_data[customer_acceptance][online][ip_address]":
                mandate_dataCustomer_acceptanceOnlineIp_address,
            }
          : {}),
        ...(mandate_dataCustomer_acceptanceOnlineUser_agent
          ? {
              "mandate_data[customer_acceptance][online][user_agent]":
                mandate_dataCustomer_acceptanceOnlineUser_agent,
            }
          : {}),
        ...(payment_method_dataType
          ? { "payment_method_data[type]": payment_method_dataType }
          : {}),
        ...(payment_method_dataAcss_debitAccount_number
          ? {
              "payment_method_data[acss_debit][account_number]":
                payment_method_dataAcss_debitAccount_number,
            }
          : {}),
        ...(payment_method_dataAcss_debitInstitution_number
          ? {
              "payment_method_data[acss_debit][institution_number]":
                payment_method_dataAcss_debitInstitution_number,
            }
          : {}),
        ...(payment_method_dataAcss_debitTransit_number
          ? {
              "payment_method_data[acss_debit][transit_number]":
                payment_method_dataAcss_debitTransit_number,
            }
          : {}),
        ...(payment_method_dataAu_becs_debitAccount_number
          ? {
              "payment_method_data[au_becs_debit][account_number]":
                payment_method_dataAu_becs_debitAccount_number,
            }
          : {}),
        ...(payment_method_dataAu_becs_debitBsb_number
          ? {
              "payment_method_data[au_becs_debit][bsb_number]":
                payment_method_dataAu_becs_debitBsb_number,
            }
          : {}),
        ...(payment_method_dataBacs_debitAccount_number
          ? {
              "payment_method_data[bacs_debit][account_number]":
                payment_method_dataBacs_debitAccount_number,
            }
          : {}),
        ...(payment_method_dataBacs_debitSort_code
          ? { "payment_method_data[bacs_debit][sort_code]": payment_method_dataBacs_debitSort_code }
          : {}),
        ...(payment_method_dataBilling_detailsAddressCity
          ? {
              "payment_method_data[billing_details][address][city]":
                payment_method_dataBilling_detailsAddressCity,
            }
          : {}),
        ...(payment_method_dataBilling_detailsAddressCountry
          ? {
              "payment_method_data[billing_details][address][country]":
                payment_method_dataBilling_detailsAddressCountry,
            }
          : {}),
        ...(payment_method_dataBilling_detailsAddressLine1
          ? {
              "payment_method_data[billing_details][address][line1]":
                payment_method_dataBilling_detailsAddressLine1,
            }
          : {}),
        ...(payment_method_dataBilling_detailsAddressLine2
          ? {
              "payment_method_data[billing_details][address][line2]":
                payment_method_dataBilling_detailsAddressLine2,
            }
          : {}),
        ...(payment_method_dataBilling_detailsAddressPostal_code
          ? {
              "payment_method_data[billing_details][address][postal_code]":
                payment_method_dataBilling_detailsAddressPostal_code,
            }
          : {}),
        ...(payment_method_dataBilling_detailsAddressState
          ? {
              "payment_method_data[billing_details][address][state]":
                payment_method_dataBilling_detailsAddressState,
            }
          : {}),
        ...(payment_method_dataBilling_detailsEmail
          ? {
              "payment_method_data[billing_details][email]":
                payment_method_dataBilling_detailsEmail,
            }
          : {}),
        ...(payment_method_dataBilling_detailsName
          ? { "payment_method_data[billing_details][name]": payment_method_dataBilling_detailsName }
          : {}),
        ...(payment_method_dataBilling_detailsPhone
          ? {
              "payment_method_data[billing_details][phone]":
                payment_method_dataBilling_detailsPhone,
            }
          : {}),
        ...(payment_method_dataBoletoTax_id
          ? { "payment_method_data[boleto][tax_id]": payment_method_dataBoletoTax_id }
          : {}),
        ...(payment_method_dataEpsBank
          ? { "payment_method_data[eps][bank]": payment_method_dataEpsBank }
          : {}),
        ...(payment_method_dataFpxBank
          ? { "payment_method_data[fpx][bank]": payment_method_dataFpxBank }
          : {}),
        ...(payment_method_dataIdealBank
          ? { "payment_method_data[ideal][bank]": payment_method_dataIdealBank }
          : {}),
        ...(payment_method_dataKlarnaDobDay
          ? { "payment_method_data[klarna][dob][day]": payment_method_dataKlarnaDobDay }
          : {}),
        ...(payment_method_dataKlarnaDobMonth
          ? { "payment_method_data[klarna][dob][month]": payment_method_dataKlarnaDobMonth }
          : {}),
        ...(payment_method_dataKlarnaDobYear
          ? { "payment_method_data[klarna][dob][year]": payment_method_dataKlarnaDobYear }
          : {}),
        ...(payment_method_dataMetadata
          ? { "payment_method_data[metadata]": payment_method_dataMetadata }
          : {}),
        ...(payment_method_dataP24Bank
          ? { "payment_method_data[p24][bank]": payment_method_dataP24Bank }
          : {}),
        ...(payment_method_dataRadar_optionsSession
          ? {
              "payment_method_data[radar_options][session]":
                payment_method_dataRadar_optionsSession,
            }
          : {}),
        ...(payment_method_dataSepa_debitIban
          ? { "payment_method_data[sepa_debit][iban]": payment_method_dataSepa_debitIban }
          : {}),
        ...(payment_method_dataSofortCountry
          ? { "payment_method_data[sofort][country]": payment_method_dataSofortCountry }
          : {}),
        ...(payment_method_dataUs_bank_accountAccount_holder_type
          ? {
              "payment_method_data[us_bank_account][account_holder_type]":
                payment_method_dataUs_bank_accountAccount_holder_type,
            }
          : {}),
        ...(payment_method_dataUs_bank_accountAccount_number
          ? {
              "payment_method_data[us_bank_account][account_number]":
                payment_method_dataUs_bank_accountAccount_number,
            }
          : {}),
        ...(payment_method_dataUs_bank_accountAccount_type
          ? {
              "payment_method_data[us_bank_account][account_type]":
                payment_method_dataUs_bank_accountAccount_type,
            }
          : {}),
        ...(payment_method_dataUs_bank_accountFinancial_connections_account
          ? {
              "payment_method_data[us_bank_account][financial_connections_account]":
                payment_method_dataUs_bank_accountFinancial_connections_account,
            }
          : {}),
        ...(payment_method_dataUs_bank_accountRouting_number
          ? {
              "payment_method_data[us_bank_account][routing_number]":
                payment_method_dataUs_bank_accountRouting_number,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsCustom_mandate_url
          ? {
              "payment_method_options[acss_debit][mandate_options][custom_mandate_url]":
                payment_method_optionsAcss_debitMandate_optionsCustom_mandate_url,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsInterval_description
          ? {
              "payment_method_options[acss_debit][mandate_options][interval_description]":
                payment_method_optionsAcss_debitMandate_optionsInterval_description,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsPayment_schedule
          ? {
              "payment_method_options[acss_debit][mandate_options][payment_schedule]":
                payment_method_optionsAcss_debitMandate_optionsPayment_schedule,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsTransaction_type
          ? {
              "payment_method_options[acss_debit][mandate_options][transaction_type]":
                payment_method_optionsAcss_debitMandate_optionsTransaction_type,
            }
          : {}),
        ...(payment_method_optionsAcss_debitSetup_future_usage
          ? {
              "payment_method_options[acss_debit][setup_future_usage]":
                payment_method_optionsAcss_debitSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsAcss_debitVerification_method
          ? {
              "payment_method_options[acss_debit][verification_method]":
                payment_method_optionsAcss_debitVerification_method,
            }
          : {}),
        ...(payment_method_optionsAffirmCapture_method
          ? {
              "payment_method_options[affirm][capture_method]":
                payment_method_optionsAffirmCapture_method,
            }
          : {}),
        ...(payment_method_optionsAffirmSetup_future_usage
          ? {
              "payment_method_options[affirm][setup_future_usage]":
                payment_method_optionsAffirmSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsAfterpay_clearpayCapture_method
          ? {
              "payment_method_options[afterpay_clearpay][capture_method]":
                payment_method_optionsAfterpay_clearpayCapture_method,
            }
          : {}),
        ...(payment_method_optionsAfterpay_clearpayReference
          ? {
              "payment_method_options[afterpay_clearpay][reference]":
                payment_method_optionsAfterpay_clearpayReference,
            }
          : {}),
        ...(payment_method_optionsAfterpay_clearpaySetup_future_usage
          ? {
              "payment_method_options[afterpay_clearpay][setup_future_usage]":
                payment_method_optionsAfterpay_clearpaySetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsAlipaySetup_future_usage
          ? {
              "payment_method_options[alipay][setup_future_usage]":
                payment_method_optionsAlipaySetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsAu_becs_debitSetup_future_usage
          ? {
              "payment_method_options[au_becs_debit][setup_future_usage]":
                payment_method_optionsAu_becs_debitSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsBacs_debitSetup_future_usage
          ? {
              "payment_method_options[bacs_debit][setup_future_usage]":
                payment_method_optionsBacs_debitSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsBancontactPreferred_language
          ? {
              "payment_method_options[bancontact][preferred_language]":
                payment_method_optionsBancontactPreferred_language,
            }
          : {}),
        ...(payment_method_optionsBancontactSetup_future_usage
          ? {
              "payment_method_options[bancontact][setup_future_usage]":
                payment_method_optionsBancontactSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsBlikCode
          ? { "payment_method_options[blik][code]": payment_method_optionsBlikCode }
          : {}),
        ...(payment_method_optionsBoletoExpires_after_days
          ? {
              "payment_method_options[boleto][expires_after_days]":
                payment_method_optionsBoletoExpires_after_days,
            }
          : {}),
        ...(payment_method_optionsBoletoSetup_future_usage
          ? {
              "payment_method_options[boleto][setup_future_usage]":
                payment_method_optionsBoletoSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsCardCapture_method
          ? {
              "payment_method_options[card][capture_method]":
                payment_method_optionsCardCapture_method,
            }
          : {}),
        ...(payment_method_optionsCardCvc_token
          ? { "payment_method_options[card][cvc_token]": payment_method_optionsCardCvc_token }
          : {}),
        ...(payment_method_optionsCardInstallmentsEnabled
          ? {
              "payment_method_options[card][installments][enabled]":
                payment_method_optionsCardInstallmentsEnabled,
            }
          : {}),
        ...(payment_method_optionsCardInstallmentsPlanCount
          ? {
              "payment_method_options[card][installments][plan][count]":
                payment_method_optionsCardInstallmentsPlanCount,
            }
          : {}),
        ...(payment_method_optionsCardInstallmentsPlanInterval
          ? {
              "payment_method_options[card][installments][plan][interval]":
                payment_method_optionsCardInstallmentsPlanInterval,
            }
          : {}),
        ...(payment_method_optionsCardInstallmentsPlanType
          ? {
              "payment_method_options[card][installments][plan][type]":
                payment_method_optionsCardInstallmentsPlanType,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsAmount
          ? {
              "payment_method_options[card][mandate_options][amount]":
                payment_method_optionsCardMandate_optionsAmount,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsAmount_type
          ? {
              "payment_method_options[card][mandate_options][amount_type]":
                payment_method_optionsCardMandate_optionsAmount_type,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsInterval
          ? {
              "payment_method_options[card][mandate_options][interval]":
                payment_method_optionsCardMandate_optionsInterval,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsReference
          ? {
              "payment_method_options[card][mandate_options][reference]":
                payment_method_optionsCardMandate_optionsReference,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsStart_date
          ? {
              "payment_method_options[card][mandate_options][start_date]":
                payment_method_optionsCardMandate_optionsStart_date,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsDescription
          ? {
              "payment_method_options[card][mandate_options][description]":
                payment_method_optionsCardMandate_optionsDescription,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsEnd_date
          ? {
              "payment_method_options[card][mandate_options][end_date]":
                payment_method_optionsCardMandate_optionsEnd_date,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsInterval_count
          ? {
              "payment_method_options[card][mandate_options][interval_count]":
                payment_method_optionsCardMandate_optionsInterval_count,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsSupported_types0
          ? {
              "payment_method_options[card][mandate_options][supported_types][0]":
                payment_method_optionsCardMandate_optionsSupported_types0,
            }
          : {}),
        ...(payment_method_optionsCardMandate_optionsSupported_types1
          ? {
              "payment_method_options[card][mandate_options][supported_types][1]":
                payment_method_optionsCardMandate_optionsSupported_types1,
            }
          : {}),
        ...(payment_method_optionsCardNetwork
          ? { "payment_method_options[card][network]": payment_method_optionsCardNetwork }
          : {}),
        ...(payment_method_optionsCardRequest_three_d_secure
          ? {
              "payment_method_options[card][request_three_d_secure]":
                payment_method_optionsCardRequest_three_d_secure,
            }
          : {}),
        ...(payment_method_optionsCardSetup_future_usage
          ? {
              "payment_method_options[card][setup_future_usage]":
                payment_method_optionsCardSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsCardStatement_descriptor_suffix_kana
          ? {
              "payment_method_options[card][statement_descriptor_suffix_kana]":
                payment_method_optionsCardStatement_descriptor_suffix_kana,
            }
          : {}),
        ...(payment_method_optionsCardStatement_descriptor_suffix_kanji
          ? {
              "payment_method_options[card][statement_descriptor_suffix_kanji]":
                payment_method_optionsCardStatement_descriptor_suffix_kanji,
            }
          : {}),
        ...(payment_method_optionsCard_presentRequest_extended_authorization
          ? {
              "payment_method_options[card_present][request_extended_authorization]":
                payment_method_optionsCard_presentRequest_extended_authorization,
            }
          : {}),
        ...(payment_method_optionsCard_presentRequest_incremental_authorization_support
          ? {
              "payment_method_options[card_present][request_incremental_authorization_support]":
                payment_method_optionsCard_presentRequest_incremental_authorization_support,
            }
          : {}),
        ...(payment_method_optionsCustomer_balanceBank_transferType
          ? {
              "payment_method_options[customer_balance][bank_transfer][type]":
                payment_method_optionsCustomer_balanceBank_transferType,
            }
          : {}),
        ...(payment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry
          ? {
              "payment_method_options[customer_balance][bank_transfer][eu_bank_transfer][country]":
                payment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
            }
          : {}),
        ...(payment_method_optionsCustomer_balanceBank_transferRequested_address_types0
          ? {
              "payment_method_options[customer_balance][bank_transfer][requested_address_types][0]":
                payment_method_optionsCustomer_balanceBank_transferRequested_address_types0,
            }
          : {}),
        ...(payment_method_optionsCustomer_balanceBank_transferRequested_address_types1
          ? {
              "payment_method_options[customer_balance][bank_transfer][requested_address_types][1]":
                payment_method_optionsCustomer_balanceBank_transferRequested_address_types1,
            }
          : {}),
        ...(payment_method_optionsCustomer_balanceFunding_type
          ? {
              "payment_method_options[customer_balance][funding_type]":
                payment_method_optionsCustomer_balanceFunding_type,
            }
          : {}),
        ...(payment_method_optionsCustomer_balanceSetup_future_usage
          ? {
              "payment_method_options[customer_balance][setup_future_usage]":
                payment_method_optionsCustomer_balanceSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsEpsSetup_future_usage
          ? {
              "payment_method_options[eps][setup_future_usage]":
                payment_method_optionsEpsSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsFpxSetup_future_usage
          ? {
              "payment_method_options[fpx][setup_future_usage]":
                payment_method_optionsFpxSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsGiropaySetup_future_usage
          ? {
              "payment_method_options[giropay][setup_future_usage]":
                payment_method_optionsGiropaySetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsGrabpaySetup_future_usage
          ? {
              "payment_method_options[grabpay][setup_future_usage]":
                payment_method_optionsGrabpaySetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsIdealSetup_future_usage
          ? {
              "payment_method_options[ideal][setup_future_usage]":
                payment_method_optionsIdealSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsKlarnaCapture_method
          ? {
              "payment_method_options[klarna][capture_method]":
                payment_method_optionsKlarnaCapture_method,
            }
          : {}),
        ...(payment_method_optionsKlarnaPreferred_locale
          ? {
              "payment_method_options[klarna][preferred_locale]":
                payment_method_optionsKlarnaPreferred_locale,
            }
          : {}),
        ...(payment_method_optionsKlarnaSetup_future_usage
          ? {
              "payment_method_options[klarna][setup_future_usage]":
                payment_method_optionsKlarnaSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsKonbiniConfirmation_number
          ? {
              "payment_method_options[konbini][confirmation_number]":
                payment_method_optionsKonbiniConfirmation_number,
            }
          : {}),
        ...(payment_method_optionsKonbiniExpires_after_days
          ? {
              "payment_method_options[konbini][expires_after_days]":
                payment_method_optionsKonbiniExpires_after_days,
            }
          : {}),
        ...(payment_method_optionsKonbiniExpires_at
          ? {
              "payment_method_options[konbini][expires_at]":
                payment_method_optionsKonbiniExpires_at,
            }
          : {}),
        ...(payment_method_optionsKonbiniProduct_description
          ? {
              "payment_method_options[konbini][product_description]":
                payment_method_optionsKonbiniProduct_description,
            }
          : {}),
        ...(payment_method_optionsKonbiniSetup_future_usage
          ? {
              "payment_method_options[konbini][setup_future_usage]":
                payment_method_optionsKonbiniSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsLinkCapture_method
          ? {
              "payment_method_options[link][capture_method]":
                payment_method_optionsLinkCapture_method,
            }
          : {}),
        ...(payment_method_optionsLinkPersistent_token
          ? {
              "payment_method_options[link][persistent_token]":
                payment_method_optionsLinkPersistent_token,
            }
          : {}),
        ...(payment_method_optionsLinkSetup_future_usage
          ? {
              "payment_method_options[link][setup_future_usage]":
                payment_method_optionsLinkSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsOxxoExpires_after_days
          ? {
              "payment_method_options[oxxo][expires_after_days]":
                payment_method_optionsOxxoExpires_after_days,
            }
          : {}),
        ...(payment_method_optionsOxxoSetup_future_usage
          ? {
              "payment_method_options[oxxo][setup_future_usage]":
                payment_method_optionsOxxoSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsP24Setup_future_usage
          ? {
              "payment_method_options[p24][setup_future_usage]":
                payment_method_optionsP24Setup_future_usage,
            }
          : {}),
        ...(payment_method_optionsP24Tos_shown_and_accepted
          ? {
              "payment_method_options[p24][tos_shown_and_accepted]":
                payment_method_optionsP24Tos_shown_and_accepted,
            }
          : {}),
        ...(payment_method_optionsPaynowSetup_future_usage
          ? {
              "payment_method_options[paynow][setup_future_usage]":
                payment_method_optionsPaynowSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsPromptpaySetup_future_usage
          ? {
              "payment_method_options[promptpay][setup_future_usage]":
                payment_method_optionsPromptpaySetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsSepa_debitSetup_future_usage
          ? {
              "payment_method_options[sepa_debit][setup_future_usage]":
                payment_method_optionsSepa_debitSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsSofortPreferred_language
          ? {
              "payment_method_options[sofort][preferred_language]":
                payment_method_optionsSofortPreferred_language,
            }
          : {}),
        ...(payment_method_optionsSofortSetup_future_usage
          ? {
              "payment_method_options[sofort][setup_future_usage]":
                payment_method_optionsSofortSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountFinancial_connectionsPermissions0
          ? {
              "payment_method_options[us_bank_account][financial_connections][permissions][0]":
                payment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountFinancial_connectionsPermissions1
          ? {
              "payment_method_options[us_bank_account][financial_connections][permissions][1]":
                payment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountFinancial_connectionsReturn_url
          ? {
              "payment_method_options[us_bank_account][financial_connections][return_url]":
                payment_method_optionsUs_bank_accountFinancial_connectionsReturn_url,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountNetworksRequested0
          ? {
              "payment_method_options[us_bank_account][networks][requested][0]":
                payment_method_optionsUs_bank_accountNetworksRequested0,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountNetworksRequested1
          ? {
              "payment_method_options[us_bank_account][networks][requested][1]":
                payment_method_optionsUs_bank_accountNetworksRequested1,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountSetup_future_usage
          ? {
              "payment_method_options[us_bank_account][setup_future_usage]":
                payment_method_optionsUs_bank_accountSetup_future_usage,
            }
          : {}),
        ...(payment_method_optionsUs_bank_accountVerification_method
          ? {
              "payment_method_options[us_bank_account][verification_method]":
                payment_method_optionsUs_bank_accountVerification_method,
            }
          : {}),
        ...(payment_method_optionsWechat_payClient
          ? { "payment_method_options[wechat_pay][client]": payment_method_optionsWechat_payClient }
          : {}),
        ...(payment_method_optionsWechat_payApp_id
          ? { "payment_method_options[wechat_pay][app_id]": payment_method_optionsWechat_payApp_id }
          : {}),
        ...(payment_method_optionsWechat_paySetup_future_usage
          ? {
              "payment_method_options[wechat_pay][setup_future_usage]":
                payment_method_optionsWechat_paySetup_future_usage,
            }
          : {}),
        ...(payment_method_types0 ? { "payment_method_types[0]": payment_method_types0 } : {}),
        ...(payment_method_types1 ? { "payment_method_types[1]": payment_method_types1 } : {}),
        ...(radar_optionsSession ? { "radar_options[session]": radar_optionsSession } : {}),
        ...(shippingAddressCity ? { "shipping[address][city]": shippingAddressCity } : {}),
        ...(shippingAddressCountry ? { "shipping[address][country]": shippingAddressCountry } : {}),
        ...(shippingAddressLine1 ? { "shipping[address][line1]": shippingAddressLine1 } : {}),
        ...(shippingAddressLine2 ? { "shipping[address][line2]": shippingAddressLine2 } : {}),
        ...(shippingAddressPostal_code
          ? { "shipping[address][postal_code]": shippingAddressPostal_code }
          : {}),
        ...(shippingAddressState ? { "shipping[address][state]": shippingAddressState } : {}),
        ...(shippingName ? { "shipping[name]": shippingName } : {}),
        ...(shippingCarrier ? { "shipping[carrier]": shippingCarrier } : {}),
        ...(shippingPhone ? { "shipping[phone]": shippingPhone } : {}),
        ...(shippingTracking_number
          ? { "shipping[tracking_number]": shippingTracking_number }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, intent }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_INTENT: "A valid intent field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof intent !== "string") throw new Error(ERRORS.INVALID_INTENT);
};
