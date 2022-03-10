/**
 * ----------------------------------------------------------------------------------------------------
 * Create Sip Ip Access Control List Mapping [Run]
 *
 * @description - Create a new ipaccesscontrollistmapping resource.
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
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, domainSid, ipAccessControlListSid } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/SIP/Domains/${domainSid}/IpAccessControlListMappings.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({ IpAccessControlListSid: ipAccessControlListSid }),
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
  domainSid,
  ipAccessControlListSid,
}) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_DOMAIN_SID: "A valid domainSid field (string) was not provided in the input.",
    INVALID_IP_ACCESS_CONTROL_LIST_SID:
      "A valid ipAccessControlListSid field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof domainSid !== "string") throw new Error(ERRORS.INVALID_DOMAIN_SID);
  if (typeof ipAccessControlListSid !== "string")
    throw new Error(ERRORS.INVALID_IP_ACCESS_CONTROL_LIST_SID);
};
