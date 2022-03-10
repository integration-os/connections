/**
 * ----------------------------------------------------------------------------------------------------
 * Query a Database [Run]
 *
 * @description - Query a database using the Notion API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.notion.com/reference/post-database-query
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
  const { NOTION_API_TOKEN, notionVersion, id, filter, ...rest } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.notion.com/v1/databases/${id}/query`,
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": notionVersion,
        Authorization: `Bearer ${NOTION_API_TOKEN}`,
      },
      data: { ...(filter ? { filter } : {}), ...rest },
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
const verifyInput = ({ NOTION_API_TOKEN, notionVersion, id }) => {
  const ERRORS = {
    INVALID_NOTION_API_TOKEN:
      "A valid NOTION_API_TOKEN field (string) was not provided in the input.",
    INVALID_NOTION_VERSION: "A valid notionVersion field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
  };

  if (typeof NOTION_API_TOKEN !== "string") throw new Error(ERRORS.INVALID_NOTION_API_TOKEN);
  if (typeof notionVersion !== "string") throw new Error(ERRORS.INVALID_NOTION_VERSION);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
};
