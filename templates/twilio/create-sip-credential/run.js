/**
 * ----------------------------------------------------------------------------------------------------
 * Create Sip Credential [Run]
 *
 * @description - Create a new credential resource.
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
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, credentialListSid, password, username } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/SIP/CredentialLists/${credentialListSid}/Credentials.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({ Password: password, Username: username }),
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
  credentialListSid,
  password,
  username,
}) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_CREDENTIAL_LIST_SID:
      "A valid credentialListSid field (string) was not provided in the input.",
    INVALID_PASSWORD: "A valid password field (string) was not provided in the input.",
    INVALID_USERNAME: "A valid username field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof credentialListSid !== "string") throw new Error(ERRORS.INVALID_CREDENTIAL_LIST_SID);
  if (typeof password !== "string") throw new Error(ERRORS.INVALID_PASSWORD);
  if (typeof username !== "string") throw new Error(ERRORS.INVALID_USERNAME);
};
