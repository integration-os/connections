/**
 * ----------------------------------------------------------------------------------------------------
 * Send Mail [Run]
 *
 * @description - Send an email using SendGrid's v3 Web API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.sendgrid.com/api-reference/mail-send/mail-send
 *
 * ----------------------------------------------------------------------------------------------------
 */

const client = require("@sendgrid/mail");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SENDGRID_API_KEY, ...params } = input;

  verifyInput(input);

  client.setApiKey(SENDGRID_API_KEY);

  try {
    const data = await client.send(params);

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ SENDGRID_API_KEY }) => {
  const ERRORS = {
    NO_SENDGRID_API_KEY: `A valid SENDGRID_API_KEY (string) is required. 
                          You can add one to your environment variables at 
                          https://app.buildable.dev/settings/environment-variables.`,
  };

  if (typeof SENDGRID_API_KEY !== "string") throw new Error(ERRORS.NO_SENDGRID_API_KEY);
};
