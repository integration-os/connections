/**
 * ----------------------------------------------------------------------------------------------------
 * Append Block Children [Run]
 *
 * @description - Append block children using the Notion API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.notion.com/reference/patch-block-children
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
  const { NOTION_API_TOKEN, notionVersion, id, children, ...rest } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.notion.com/v1/blocks/${id}/children`,
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": notionVersion,
        Authorization: `Bearer ${NOTION_API_TOKEN}`,
      },
      data: { children, ...rest },
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
const verifyInput = ({ NOTION_API_TOKEN, notionVersion, id, children }) => {
  const ERRORS = {
    INVALID_NOTION_API_TOKEN:
      "A valid NOTION_API_TOKEN field (string) was not provided in the input.",
    INVALID_NOTION_VERSION: "A valid notionVersion field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_CHILDREN: "A valid children field (object) was not provided in the input.",
  };

  if (typeof NOTION_API_TOKEN !== "string") throw new Error(ERRORS.INVALID_NOTION_API_TOKEN);
  if (typeof notionVersion !== "string") throw new Error(ERRORS.INVALID_NOTION_VERSION);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof children !== "object") throw new Error(ERRORS.INVALID_CHILDREN);
};
