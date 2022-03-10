/**
 * ----------------------------------------------------------------------------------------------------
 * Create Sip Domain [Run]
 *
 * @description - Create a new domain
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
    domainName,
    byocTrunkSid,
    emergencyCallerSid,
    emergencyCallingEnabled,
    friendlyName,
    secure,
    sipRegistration,
    voiceFallbackMethod,
    voiceFallbackUrl,
    voiceMethod,
    voiceStatusCallbackMethod,
    voiceStatusCallbackUrl,
    voiceUrl,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/SIP/Domains.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({
        DomainName: domainName,
        ...(byocTrunkSid ? { ByocTrunkSid: byocTrunkSid } : {}),
        ...(emergencyCallerSid ? { EmergencyCallerSid: emergencyCallerSid } : {}),
        ...(emergencyCallingEnabled ? { EmergencyCallingEnabled: emergencyCallingEnabled } : {}),
        ...(friendlyName ? { FriendlyName: friendlyName } : {}),
        ...(secure ? { Secure: secure } : {}),
        ...(sipRegistration ? { SipRegistration: sipRegistration } : {}),
        ...(voiceFallbackMethod ? { VoiceFallbackMethod: voiceFallbackMethod } : {}),
        ...(voiceFallbackUrl ? { VoiceFallbackUrl: voiceFallbackUrl } : {}),
        ...(voiceMethod ? { VoiceMethod: voiceMethod } : {}),
        ...(voiceStatusCallbackMethod
          ? { VoiceStatusCallbackMethod: voiceStatusCallbackMethod }
          : {}),
        ...(voiceStatusCallbackUrl ? { VoiceStatusCallbackUrl: voiceStatusCallbackUrl } : {}),
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
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, domainName }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_DOMAIN_NAME: "A valid domainName field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof domainName !== "string") throw new Error(ERRORS.INVALID_DOMAIN_NAME);
};
