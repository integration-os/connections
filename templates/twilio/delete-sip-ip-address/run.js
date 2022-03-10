/**
 * ----------------------------------------------------------------------------------------------------
 * Delete Sip Ip Address [Run]
 *
 * @description - Delete an ipaddress resource.
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
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, ipAccessControlListSid, sid } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/SIP/IpAccessControlLists/${ipAccessControlListSid}/IpAddresses/${sid}.json`,
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
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
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, ipAccessControlListSid, sid }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_IP_ACCESS_CONTROL_LIST_SID:
      "A valid ipAccessControlListSid field (string) was not provided in the input.",
    INVALID_SID: "A valid sid field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof ipAccessControlListSid !== "string")
    throw new Error(ERRORS.INVALID_IP_ACCESS_CONTROL_LIST_SID);
  if (typeof sid !== "string") throw new Error(ERRORS.INVALID_SID);
};
