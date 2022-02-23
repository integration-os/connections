/**
 * ----------------------------------------------------------------------------------------------------
 * Verify JWT Token [Run]
 *
 * @description - Verify a JSON Web Token
 *
 * @author    Buildable Technologies Inc.
 * @license   MIT
 * @access    open
 * @docs      https://github.com/auth0/node-jsonwebtoken#readme
 *
 * ----------------------------------------------------------------------------------------------------
 */

const jwt = require("jsonwebtoken");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = (input) => {
  const { JWT_SECRET, JWT_ISSUER, token, ...params } = input;

  verifyInput(input);

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
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
const verifyInput = ({ JWT_SECRET, JWT_ISSUER, token }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key is required and it must be a string.
            You can add one to your environment variables at 
            https://app.buildable.dev/settings/environment-variables.`;
  };

  const ERRORS = {
    NO_JWT_SECRET: getEnvironmentVariableError("JWT_SECRET"),
    NO_JWT_ISSUER: getEnvironmentVariableError("JWT_ISSUER"),
    NO_TOKEN: "A valid JWT token string is required.",
  };

  if (typeof JWT_SECRET !== "string") throw new Error(ERRORS.NO_JWT_SECRET);
  if (typeof JWT_ISSUER !== "string") throw new Error(ERRORS.NO_JWT_ISSUER);
  if (typeof token !== "string") throw new Error(ERRORS.NO_TOKEN);
};
