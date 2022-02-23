/**
 * ----------------------------------------------------------------------------------------------------
 * List Phone Numbers [Run]
 *
 * @description - List all available Incoming Phone Numbers within your Twilio account
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource
 *
 * ----------------------------------------------------------------------------------------------------
 */

const Twilio = require("twilio");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, limit } = input;

  verifyInput(input);

  const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  try {
    const incomingPhoneNumbers = await client.incomingPhoneNumbers.list(limit ? { limit } : {});

    return incomingPhoneNumbers;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN }) => {
  const ERRORS = {
    NO_TWILIO_ACCOUNT_SID: `A valid TWILIO_ACCOUNT_SID is required. 
                            You can add one to your environment variables at 
                            https://app.buildable.dev/settings/environment-variables.`,
    NO_TWILIO_AUTH_TOKEN: `A valid TWILIO_AUTH_TOKEN is required. 
                            You can add one to your environment variables at 
                            https://app.buildable.dev/settings/environment-variables.`,
  };

  if (typeof TWILIO_ACCOUNT_SID === "undefined") throw new Error(ERRORS.NO_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN === "undefined") throw new Error(ERRORS.NO_TWILIO_AUTH_TOKEN);
};
