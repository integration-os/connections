/**
 * ----------------------------------------------------------------------------------------------------
 * Delete a Thread Subscription [Run]
 *
 * @description - Delete a Thread Subscription using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/activity#delete-a-thread-subscription
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, thread_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.github.com/notifications/threads/${thread_id}/subscription`,
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
const verifyInput = ({ thread_id }) => {
  const ERRORS = {
    INVALID_THREAD_ID: "A valid thread_id field (number) was not provided in the input.",
  };

  if (typeof thread_id !== "number") throw new Error(ERRORS.INVALID_THREAD_ID);
};
