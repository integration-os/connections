const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    amount,
    application_fee,
    application_fee_amount,
    capture,
    card,
    currency,
    customer,
    description,
    destination,
    expand,
    metadata,
    on_behalf_of,
    radar_options,
    receipt_email,
    shipping,
    source,
    statement_descriptor,
    statement_descriptor_suffix,
    transfer_data,
    transfer_group,
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
    destinationAccount,
    destinationAmount,
    expand0,
    expand1,
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
    transfer_dataDestination,
    transfer_dataAmount,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/charges",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(amount ? { amount } : {}),
        ...(application_fee ? { application_fee } : {}),
        ...(application_fee_amount ? { application_fee_amount } : {}),
        ...(capture ? { capture } : {}),
        ...(card ? { card } : {}),
        ...(currency ? { currency } : {}),
        ...(customer ? { customer } : {}),
        ...(description ? { description } : {}),
        ...(destination ? { destination } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(on_behalf_of ? { on_behalf_of } : {}),
        ...(radar_options ? { radar_options } : {}),
        ...(receipt_email ? { receipt_email } : {}),
        ...(shipping ? { shipping } : {}),
        ...(source ? { source } : {}),
        ...(statement_descriptor ? { statement_descriptor } : {}),
        ...(statement_descriptor_suffix ? { statement_descriptor_suffix } : {}),
        ...(transfer_data ? { transfer_data } : {}),
        ...(transfer_group ? { transfer_group } : {}),
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
        ...(destinationAccount ? { "destination[account]": destinationAccount } : {}),
        ...(destinationAmount ? { "destination[amount]": destinationAmount } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
};
