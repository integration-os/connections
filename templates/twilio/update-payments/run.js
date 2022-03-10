/**
 * ----------------------------------------------------------------------------------------------------
 * Update Payments [Run]
 *
 * @description - Update an instance of payments with different phases of payment flows.
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
    callSid,
    sid,
    idempotencyKey,
    statusCallback,
    capture,
    status,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${callSid}/Payments/${sid}.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({
        IdempotencyKey: idempotencyKey,
        StatusCallback: statusCallback,
        ...(capture ? { Capture: capture } : {}),
        ...(status ? { Status: status } : {}),
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
const verifyInput = ({
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  callSid,
  sid,
  idempotencyKey,
  statusCallback,
}) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_CALL_SID: "A valid callSid field (string) was not provided in the input.",
    INVALID_SID: "A valid sid field (string) was not provided in the input.",
    INVALID_IDEMPOTENCY_KEY: "A valid idempotencyKey field (string) was not provided in the input.",
    INVALID_STATUS_CALLBACK: "A valid statusCallback field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof callSid !== "string") throw new Error(ERRORS.INVALID_CALL_SID);
  if (typeof sid !== "string") throw new Error(ERRORS.INVALID_SID);
  if (typeof idempotencyKey !== "string") throw new Error(ERRORS.INVALID_IDEMPOTENCY_KEY);
  if (typeof statusCallback !== "string") throw new Error(ERRORS.INVALID_STATUS_CALLBACK);
};
