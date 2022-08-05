const jwt = require("jsonwebtoken");

const run = (input) => {
  const { BUILDABLE_JWT_SECRET, BUILDABLE_JWT_ISSUER, token, ...params } = input;

  verifyInput(input);

  try {
    const decodedToken = jwt.verify(token, BUILDABLE_JWT_SECRET, {
      issuer: BUILDABLE_JWT_ISSUER,
      ...params,
    });

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
const verifyInput = ({ BUILDABLE_JWT_SECRET, BUILDABLE_JWT_ISSUER, token }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key is required and it must be a string. Create your appropriate Connection to automatically add it.`;
  };

  const ERRORS = {
    NO_BUILDABLE_JWT_SECRET: getEnvironmentVariableError("BUILDABLE_JWT_SECRET"),
    NO_BUILDABLE_JWT_ISSUER: getEnvironmentVariableError("BUILDABLE_JWT_ISSUER"),
    NO_TOKEN: "A valid JWT token string is required.",
  };

  if (typeof BUILDABLE_JWT_SECRET !== "string") throw new Error(ERRORS.NO_BUILDABLE_JWT_SECRET);
  if (typeof BUILDABLE_JWT_ISSUER !== "string") throw new Error(ERRORS.NO_BUILDABLE_JWT_ISSUER);
  if (typeof token !== "string") throw new Error(ERRORS.NO_TOKEN);
};
