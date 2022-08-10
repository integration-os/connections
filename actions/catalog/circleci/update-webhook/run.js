const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY,
    webhookId,
    name,
    events,
    url,
    signingSecret,
    verifyTls,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://circleci.com/api/v2/webhook/${webhookId}`,
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: {
        ...(name ? { name } : {}),
        ...(events ? { events } : {}),
        ...(url ? { url } : {}),
        ...(signingSecret ? { "signing-secret": signingSecret } : {}),
        ...(verifyTls ? { "verify-tls": verifyTls } : {}),
      },
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, webhookId }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_WEBHOOK_ID: "A valid webhookId field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof webhookId !== "string") throw new Error(ERRORS.INVALID_WEBHOOK_ID);
};
