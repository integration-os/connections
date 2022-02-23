/**
 * ----------------------------------------------------------------------------------------------------
 * Get Random Item [Run]
 *
 * @description - Select and return a random item from an array
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
  const { array } = input;

  verifyInput(input);

  try {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
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
const verifyInput = ({ array }) => {
  const ERRORS = {
    INVALID_ARRAY: "The 'array' field must be an array.",
  };

  if (!Array.isArray(array)) throw new Error(ERRORS.INVALID_ARRAY);
};
