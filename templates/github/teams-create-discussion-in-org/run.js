/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Discussion [Run]
 *
 * @description - Create a discussion using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/teams#create-a-discussion
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
    org,
    team_slug,
    title,
    body,
    private,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/orgs/${org}/teams/${team_slug}/discussions`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { title, body, ...(private ? { private } : {}) },
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
  org,
  team_slug,
  title,
  body,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_TEAM_SLUG:
      "A valid team_slug field (string) was not provided in the input.",
    INVALID_TITLE:
      "A valid title field (string) was not provided in the input.",
    INVALID_BODY: "A valid body field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof team_slug !== "string") throw new Error(ERRORS.INVALID_TEAM_SLUG);
  if (typeof title !== "string") throw new Error(ERRORS.INVALID_TITLE);
  if (typeof body !== "string") throw new Error(ERRORS.INVALID_BODY);
};
