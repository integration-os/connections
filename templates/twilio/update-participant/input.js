/**
 * ----------------------------------------------------------------------------------------------------
 * Update Participant [Input]
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
    conferenceSid: "stringstringstringstringstringstri", // Required
    callSid: "string", // Required

    // announceMethod: "HEAD",
    // announceUrl: "http://example.com",
    // beepOnExit: true,
    // callSidToCoach: "stringstringstringstringstringstri",
    // coaching: true,
    // endConferenceOnExit: true,
    // hold: true,
    // holdMethod: "HEAD",
    // holdUrl: "http://example.com",
    // muted: true,
    // waitMethod: "HEAD",
    // waitUrl: "http://example.com",
  };
};
