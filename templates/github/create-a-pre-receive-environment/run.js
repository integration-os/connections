/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Pre-Receive Environment [Run]
 *
 * @description - Create a Pre-Receive Environment using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#create-a-pre-receive-environment
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, name, image_url } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.github.com/admin/pre-receive-environments",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { image_url, name },
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
const verifyInput = ({ image_url, name }) => {
  const ERRORS = {
    INVALID_IMAGE_URL: "A valid image_url field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof image_url !== "string") throw new Error(ERRORS.INVALID_IMAGE_URL);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
