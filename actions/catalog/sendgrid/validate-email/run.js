const client = require("@sendgrid/client");

const run = async (input) => {
  const { BUILDABLE_SENDGRID_API_KEY, email, source } = input;

  verifyInput(input);

  client.setApiKey(BUILDABLE_SENDGRID_API_KEY);

  try {
    const [response, body] = await client.request({
      url: "/v3/validations/email",
      method: "POST",
      body: {
        email,
        source,
      },
    });

    return response.body;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_SENDGRID_API_KEY, email, source }) => {
  const ERRORS = {
    NO_BUILDABLE_SENDGRID_API_KEY: "A valid BUILDABLE_SENDGRID_API_KEY (string) is required. Create your appropriate Connection to automatically add it.",
    INVALID_EMAIL: "A valid email field (string) is required.",
    INVALID_SOURCE: "A valid source field (string) is required.",
  };

  if (typeof BUILDABLE_SENDGRID_API_KEY !== "string") throw new Error(ERRORS.NO_BUILDABLE_SENDGRID_API_KEY);
  if (typeof email !== "string") throw new Error(ERRORS.INVALID_EMAIL);
  if (typeof source !== "string") throw new Error(ERRORS.INVALID_SOURCE);
};
