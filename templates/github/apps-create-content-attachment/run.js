/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Content Attachment [Run]
 *
 * @description - Create a content attachment using the Github API
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
  const {
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    owner,
    repo,
    content_reference_id,
    title,
    body,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/content_references/${content_reference_id}/attachments`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { title, body },
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
  owner,
  repo,
  content_reference_id,
  title,
  body,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_OWNER:
      "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_CONTENT_REFERENCE_ID:
      "A valid content_reference_id field (number) was not provided in the input.",
    INVALID_TITLE:
      "A valid title field (string) was not provided in the input.",
    INVALID_BODY: "A valid body field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof content_reference_id !== "number")
    throw new Error(ERRORS.INVALID_CONTENT_REFERENCE_ID);
  if (typeof title !== "string") throw new Error(ERRORS.INVALID_TITLE);
  if (typeof body !== "string") throw new Error(ERRORS.INVALID_BODY);
};
