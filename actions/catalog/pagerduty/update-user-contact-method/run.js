const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_PAGERDUTY_API_KEY,
    accept,
    contentType,
    id,
    contact_method_id,
    contact_method,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.pagerduty.com/users/${id}/contact_methods/${contact_method_id}`,
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      data: { contact_method },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({
  BUILDABLE_PAGERDUTY_API_KEY,
  accept,
  contentType,
  id,
  contact_method_id,
  contact_method,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_PAGERDUTY_API_KEY:
      "A valid BUILDABLE_PAGERDUTY_API_KEY field (string) was not provided in the input.",
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_CONTENT_TYPE: "A valid contentType field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_CONTACT_METHOD_ID:
      "A valid contact_method_id field (string) was not provided in the input.",
    INVALID_CONTACT_METHOD: "A valid contact_method field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_PAGERDUTY_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_PAGERDUTY_API_KEY);
  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof contentType !== "string") throw new Error(ERRORS.INVALID_CONTENT_TYPE);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof contact_method_id !== "string") throw new Error(ERRORS.INVALID_CONTACT_METHOD_ID);
  if (typeof contact_method !== "object") throw new Error(ERRORS.INVALID_CONTACT_METHOD);
};
