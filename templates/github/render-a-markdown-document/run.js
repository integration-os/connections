/**
 * ----------------------------------------------------------------------------------------------------
 * Render a Markdown Document [Run]
 *
 * @description - Render a Markdown Document using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/markdown#render-a-markdown-document
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, text, mode, context } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.github.com/markdown",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        text,
        ...(mode ? { mode } : {}),
        ...(context ? { context } : {}),
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
const verifyInput = ({ text }) => {
  const ERRORS = {
    INVALID_TEXT: "A valid text field (string) was not provided in the input.",
  };

  if (typeof text !== "string") throw new Error(ERRORS.INVALID_TEXT);
};
