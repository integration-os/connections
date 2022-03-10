/**
 * ----------------------------------------------------------------------------------------------------
 * Reset a Token [Run]
 *
 * @description - Reset a token using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#reset-a-token
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
  const { GITHUB_API_TOKEN, GITHUB_API_USERNAME, client_id, access_token } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/applications/${client_id}/token`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { access_token },
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
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  client_id,
  access_token,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_CLIENT_ID:
      "A valid client_id field (string) was not provided in the input.",
    INVALID_ACCESS_TOKEN:
      "A valid access_token field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof client_id !== "string") throw new Error(ERRORS.INVALID_CLIENT_ID);
  if (typeof access_token !== "string")
    throw new Error(ERRORS.INVALID_ACCESS_TOKEN);
};
