/**
 * ----------------------------------------------------------------------------------------------------
 * Send SMS [Run]
 *
 * @description - Send outgoing SMS messages from your Twilio phone
 *                number to mobile phones around the globe
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs/sms/send-messages
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
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, ...params } = input;

  verifyInput(input);

  const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  try {
    const message = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: params.to,
      body: params.body,
    });

    return message;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER }) => {
  const ERRORS = {
    NO_TWILIO_ACCOUNT_SID: `A valid TWILIO_ACCOUNT_SID is required. 
                            You can add one to your environment variables at 
                            https://app.buildable.dev/settings/environment-variables.`,
    NO_TWILIO_AUTH_TOKEN: `A valid TWILIO_AUTH_TOKEN is required. 
                            You can add one to your environment variables at 
                            https://app.buildable.dev/settings/environment-variables.`,
    NO_TWILIO_PHONE_NUMBER: `A valid TWILIO_PHONE_NUMBER is required. 
                            You can add one to your environment variables at 
                            https://app.buildable.dev/settings/environment-variables.`,
  };

  if (typeof TWILIO_ACCOUNT_SID === "undefined") throw new Error(ERRORS.NO_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN === "undefined") throw new Error(ERRORS.NO_TWILIO_AUTH_TOKEN);
  if (typeof TWILIO_PHONE_NUMBER === "undefined") throw new Error(ERRORS.NO_TWILIO_PHONE_NUMBER);
};
