/**
 * ----------------------------------------------------------------------------------------------------
 * Decode JWT Token [Run]
 *
 * @description - Decode a JSON Web Token
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
