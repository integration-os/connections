/**
 * ----------------------------------------------------------------------------------------------------
 * Move a Project Column [Run]
 *
 * @description - Move a Project Column using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/projects#move-a-project-column
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, column_id, position } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/projects/columns/${column_id}/moves`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { position },
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
const verifyInput = ({ column_id, position }) => {
  const ERRORS = {
    INVALID_COLUMN_ID: "A valid column_id field (number) was not provided in the input.",
    INVALID_POSITION: "A valid position field (string) was not provided in the input.",
  };

  if (typeof column_id !== "number") throw new Error(ERRORS.INVALID_COLUMN_ID);
  if (typeof position !== "string") throw new Error(ERRORS.INVALID_POSITION);
};
