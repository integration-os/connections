/**
 * ----------------------------------------------------------------------------------------------------
 * Create JWT Token [Run]
 *
 * @description - Create a JSON Web Token
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
  const { JWT_SECRET, JWT_ISSUER, audience, data, ...params } = input;

  verifyInput(input);

  try {
    const token = jwt.sign(data, JWT_SECRET, {
      audience,
      issuer: JWT_ISSUER,
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
const verifyInput = ({ JWT_SECRET, JWT_ISSUER, audience, data }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key is required and it must be a string.
            You can add one to your environment variables at 
            https://app.buildable.dev/settings/environment-variables.`;
  };

  const ERRORS = {
    NO_JWT_SECRET: getEnvironmentVariableError("JWT_SECRET"),
    NO_JWT_ISSUER: getEnvironmentVariableError("JWT_ISSUER"),
    NO_AUDIENCE: "A valid audience string is required.",
    NO_DATA: "A valid data object is required.",
  };

  if (typeof JWT_SECRET !== "string") throw new Error(ERRORS.NO_JWT_SECRET);
  if (typeof JWT_ISSUER !== "string") throw new Error(ERRORS.NO_JWT_ISSUER);
  if (typeof audience !== "string") throw new Error(ERRORS.NO_AUDIENCE);
  if (typeof data !== "object") throw new Error(ERRORS.NO_DATA);
};
