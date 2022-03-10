/**
 * ----------------------------------------------------------------------------------------------------
 * Retrieve a Page Property Item [Run]
 *
 * @description - Retrieve a page property item using the Notion API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.notion.com/reference/retrieve-a-page-property
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
  const { NOTION_API_TOKEN, notionVersion, page_id, property_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.notion.com/v1/pages/${page_id}/properties/${property_id}`,
      headers: { "Notion-Version": notionVersion, Authorization: `Bearer ${NOTION_API_TOKEN}` },
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
const verifyInput = ({ NOTION_API_TOKEN, notionVersion, page_id, property_id }) => {
  const ERRORS = {
    INVALID_NOTION_API_TOKEN:
      "A valid NOTION_API_TOKEN field (string) was not provided in the input.",
    INVALID_NOTION_VERSION: "A valid notionVersion field (string) was not provided in the input.",
    INVALID_PAGE_ID: "A valid page_id field (string) was not provided in the input.",
    INVALID_PROPERTY_ID: "A valid property_id field (string) was not provided in the input.",
  };

  if (typeof NOTION_API_TOKEN !== "string") throw new Error(ERRORS.INVALID_NOTION_API_TOKEN);
  if (typeof notionVersion !== "string") throw new Error(ERRORS.INVALID_NOTION_VERSION);
  if (typeof page_id !== "string") throw new Error(ERRORS.INVALID_PAGE_ID);
  if (typeof property_id !== "string") throw new Error(ERRORS.INVALID_PROPERTY_ID);
};
