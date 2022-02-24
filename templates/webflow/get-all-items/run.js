/**
 * ----------------------------------------------------------------------------------------------------
 * Get All Items For a Collection [Run]
 *
 * @description - Get All Items For a Collection using the Webflow API Reference
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.webflow.com/#get-all-items-for-a-collection
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
  const { WEBFLOW_BEARER_TOKEN, collection_id, limit = 10, offset = 0 } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.webflow.com/collections/${collection_id}/items?limit=${limit}&offset=${offset}`,
      headers: { authorization: `Bearer ${WEBFLOW_BEARER_TOKEN}`, "accept-version": "1.0.0" },
    });

    return {
      rows: data?.items,
      total: data?.total,
      pageSize: limit,
      page: getPage(offset, limit),
      totalPages: Math.ceil(data?.total / limit),
    };
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
const verifyInput = ({ collection_id }) => {
  const ERRORS = {
    INVALID_COLLECTION_ID: "A valid collection_id field (string) was not provided in the input.",
  };

  if (typeof collection_id !== "string") throw new Error(ERRORS.INVALID_COLLECTION_ID);
};

const getPage = (offset, limit) => {
  if (offset < limit) {
    return 1;
  } else {
    return Math.ceil(offset / limit) + 1;
  }
};
