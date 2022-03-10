/**
 * ----------------------------------------------------------------------------------------------------
 * Retrieve Block Children [Run]
 *
 * @description - Retrieve block children using the Notion API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.notion.com/reference/get-block-children
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { NOTION_API_TOKEN, notionVersion, id, page_size } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.notion.com/v1/blocks/${id}/children`,
      headers: { "Notion-Version": notionVersion, Authorization: `Bearer ${NOTION_API_TOKEN}` },
      params: { ...(page_size ? { page_size } : {}) },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
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
