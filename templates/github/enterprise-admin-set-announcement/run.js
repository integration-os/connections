/**
 * ----------------------------------------------------------------------------------------------------
 * Set the Global Announcement Banner [Run]
 *
 * @description - Set the global announcement banner using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/en/enterprise-server@3.3/rest/reference/enterprise-admin#set-the-global-announcement-banner
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
  const { GITHUB_API_TOKEN, GITHUB_API_USERNAME, announcement, expires_at } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: "https://api.github.com/enterprise/announcement",
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { announcement, ...(expires_at ? { expires_at } : {}) },
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
  announcement,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_ANNOUNCEMENT:
      "A valid announcement field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof announcement !== "string")
    throw new Error(ERRORS.INVALID_ANNOUNCEMENT);
};
