/**
 * ----------------------------------------------------------------------------------------------------
 * Update Incoming Phone Number [Run]
 *
 * @description - Update an incoming-phone-number instance.
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
    sid,
    accountSid,
    addressSid,
    apiVersion,
    bundleSid,
    emergencyAddressSid,
    emergencyStatus,
    friendlyName,
    identitySid,
    smsApplicationSid,
    smsFallbackMethod,
    smsFallbackUrl,
    smsMethod,
    smsUrl,
    statusCallback,
    statusCallbackMethod,
    trunkSid,
    voiceApplicationSid,
    voiceCallerIdLookup,
    voiceFallbackMethod,
    voiceFallbackUrl,
    voiceMethod,
    voiceReceiveMode,
    voiceUrl,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/IncomingPhoneNumbers/${sid}.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({
        ...(accountSid ? { AccountSid: accountSid } : {}),
        ...(addressSid ? { AddressSid: addressSid } : {}),
        ...(apiVersion ? { ApiVersion: apiVersion } : {}),
        ...(bundleSid ? { BundleSid: bundleSid } : {}),
        ...(emergencyAddressSid ? { EmergencyAddressSid: emergencyAddressSid } : {}),
        ...(emergencyStatus ? { EmergencyStatus: emergencyStatus } : {}),
        ...(friendlyName ? { FriendlyName: friendlyName } : {}),
        ...(identitySid ? { IdentitySid: identitySid } : {}),
        ...(smsApplicationSid ? { SmsApplicationSid: smsApplicationSid } : {}),
        ...(smsFallbackMethod ? { SmsFallbackMethod: smsFallbackMethod } : {}),
        ...(smsFallbackUrl ? { SmsFallbackUrl: smsFallbackUrl } : {}),
        ...(smsMethod ? { SmsMethod: smsMethod } : {}),
        ...(smsUrl ? { SmsUrl: smsUrl } : {}),
        ...(statusCallback ? { StatusCallback: statusCallback } : {}),
        ...(statusCallbackMethod ? { StatusCallbackMethod: statusCallbackMethod } : {}),
        ...(trunkSid ? { TrunkSid: trunkSid } : {}),
        ...(voiceApplicationSid ? { VoiceApplicationSid: voiceApplicationSid } : {}),
        ...(voiceCallerIdLookup ? { VoiceCallerIdLookup: voiceCallerIdLookup } : {}),
        ...(voiceFallbackMethod ? { VoiceFallbackMethod: voiceFallbackMethod } : {}),
        ...(voiceFallbackUrl ? { VoiceFallbackUrl: voiceFallbackUrl } : {}),
        ...(voiceMethod ? { VoiceMethod: voiceMethod } : {}),
        ...(voiceReceiveMode ? { VoiceReceiveMode: voiceReceiveMode } : {}),
        ...(voiceUrl ? { VoiceUrl: voiceUrl } : {}),
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
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, sid }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_SID: "A valid sid field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof sid !== "string") throw new Error(ERRORS.INVALID_SID);
};
