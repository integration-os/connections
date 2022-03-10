/**
 * ----------------------------------------------------------------------------------------------------
 * Create Call [Input]
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
    from: "string", // Required
    to: "string", // Required

    // applicationSid: "stringstringstringstringstringstri",
    // asyncAmd: "string",
    // asyncAmdStatusCallback: "http://example.com",
    // asyncAmdStatusCallbackMethod: "HEAD",
    // byoc: "stringstringstringstringstringstri",
    // callReason: "string",
    // callToken: "string",
    // callerId: "string",
    // fallbackMethod: "HEAD",
    // fallbackUrl: "http://example.com",
    // machineDetection: "string",
    // machineDetectionSilenceTimeout: 0,
    // machineDetectionSpeechEndThreshold: 0,
    // machineDetectionSpeechThreshold: 0,
    // machineDetectionTimeout: 0,
    // method: "HEAD",
    // record: true,
    // recordingChannels: "string",
    // recordingStatusCallback: "string",
    // recordingStatusCallbackEvent: ["string"],
    // recordingStatusCallbackMethod: "HEAD",
    // recordingTrack: "string",
    // sendDigits: "string",
    // sipAuthPassword: "string",
    // sipAuthUsername: "string",
    // statusCallback: "http://example.com",
    // statusCallbackEvent: ["string"],
    // statusCallbackMethod: "HEAD",
    // timeLimit: 0,
    // timeout: 0,
    // trim: "string",
    // twiml: "string",
    // url: "http://example.com",
  };
};
