/**
 * ----------------------------------------------------------------------------------------------------
 * Create Participant [Input]
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
    conferenceSid: "string", // Required
    from: "string", // Required
    to: "string", // Required

    // beep: "string",
    // byoc: "stringstringstringstringstringstri",
    // callReason: "string",
    // callSidToCoach: "stringstringstringstringstringstri",
    // callerId: "string",
    // coaching: true,
    // conferenceRecord: "string",
    // conferenceRecordingStatusCallback: "http://example.com",
    // conferenceRecordingStatusCallbackEvent: ["string"],
    // conferenceRecordingStatusCallbackMethod: "HEAD",
    // conferenceStatusCallback: "http://example.com",
    // conferenceStatusCallbackEvent: ["string"],
    // conferenceStatusCallbackMethod: "HEAD",
    // conferenceTrim: "string",
    // earlyMedia: true,
    // endConferenceOnExit: true,
    // jitterBufferSize: "string",
    // label: "string",
    // maxParticipants: 0,
    // muted: true,
    // record: true,
    // recordingChannels: "string",
    // recordingStatusCallback: "http://example.com",
    // recordingStatusCallbackEvent: ["string"],
    // recordingStatusCallbackMethod: "HEAD",
    // recordingTrack: "string",
    // region: "string",
    // sipAuthPassword: "string",
    // sipAuthUsername: "string",
    // startConferenceOnEnter: true,
    // statusCallback: "http://example.com",
    // statusCallbackEvent: ["string"],
    // statusCallbackMethod: "HEAD",
    // timeLimit: 0,
    // timeout: 0,
    // waitMethod: "HEAD",
    // waitUrl: "http://example.com",
  };
};
