const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    source,
    amount,
    expand,
    mandate,
    metadata,
    owner,
    source_order,
    expand0,
    expand1,
    mandateAcceptanceStatus,
    mandateAcceptanceDate,
    mandateAcceptanceIp,
    mandateAcceptanceOfflineContact_email,
    mandateAcceptanceOnlineDate,
    mandateAcceptanceOnlineIp,
    mandateAcceptanceOnlineUser_agent,
    mandateAcceptanceType,
    mandateAcceptanceUser_agent,
    mandateAmount,
    mandateCurrency,
    mandateInterval,
    mandateNotification_method,
    ownerAddressCity,
    ownerAddressCountry,
    ownerAddressLine1,
    ownerAddressLine2,
    ownerAddressPostal_code,
    ownerAddressState,
    ownerEmail,
    ownerName,
    ownerPhone,
    source_orderItems0Amount,
    source_orderItems0Currency,
    source_orderItems0Description,
    source_orderItems0Parent,
    source_orderItems0Quantity,
    source_orderItems0Type,
    source_orderItems1Amount,
    source_orderItems1Currency,
    source_orderItems1Description,
    source_orderItems1Parent,
    source_orderItems1Quantity,
    source_orderItems1Type,
    source_orderShippingAddressLine1,
    source_orderShippingAddressCity,
    source_orderShippingAddressCountry,
    source_orderShippingAddressLine2,
    source_orderShippingAddressPostal_code,
    source_orderShippingAddressState,
    source_orderShippingCarrier,
    source_orderShippingName,
    source_orderShippingPhone,
    source_orderShippingTracking_number,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/sources/${source}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(amount ? { amount } : {}),
        ...(expand ? { expand } : {}),
        ...(mandate ? { mandate } : {}),
        ...(metadata ? { metadata } : {}),
        ...(owner ? { owner } : {}),
        ...(source_order ? { source_order } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(mandateAcceptanceStatus
          ? { "mandate[acceptance][status]": mandateAcceptanceStatus }
          : {}),
        ...(mandateAcceptanceDate ? { "mandate[acceptance][date]": mandateAcceptanceDate } : {}),
        ...(mandateAcceptanceIp ? { "mandate[acceptance][ip]": mandateAcceptanceIp } : {}),
        ...(mandateAcceptanceOfflineContact_email
          ? { "mandate[acceptance][offline][contact_email]": mandateAcceptanceOfflineContact_email }
          : {}),
        ...(mandateAcceptanceOnlineDate
          ? { "mandate[acceptance][online][date]": mandateAcceptanceOnlineDate }
          : {}),
        ...(mandateAcceptanceOnlineIp
          ? { "mandate[acceptance][online][ip]": mandateAcceptanceOnlineIp }
          : {}),
        ...(mandateAcceptanceOnlineUser_agent
          ? { "mandate[acceptance][online][user_agent]": mandateAcceptanceOnlineUser_agent }
          : {}),
        ...(mandateAcceptanceType ? { "mandate[acceptance][type]": mandateAcceptanceType } : {}),
        ...(mandateAcceptanceUser_agent
          ? { "mandate[acceptance][user_agent]": mandateAcceptanceUser_agent }
          : {}),
        ...(mandateAmount ? { "mandate[amount]": mandateAmount } : {}),
        ...(mandateCurrency ? { "mandate[currency]": mandateCurrency } : {}),
        ...(mandateInterval ? { "mandate[interval]": mandateInterval } : {}),
        ...(mandateNotification_method
          ? { "mandate[notification_method]": mandateNotification_method }
          : {}),
        ...(ownerAddressCity ? { "owner[address][city]": ownerAddressCity } : {}),
        ...(ownerAddressCountry ? { "owner[address][country]": ownerAddressCountry } : {}),
        ...(ownerAddressLine1 ? { "owner[address][line1]": ownerAddressLine1 } : {}),
        ...(ownerAddressLine2 ? { "owner[address][line2]": ownerAddressLine2 } : {}),
        ...(ownerAddressPostal_code
          ? { "owner[address][postal_code]": ownerAddressPostal_code }
          : {}),
        ...(ownerAddressState ? { "owner[address][state]": ownerAddressState } : {}),
        ...(ownerEmail ? { "owner[email]": ownerEmail } : {}),
        ...(ownerName ? { "owner[name]": ownerName } : {}),
        ...(ownerPhone ? { "owner[phone]": ownerPhone } : {}),
        ...(source_orderItems0Amount
          ? { "source_order[items][0][amount]": source_orderItems0Amount }
          : {}),
        ...(source_orderItems0Currency
          ? { "source_order[items][0][currency]": source_orderItems0Currency }
          : {}),
        ...(source_orderItems0Description
          ? { "source_order[items][0][description]": source_orderItems0Description }
          : {}),
        ...(source_orderItems0Parent
          ? { "source_order[items][0][parent]": source_orderItems0Parent }
          : {}),
        ...(source_orderItems0Quantity
          ? { "source_order[items][0][quantity]": source_orderItems0Quantity }
          : {}),
        ...(source_orderItems0Type
          ? { "source_order[items][0][type]": source_orderItems0Type }
          : {}),
        ...(source_orderItems1Amount
          ? { "source_order[items][1][amount]": source_orderItems1Amount }
          : {}),
        ...(source_orderItems1Currency
          ? { "source_order[items][1][currency]": source_orderItems1Currency }
          : {}),
        ...(source_orderItems1Description
          ? { "source_order[items][1][description]": source_orderItems1Description }
          : {}),
        ...(source_orderItems1Parent
          ? { "source_order[items][1][parent]": source_orderItems1Parent }
          : {}),
        ...(source_orderItems1Quantity
          ? { "source_order[items][1][quantity]": source_orderItems1Quantity }
          : {}),
        ...(source_orderItems1Type
          ? { "source_order[items][1][type]": source_orderItems1Type }
          : {}),
        ...(source_orderShippingAddressLine1
          ? { "source_order[shipping][address][line1]": source_orderShippingAddressLine1 }
          : {}),
        ...(source_orderShippingAddressCity
          ? { "source_order[shipping][address][city]": source_orderShippingAddressCity }
          : {}),
        ...(source_orderShippingAddressCountry
          ? { "source_order[shipping][address][country]": source_orderShippingAddressCountry }
          : {}),
        ...(source_orderShippingAddressLine2
          ? { "source_order[shipping][address][line2]": source_orderShippingAddressLine2 }
          : {}),
        ...(source_orderShippingAddressPostal_code
          ? {
              "source_order[shipping][address][postal_code]":
                source_orderShippingAddressPostal_code,
            }
          : {}),
        ...(source_orderShippingAddressState
          ? { "source_order[shipping][address][state]": source_orderShippingAddressState }
          : {}),
        ...(source_orderShippingCarrier
          ? { "source_order[shipping][carrier]": source_orderShippingCarrier }
          : {}),
        ...(source_orderShippingName
          ? { "source_order[shipping][name]": source_orderShippingName }
          : {}),
        ...(source_orderShippingPhone
          ? { "source_order[shipping][phone]": source_orderShippingPhone }
          : {}),
        ...(source_orderShippingTracking_number
          ? { "source_order[shipping][tracking_number]": source_orderShippingTracking_number }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, source }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_SOURCE: "A valid source field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof source !== "string") throw new Error(ERRORS.INVALID_SOURCE);
};
