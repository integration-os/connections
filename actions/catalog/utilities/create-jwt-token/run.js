const jwt = require("jsonwebtoken");

const run = (input) => {
  const { BUILDABLE_JWT_SECRET, BUILDABLE_JWT_ISSUER, audience, data, ...params } = input;

  verifyInput(input);

  try {
    const token = jwt.sign(data, BUILDABLE_JWT_SECRET, {
      audience,
      issuer: BUILDABLE_JWT_ISSUER,
      ...params,
    });

    return token;
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
const verifyInput = ({ BUILDABLE_JWT_SECRET, BUILDABLE_JWT_ISSUER, audience, data }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key is required and it must be a string. Create your appropriate Connection to automatically add it.`;
  };

  const ERRORS = {
    NO_BUILDABLE_JWT_SECRET: getEnvironmentVariableError("BUILDABLE_JWT_SECRET"),
    NO_BUILDABLE_JWT_ISSUER: getEnvironmentVariableError("BUILDABLE_JWT_ISSUER"),
    NO_AUDIENCE: "A valid audience string is required.",
    NO_DATA: "A valid data object is required.",
  };

  if (typeof BUILDABLE_JWT_SECRET !== "string") throw new Error(ERRORS.NO_BUILDABLE_JWT_SECRET);
  if (typeof BUILDABLE_JWT_ISSUER !== "string") throw new Error(ERRORS.NO_BUILDABLE_JWT_ISSUER);
  if (typeof audience !== "string") throw new Error(ERRORS.NO_AUDIENCE);
  if (typeof data !== "object") throw new Error(ERRORS.NO_DATA);
};
