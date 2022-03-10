/**
 * ----------------------------------------------------------------------------------------------------
 * Move a Project Column [Run]
 *
 * @description - Move a project column using the Github API
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
  const { GITHUB_API_TOKEN, GITHUB_API_USERNAME, column_id, position } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/projects/columns/${column_id}/moves`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
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
const verifyInput = ({
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  column_id,
  position,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_COLUMN_ID:
      "A valid column_id field (number) was not provided in the input.",
    INVALID_POSITION:
      "A valid position field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof column_id !== "number") throw new Error(ERRORS.INVALID_COLUMN_ID);
  if (typeof position !== "string") throw new Error(ERRORS.INVALID_POSITION);
};
