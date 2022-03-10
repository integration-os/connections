/**
 * ----------------------------------------------------------------------------------------------------
 * Create Incoming Phone Number [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    TWILIO_ACCOUNT_SID: $trigger.env.TWILIO_ACCOUNT_SID, // Required
    TWILIO_AUTH_TOKEN: $trigger.env.TWILIO_AUTH_TOKEN, // Required

    // addressSid: "stringstringstringstringstringstri",
    // apiVersion: "string",
    // areaCode: "string",
    // bundleSid: "stringstringstringstringstringstri",
    // emergencyAddressSid: "stringstringstringstringstringstri",
    // emergencyStatus: "Active",
    // friendlyName: "string",
    // identitySid: "stringstringstringstringstringstri",
    // phoneNumber: "string",
    // smsApplicationSid: "stringstringstringstringstringstri",
    // smsFallbackMethod: "HEAD",
    // smsFallbackUrl: "http://example.com",
    // smsMethod: "HEAD",
    // smsUrl: "http://example.com",
    // statusCallback: "http://example.com",
    // statusCallbackMethod: "HEAD",
    // trunkSid: "stringstringstringstringstringstri",
    // voiceApplicationSid: "stringstringstringstringstringstri",
    // voiceCallerIdLookup: true,
    // voiceFallbackMethod: "HEAD",
    // voiceFallbackUrl: "http://example.com",
    // voiceMethod: "HEAD",
    // voiceReceiveMode: "voice",
    // voiceUrl: "http://example.com",
  };
};
