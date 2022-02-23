/**
 * ----------------------------------------------------------------------------------------------------
 * Merge and Clean Arrays [Run]
 *
 * @description - Merge multiple arrays into one and remove duplicates
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = (input) => {
  const { arrays } = input;

  verifyInput(input);

  try {
    arrays.forEach((a) => {
      if (!Array.isArray(a)) {
        throw new Error(`All items in 'arrays' must be an array. Found: ${typeof a}.`);
      }
    });

    // Merge and clean arrays
    return Array.from(new Set([...arrays.flat()]));
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
const verifyInput = ({ arrays }) => {
  const ERRORS = {
    NO_ARRAYS: "'arrays' was not provided in the input.",
  };

  if (typeof arrays === "undefined") throw new Error(ERRORS.NO_ARRAYS);
};
