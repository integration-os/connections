/**
 * ----------------------------------------------------------------------------------------------------
 * Create Message [Run]
 *
 * @description - Send a message from the account used to make the request
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    to,
    addressRetention,
    applicationSid,
    attempt,
    body,
    contentRetention,
    forceDelivery,
    from,
    maxPrice,
    mediaUrl,
    messagingServiceSid,
    persistentAction,
    provideFeedback,
    scheduleType,
    sendAsMms,
    sendAt,
    smartEncoded,
    statusCallback,
    validityPeriod,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({
        To: to,
        ...(addressRetention ? { AddressRetention: addressRetention } : {}),
        ...(applicationSid ? { ApplicationSid: applicationSid } : {}),
        ...(attempt ? { Attempt: attempt } : {}),
        ...(body ? { Body: body } : {}),
        ...(contentRetention ? { ContentRetention: contentRetention } : {}),
        ...(forceDelivery ? { ForceDelivery: forceDelivery } : {}),
        ...(from ? { From: from } : {}),
        ...(maxPrice ? { MaxPrice: maxPrice } : {}),
        ...(mediaUrl ? { MediaUrl: mediaUrl } : {}),
        ...(messagingServiceSid ? { MessagingServiceSid: messagingServiceSid } : {}),
        ...(persistentAction ? { PersistentAction: persistentAction } : {}),
        ...(provideFeedback ? { ProvideFeedback: provideFeedback } : {}),
        ...(scheduleType ? { ScheduleType: scheduleType } : {}),
        ...(sendAsMms ? { SendAsMms: sendAsMms } : {}),
        ...(sendAt ? { SendAt: sendAt } : {}),
        ...(smartEncoded ? { SmartEncoded: smartEncoded } : {}),
        ...(statusCallback ? { StatusCallback: statusCallback } : {}),
        ...(validityPeriod ? { ValidityPeriod: validityPeriod } : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, to }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
};
