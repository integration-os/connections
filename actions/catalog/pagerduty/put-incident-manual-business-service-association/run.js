const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_PAGERDUTY_API_KEY, accept, id, business_service_id, xEARLYACCESS, relation } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.pagerduty.com/incidents/${id}/business_services/${business_service_id}/impacts`,
      headers: { Authorization: `Token token= ${BUILDABLE_PAGERDUTY_API_KEY}` },
      data: { relation },
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
  id,
  business_service_id,
  xEARLYACCESS,
  relation,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_PAGERDUTY_API_KEY:
      "A valid BUILDABLE_PAGERDUTY_API_KEY field (string) was not provided in the input.",
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_ID: "A valid id field (string) was not provided in the input.",
    INVALID_BUSINESS_SERVICE_ID:
      "A valid business_service_id field (string) was not provided in the input.",
    INVALID_X_EARLYACCESS: "A valid xEARLYACCESS field (string) was not provided in the input.",
    INVALID_RELATION: "A valid relation field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_PAGERDUTY_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_PAGERDUTY_API_KEY);
  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
  if (typeof business_service_id !== "string") throw new Error(ERRORS.INVALID_BUSINESS_SERVICE_ID);
  if (typeof xEARLYACCESS !== "string") throw new Error(ERRORS.INVALID_X_EARLYACCESS);
  if (typeof relation !== "string") throw new Error(ERRORS.INVALID_RELATION);
};
