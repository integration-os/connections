const client = require("@sendgrid/mail");

const run = async (input) => {
  const { BUILDABLE_SENDGRID_API_KEY, ...params } = input;

  verifyInput(input);

  client.setApiKey(BUILDABLE_SENDGRID_API_KEY);

  try {
    const data = await client.send(params);

    return data;
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
const verifyInput = ({ BUILDABLE_SENDGRID_API_KEY }) => {
  const ERRORS = {
    NO_BUILDABLE_SENDGRID_API_KEY: "A valid BUILDABLE_SENDGRID_API_KEY (string) is required. Create your appropriate Connection to automatically add it.",
  };

  if (typeof BUILDABLE_SENDGRID_API_KEY !== "string") throw new Error(ERRORS.NO_BUILDABLE_SENDGRID_API_KEY);
};
