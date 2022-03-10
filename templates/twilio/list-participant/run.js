/**
 * ----------------------------------------------------------------------------------------------------
 * List Participant [Run]
 *
 * @description - Retrieve a list of participants belonging to the account used to make the request
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, conferenceSid, muted, hold, coaching, pageSize } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Conferences/${conferenceSid}/Participants.json`,
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      params: {
        ...(muted ? { Muted: muted } : {}),
        ...(hold ? { Hold: hold } : {}),
        ...(coaching ? { Coaching: coaching } : {}),
        ...(pageSize ? { PageSize: pageSize } : {}),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
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
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, conferenceSid }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_CONFERENCE_SID: "A valid conferenceSid field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof conferenceSid !== "string") throw new Error(ERRORS.INVALID_CONFERENCE_SID);
};
