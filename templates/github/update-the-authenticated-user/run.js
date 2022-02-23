/**
 * ----------------------------------------------------------------------------------------------------
 * Update the Authenticated User [Run]
 *
 * @description - Update the Authenticated User using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/users/#update-the-authenticated-user
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
    GITHUB_API_USERNAME,
    GITHUB_API_TOKEN,
    name,
    email,
    blog,
    twitter_username,
    company,
    location,
    hireable,
    bio,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: "https://api.github.com/user",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(blog ? { blog } : {}),
        ...(twitter_username ? { twitter_username } : {}),
        ...(company ? { company } : {}),
        ...(location ? { location } : {}),
        ...(hireable ? { hireable } : {}),
        ...(bio ? { bio } : {}),
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
const verifyInput = () => {
  const ERRORS = {};
};
