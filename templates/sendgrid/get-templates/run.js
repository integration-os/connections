/**
 * ----------------------------------------------------------------------------------------------------
 * Get Templates [Run]
 *
 * @description - Retrieve all transactional templates using SendGrid's v3 Web API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.sendgrid.com/api-reference/transactional-templates/retrieve-paged-transactional-templates
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
  const { SENDGRID_API_KEY, page_size, generations = "legacy,dynamic", ...params } = input;

  verifyInput(input);

  client.setApiKey(SENDGRID_API_KEY);

  try {
    const [response, body] = await client.request({
      url: "/v3/templates",
      method: "GET",
      headers: {},
      qs: {
        generations,
        page_size,
        ...params,
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
const verifyInput = ({ SENDGRID_API_KEY, page_size }) => {
  const ERRORS = {
    NO_SENDGRID_API_KEY: `A valid SENDGRID_API_KEY (string) is required. 
                          You can add one to your environment variables at 
                          https://app.buildable.dev/settings/environment-variables.`,
    INVALID_PAGE_SIZE: "A valid page_size field (number) is required.",
  };

  if (typeof SENDGRID_API_KEY !== "string") throw new Error(ERRORS.NO_SENDGRID_API_KEY);
  if (typeof page_size !== "number") throw new Error(ERRORS.INVALID_PAGE_SIZE);
};
