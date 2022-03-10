/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Pre-Receive Environment [Run]
 *
 * @description - Update a pre-receive environment using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#update-a-pre-receive-environment
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
    pre_receive_environment_id,
    name,
    image_url,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/admin/pre-receive-environments/${pre_receive_environment_id}`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { ...(name ? { name } : {}), ...(image_url ? { image_url } : {}) },
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
  pre_receive_environment_id,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_PRE_RECEIVE_ENVIRONMENT_ID:
      "A valid pre_receive_environment_id field (number) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof pre_receive_environment_id !== "number")
    throw new Error(ERRORS.INVALID_PRE_RECEIVE_ENVIRONMENT_ID);
};
