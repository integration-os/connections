const client = require("@sendgrid/client");

const run = async (input) => {
  const {
    BUILDABLE_SENDGRID_API_KEY,
    page_size,
    generations = "legacy,dynamic",
    ...params
  } = input;

  verifyInput(input);

  client.setApiKey(BUILDABLE_SENDGRID_API_KEY);

  try {
    const [response, body] = await client.request({
      url: "/v3/templates",
      method: "GET",
      headers: {},
      qs: {
        generations,
        page_size,
        ...params,
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
const verifyInput = ({ BUILDABLE_SENDGRID_API_KEY, page_size }) => {
  const ERRORS = {
    NO_BUILDABLE_SENDGRID_API_KEY:
      "A valid BUILDABLE_SENDGRID_API_KEY (string) is required. Create your appropriate Connection to automatically add it.",
    INVALID_PAGE_SIZE: "A valid page_size field (number) is required.",
  };

  if (typeof BUILDABLE_SENDGRID_API_KEY !== "string")
    throw new Error(ERRORS.NO_BUILDABLE_SENDGRID_API_KEY);
  if (typeof page_size !== "number") throw new Error(ERRORS.INVALID_PAGE_SIZE);
};
