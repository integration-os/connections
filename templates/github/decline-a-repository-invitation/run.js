/**
 * ----------------------------------------------------------------------------------------------------
 * Decline a Repository Invitation [Run]
 *
 * @description - Decline a Repository Invitation using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/repos#decline-a-repository-invitation
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, invitation_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.github.com/user/repository_invitations/${invitation_id}`,
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
const verifyInput = ({ invitation_id }) => {
  const ERRORS = {
    INVALID_INVITATION_ID: "A valid invitation_id field (number) was not provided in the input.",
  };

  if (typeof invitation_id !== "number") throw new Error(ERRORS.INVALID_INVITATION_ID);
};
