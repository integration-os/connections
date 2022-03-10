/**
 * ----------------------------------------------------------------------------------------------------
 * Update Application [Input]
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
    sid: "stringstringstringstringstringstri", // Required

    // apiVersion: "string",
    // friendlyName: "string",
    // messageStatusCallback: "http://example.com",
    // smsFallbackMethod: "HEAD",
    // smsFallbackUrl: "http://example.com",
    // smsMethod: "HEAD",
    // smsStatusCallback: "http://example.com",
    // smsUrl: "http://example.com",
    // statusCallback: "http://example.com",
    // statusCallbackMethod: "HEAD",
    // voiceCallerIdLookup: true,
    // voiceFallbackMethod: "HEAD",
    // voiceFallbackUrl: "http://example.com",
    // voiceMethod: "HEAD",
    // voiceUrl: "http://example.com",
  };
};
