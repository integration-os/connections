/**
 * ----------------------------------------------------------------------------------------------------
 * Exit Flow [Run]
 *
 * @description - Exit a Flow and set a custom response
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * The Node's executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = (input) => {
  const { message, data, status, exit } = input;

  if (exit) {
    const error = new Error(message);

    error.data = {
      ...data,
      status,
    };

    throw error;
  }

  return null;
};
