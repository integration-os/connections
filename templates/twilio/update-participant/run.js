/**
 * ----------------------------------------------------------------------------------------------------
 * Update Participant [Run]
 *
 * @description - Update the properties of the participant
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
    conferenceSid,
    callSid,
    announceMethod,
    announceUrl,
    beepOnExit,
    callSidToCoach,
    coaching,
    endConferenceOnExit,
    hold,
    holdMethod,
    holdUrl,
    muted,
    waitMethod,
    waitUrl,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Conferences/${conferenceSid}/Participants/${callSid}.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({
        ...(announceMethod ? { AnnounceMethod: announceMethod } : {}),
        ...(announceUrl ? { AnnounceUrl: announceUrl } : {}),
        ...(beepOnExit ? { BeepOnExit: beepOnExit } : {}),
        ...(callSidToCoach ? { CallSidToCoach: callSidToCoach } : {}),
        ...(coaching ? { Coaching: coaching } : {}),
        ...(endConferenceOnExit ? { EndConferenceOnExit: endConferenceOnExit } : {}),
        ...(hold ? { Hold: hold } : {}),
        ...(holdMethod ? { HoldMethod: holdMethod } : {}),
        ...(holdUrl ? { HoldUrl: holdUrl } : {}),
        ...(muted ? { Muted: muted } : {}),
        ...(waitMethod ? { WaitMethod: waitMethod } : {}),
        ...(waitUrl ? { WaitUrl: waitUrl } : {}),
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
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, conferenceSid, callSid }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_CONFERENCE_SID: "A valid conferenceSid field (string) was not provided in the input.",
    INVALID_CALL_SID: "A valid callSid field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof conferenceSid !== "string") throw new Error(ERRORS.INVALID_CONFERENCE_SID);
  if (typeof callSid !== "string") throw new Error(ERRORS.INVALID_CALL_SID);
};
