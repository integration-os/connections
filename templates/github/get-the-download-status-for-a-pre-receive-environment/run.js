/**
 * ----------------------------------------------------------------------------------------------------
 * Get the Download Status for a Pre-Receive Environment [Run]
 *
 * @description - Get the Download Status for a Pre-Receive Environment using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#get-the-download-status-for-a-pre-receive-environment
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, pre_receive_environment_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/admin/pre-receive-environments/${pre_receive_environment_id}/downloads/latest`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
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
const verifyInput = ({ pre_receive_environment_id }) => {
  const ERRORS = {
    INVALID_PRE_RECEIVE_ENVIRONMENT_ID:
      "A valid pre_receive_environment_id field (number) was not provided in the input.",
  };

  if (typeof pre_receive_environment_id !== "number")
    throw new Error(ERRORS.INVALID_PRE_RECEIVE_ENVIRONMENT_ID);
};
