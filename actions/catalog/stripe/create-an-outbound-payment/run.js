const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    amount,
    currency,
    financial_account,
    customer,
    description,
    destination_payment_method,
    destination_payment_method_data,
    destination_payment_method_options,
    end_user_details,
    expand,
    metadata,
    statement_descriptor,
    destination_payment_method_dataType,
    destination_payment_method_dataBilling_detailsAddressCity,
    destination_payment_method_dataBilling_detailsAddressCountry,
    destination_payment_method_dataBilling_detailsAddressLine1,
    destination_payment_method_dataBilling_detailsAddressLine2,
    destination_payment_method_dataBilling_detailsAddressPostal_code,
    destination_payment_method_dataBilling_detailsAddressState,
    destination_payment_method_dataBilling_detailsEmail,
    destination_payment_method_dataBilling_detailsName,
    destination_payment_method_dataBilling_detailsPhone,
    destination_payment_method_dataFinancial_account,
    destination_payment_method_dataMetadata,
    destination_payment_method_dataUs_bank_accountAccount_holder_type,
    destination_payment_method_dataUs_bank_accountAccount_number,
    destination_payment_method_dataUs_bank_accountAccount_type,
    destination_payment_method_dataUs_bank_accountFinancial_connections_account,
    destination_payment_method_dataUs_bank_accountRouting_number,
    destination_payment_method_optionsUs_bank_accountNetwork,
    end_user_detailsPresent,
    end_user_detailsIp_address,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/treasury/outbound_payments",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        amount,
        currency,
        financial_account,
        ...(customer ? { customer } : {}),
        ...(description ? { description } : {}),
        ...(destination_payment_method ? { destination_payment_method } : {}),
        ...(destination_payment_method_data ? { destination_payment_method_data } : {}),
        ...(destination_payment_method_options ? { destination_payment_method_options } : {}),
        ...(end_user_details ? { end_user_details } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(statement_descriptor ? { statement_descriptor } : {}),
        ...(destination_payment_method_dataType
          ? { "destination_payment_method_data[type]": destination_payment_method_dataType }
          : {}),
        ...(destination_payment_method_dataBilling_detailsAddressCity
          ? {
              "destination_payment_method_data[billing_details][address][city]":
                destination_payment_method_dataBilling_detailsAddressCity,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsAddressCountry
          ? {
              "destination_payment_method_data[billing_details][address][country]":
                destination_payment_method_dataBilling_detailsAddressCountry,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsAddressLine1
          ? {
              "destination_payment_method_data[billing_details][address][line1]":
                destination_payment_method_dataBilling_detailsAddressLine1,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsAddressLine2
          ? {
              "destination_payment_method_data[billing_details][address][line2]":
                destination_payment_method_dataBilling_detailsAddressLine2,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsAddressPostal_code
          ? {
              "destination_payment_method_data[billing_details][address][postal_code]":
                destination_payment_method_dataBilling_detailsAddressPostal_code,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsAddressState
          ? {
              "destination_payment_method_data[billing_details][address][state]":
                destination_payment_method_dataBilling_detailsAddressState,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsEmail
          ? {
              "destination_payment_method_data[billing_details][email]":
                destination_payment_method_dataBilling_detailsEmail,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsName
          ? {
              "destination_payment_method_data[billing_details][name]":
                destination_payment_method_dataBilling_detailsName,
            }
          : {}),
        ...(destination_payment_method_dataBilling_detailsPhone
          ? {
              "destination_payment_method_data[billing_details][phone]":
                destination_payment_method_dataBilling_detailsPhone,
            }
          : {}),
        ...(destination_payment_method_dataFinancial_account
          ? {
              "destination_payment_method_data[financial_account]":
                destination_payment_method_dataFinancial_account,
            }
          : {}),
        ...(destination_payment_method_dataMetadata
          ? { "destination_payment_method_data[metadata]": destination_payment_method_dataMetadata }
          : {}),
        ...(destination_payment_method_dataUs_bank_accountAccount_holder_type
          ? {
              "destination_payment_method_data[us_bank_account][account_holder_type]":
                destination_payment_method_dataUs_bank_accountAccount_holder_type,
            }
          : {}),
        ...(destination_payment_method_dataUs_bank_accountAccount_number
          ? {
              "destination_payment_method_data[us_bank_account][account_number]":
                destination_payment_method_dataUs_bank_accountAccount_number,
            }
          : {}),
        ...(destination_payment_method_dataUs_bank_accountAccount_type
          ? {
              "destination_payment_method_data[us_bank_account][account_type]":
                destination_payment_method_dataUs_bank_accountAccount_type,
            }
          : {}),
        ...(destination_payment_method_dataUs_bank_accountFinancial_connections_account
          ? {
              "destination_payment_method_data[us_bank_account][financial_connections_account]":
                destination_payment_method_dataUs_bank_accountFinancial_connections_account,
            }
          : {}),
        ...(destination_payment_method_dataUs_bank_accountRouting_number
          ? {
              "destination_payment_method_data[us_bank_account][routing_number]":
                destination_payment_method_dataUs_bank_accountRouting_number,
            }
          : {}),
        ...(destination_payment_method_optionsUs_bank_accountNetwork
          ? {
              "destination_payment_method_options[us_bank_account][network]":
                destination_payment_method_optionsUs_bank_accountNetwork,
            }
          : {}),
        ...(end_user_detailsPresent
          ? { "end_user_details[present]": end_user_detailsPresent }
          : {}),
        ...(end_user_detailsIp_address
          ? { "end_user_details[ip_address]": end_user_detailsIp_address }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, amount, currency, financial_account }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (string) was not provided in the input.",
    INVALID_CURRENCY: "A valid currency field (string) was not provided in the input.",
    INVALID_FINANCIAL_ACCOUNT:
      "A valid financial_account field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof amount !== "string") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
  if (typeof financial_account !== "string") throw new Error(ERRORS.INVALID_FINANCIAL_ACCOUNT);
};
