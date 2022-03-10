/**
 * ----------------------------------------------------------------------------------------------------
 * Create a GitHub License [Run]
 *
 * @description - Create a github license using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#create-a-github-enterprise-server-license
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
  const { GITHUB_API_TOKEN, GITHUB_API_USERNAME, license, password, settings } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.github.com/setup/api/start",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: qs.stringify({
        license,
        ...(password ? { password } : {}),
        ...(settings ? { settings } : {}),
      }),
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
const verifyInput = ({ GITHUB_API_TOKEN, GITHUB_API_USERNAME, license }) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_LICENSE:
      "A valid license field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof license !== "string") throw new Error(ERRORS.INVALID_LICENSE);
};
