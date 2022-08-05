const jwt = require("jsonwebtoken");

const run = (input) => {
  const { token } = input;

  verifyInput(input);

  try {
    const decodedToken = jwt.decode(token);

    return decodedToken;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ token }) => {
  const ERRORS = {
    INVALID_TOKEN: "A valid JWT token is required.",
  };

  if (typeof token !== "string") throw new Error(ERRORS.INVALID_TOKEN);
};
