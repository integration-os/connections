const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY,
    name,
    events,
    url,
    verifyTls,
    signingSecret,
    scope,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://circleci.com/api/v2/webhook",
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: { name, events, url, "verify-tls": verifyTls, "signing-secret": signingSecret, scope },
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
  BUILDABLE_CIRCLECI_PERSONAL_API_KEY,
  name,
  events,
  url,
  verifyTls,
  signingSecret,
  scope,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
    INVALID_EVENTS: "A valid events field (object) was not provided in the input.",
    INVALID_URL: "A valid url field (string) was not provided in the input.",
    INVALID_VERIFY_TLS: "A valid verifyTls field (boolean) was not provided in the input.",
    INVALID_SIGNING_SECRET: "A valid signingSecret field (string) was not provided in the input.",
    INVALID_SCOPE: "A valid scope field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
  if (typeof events !== "object") throw new Error(ERRORS.INVALID_EVENTS);
  if (typeof url !== "string") throw new Error(ERRORS.INVALID_URL);
  if (typeof verifyTls !== "boolean") throw new Error(ERRORS.INVALID_VERIFY_TLS);
  if (typeof signingSecret !== "string") throw new Error(ERRORS.INVALID_SIGNING_SECRET);
  if (typeof scope !== "object") throw new Error(ERRORS.INVALID_SCOPE);
};
