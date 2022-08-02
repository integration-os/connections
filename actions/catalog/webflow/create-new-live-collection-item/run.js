const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_WEBFLOW_BEARER_TOKEN, collection_id, fields } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.webflow.com/collections/${collection_id}/items?live=true`,
      headers: { authorization: `Bearer ${BUILDABLE_WEBFLOW_BEARER_TOKEN}`, "accept-version": "1.0.0" },
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
const verifyInput = ({ BUILDABLE_WEBFLOW_BEARER_TOKEN, collection_id, fields }) => {
  const ERRORS = {
    INVALID_BUILDABLE_WEBFLOW_BEARER_TOKEN: "A valid BUILDABLE_WEBFLOW_BEARER_TOKEN field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_COLLECTION_ID: "A valid collection_id field (string) was not provided in the input.",
    INVALID_FIELDS: "A valid fields field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_WEBFLOW_BEARER_TOKEN !== "string") throw new Error(ERRORS.INVALID_BUILDABLE_WEBFLOW_BEARER_TOKEN);
  if (typeof collection_id !== "string") throw new Error(ERRORS.INVALID_COLLECTION_ID);
  if (typeof fields !== "object") throw new Error(ERRORS.INVALID_FIELDS);
};
