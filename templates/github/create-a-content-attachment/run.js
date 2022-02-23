/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Content Attachment [Run]
 *
 * @description - Create a Content Attachment using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#create-a-content-attachment
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, owner, repo, content_reference_id, title, body } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/content_references/${content_reference_id}/attachments`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { body, title },
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
const verifyInput = ({ owner, repo, content_reference_id, body, title }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_CONTENT_REFERENCE_ID:
      "A valid content_reference_id field (number) was not provided in the input.",
    INVALID_BODY: "A valid body field (string) was not provided in the input.",
    INVALID_TITLE: "A valid title field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof content_reference_id !== "number") throw new Error(ERRORS.INVALID_CONTENT_REFERENCE_ID);
  if (typeof body !== "string") throw new Error(ERRORS.INVALID_BODY);
  if (typeof title !== "string") throw new Error(ERRORS.INVALID_TITLE);
};
