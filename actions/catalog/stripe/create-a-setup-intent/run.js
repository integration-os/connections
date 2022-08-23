const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    attach_to_self,
    confirm,
    customer,
    description,
    expand,
    flow_directions,
    mandate_data,
    metadata,
    on_behalf_of,
    payment_method,
    payment_method_data,
    payment_method_options,
    payment_method_types,
    return_url,
    single_use,
    usage,
    expand0,
    expand1,
    flow_directions0,
    flow_directions1,
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
    payment_method_optionsAcss_debitCurrency,
    payment_method_optionsAcss_debitMandate_optionsCustom_mandate_url,
    payment_method_optionsAcss_debitMandate_optionsDefault_for0,
    payment_method_optionsAcss_debitMandate_optionsDefault_for1,
    payment_method_optionsAcss_debitMandate_optionsInterval_description,
    payment_method_optionsAcss_debitMandate_optionsPayment_schedule,
    payment_method_optionsAcss_debitMandate_optionsTransaction_type,
    payment_method_optionsAcss_debitVerification_method,
    payment_method_optionsBlikCode,
    payment_method_optionsCardMandate_optionsAmount,
    payment_method_optionsCardMandate_optionsAmount_type,
    payment_method_optionsCardMandate_optionsCurrency,
    payment_method_optionsCardMandate_optionsInterval,
    payment_method_optionsCardMandate_optionsReference,
    payment_method_optionsCardMandate_optionsStart_date,
    payment_method_optionsCardMandate_optionsDescription,
    payment_method_optionsCardMandate_optionsEnd_date,
    payment_method_optionsCardMandate_optionsInterval_count,
    payment_method_optionsCardMandate_optionsSupported_types0,
    payment_method_optionsCardMandate_optionsSupported_types1,
    payment_method_optionsCardRequest_three_d_secure,
    payment_method_optionsLinkPersistent_token,
    payment_method_optionsUs_bank_accountFinancial_connectionsPermissions0,
    payment_method_optionsUs_bank_accountFinancial_connectionsPermissions1,
    payment_method_optionsUs_bank_accountFinancial_connectionsReturn_url,
    payment_method_optionsUs_bank_accountNetworksRequested0,
    payment_method_optionsUs_bank_accountNetworksRequested1,
    payment_method_optionsUs_bank_accountVerification_method,
    payment_method_types0,
    payment_method_types1,
    single_useAmount,
    single_useCurrency,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/setup_intents",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(attach_to_self ? { attach_to_self } : {}),
        ...(confirm ? { confirm } : {}),
        ...(customer ? { customer } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(flow_directions ? { flow_directions } : {}),
        ...(mandate_data ? { mandate_data } : {}),
        ...(metadata ? { metadata } : {}),
        ...(on_behalf_of ? { on_behalf_of } : {}),
        ...(payment_method ? { payment_method } : {}),
        ...(payment_method_data ? { payment_method_data } : {}),
        ...(payment_method_options ? { payment_method_options } : {}),
        ...(payment_method_types ? { payment_method_types } : {}),
        ...(return_url ? { return_url } : {}),
        ...(single_use ? { single_use } : {}),
        ...(usage ? { usage } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(flow_directions0 ? { "flow_directions[0]": flow_directions0 } : {}),
        ...(flow_directions1 ? { "flow_directions[1]": flow_directions1 } : {}),
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
        ...(payment_method_optionsAcss_debitCurrency
          ? {
              "payment_method_options[acss_debit][currency]":
                payment_method_optionsAcss_debitCurrency,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsCustom_mandate_url
          ? {
              "payment_method_options[acss_debit][mandate_options][custom_mandate_url]":
                payment_method_optionsAcss_debitMandate_optionsCustom_mandate_url,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsDefault_for0
          ? {
              "payment_method_options[acss_debit][mandate_options][default_for][0]":
                payment_method_optionsAcss_debitMandate_optionsDefault_for0,
            }
          : {}),
        ...(payment_method_optionsAcss_debitMandate_optionsDefault_for1
          ? {
              "payment_method_options[acss_debit][mandate_options][default_for][1]":
                payment_method_optionsAcss_debitMandate_optionsDefault_for1,
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
        ...(payment_method_optionsAcss_debitVerification_method
          ? {
              "payment_method_options[acss_debit][verification_method]":
                payment_method_optionsAcss_debitVerification_method,
            }
          : {}),
        ...(payment_method_optionsBlikCode
          ? { "payment_method_options[blik][code]": payment_method_optionsBlikCode }
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
        ...(payment_method_optionsCardMandate_optionsCurrency
          ? {
              "payment_method_options[card][mandate_options][currency]":
                payment_method_optionsCardMandate_optionsCurrency,
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
        ...(payment_method_optionsCardRequest_three_d_secure
          ? {
              "payment_method_options[card][request_three_d_secure]":
                payment_method_optionsCardRequest_three_d_secure,
            }
          : {}),
        ...(payment_method_optionsLinkPersistent_token
          ? {
              "payment_method_options[link][persistent_token]":
                payment_method_optionsLinkPersistent_token,
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
        ...(payment_method_optionsUs_bank_accountVerification_method
          ? {
              "payment_method_options[us_bank_account][verification_method]":
                payment_method_optionsUs_bank_accountVerification_method,
            }
          : {}),
        ...(payment_method_types0 ? { "payment_method_types[0]": payment_method_types0 } : {}),
        ...(payment_method_types1 ? { "payment_method_types[1]": payment_method_types1 } : {}),
        ...(single_useAmount ? { "single_use[amount]": single_useAmount } : {}),
        ...(single_useCurrency ? { "single_use[currency]": single_useCurrency } : {}),
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
