/**
 * ----------------------------------------------------------------------------------------------------
 * Validate Email [Run]
 *
 * @description - Validate an email address using SendGrid's v3 Web API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.sendgrid.com/api-reference/e-mail-address-validation/validate-an-email
 *
 * ----------------------------------------------------------------------------------------------------
 */

const client = require("@sendgrid/client");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SENDGRID_API_KEY, email, source } = input;

  verifyInput(input);

  client.setApiKey(SENDGRID_API_KEY);

  try {
    const [response, body] = await client.request({
      url: "/v3/validations/email",
      method: "POST",
      body: {
        email,
        source,
      },
    });

    return response.body;
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
const verifyInput = ({ SENDGRID_API_KEY, email, source }) => {
  const ERRORS = {
    NO_SENDGRID_API_KEY: `A valid SENDGRID_API_KEY (string) is required. 
                          You can add one to your environment variables at 
                          https://app.buildable.dev/settings/environment-variables.`,
    INVALID_EMAIL: "A valid email field (string) is required.",
    INVALID_SOURCE: "A valid source field (string) is required.",
  };

  if (typeof SENDGRID_API_KEY !== "string") throw new Error(ERRORS.NO_SENDGRID_API_KEY);
  if (typeof email !== "string") throw new Error(ERRORS.INVALID_EMAIL);
  if (typeof source !== "string") throw new Error(ERRORS.INVALID_SOURCE);
};
