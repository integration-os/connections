/**
 * ----------------------------------------------------------------------------------------------------
 * Update Live Collection Item [Run]
 *
 * @description - Update Live Collection Item using the Webflow API Reference
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.webflow.com/#update-live-collection-item
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
  const { WEBFLOW_BEARER_TOKEN, collection_id, item_id, fields } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.webflow.com/collections/${collection_id}/items/${item_id}?live=true`,
      headers: { authorization: `Bearer ${WEBFLOW_BEARER_TOKEN}`, "accept-version": "1.0.0" },
      data: { fields },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ collection_id, item_id, fields }) => {
  const ERRORS = {
    INVALID_COLLECTION_ID: "A valid collection_id field (string) was not provided in the input.",
    INVALID_ITEM_ID: "A valid item_id field (string) was not provided in the input.",
    INVALID_FIELDS: "A valid fields field (object) was not provided in the input.",
  };

  if (typeof collection_id !== "string") throw new Error(ERRORS.INVALID_COLLECTION_ID);
  if (typeof item_id !== "string") throw new Error(ERRORS.INVALID_ITEM_ID);
  if (typeof fields !== "object") throw new Error(ERRORS.INVALID_FIELDS);
};
