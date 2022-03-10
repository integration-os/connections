/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Webhook Configuration for an App [Run]
 *
 * @description - Update a webhook configuration for an app using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#update-a-webhook-configuration-for-an-app
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
  const {
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    url,
    content_type,
    secret,
    insecure_ssl,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: "https://api.github.com/app/hook/config",
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: {
        ...(url ? { url } : {}),
        ...(content_type ? { content_type } : {}),
        ...(secret ? { secret } : {}),
        ...(insecure_ssl ? { insecure_ssl } : {}),
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
const verifyInput = ({ GITHUB_API_TOKEN, GITHUB_API_USERNAME }) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
};
