/**
 * ----------------------------------------------------------------------------------------------------
 * Javascript Function [Run]
 *
 * @description - Execute a custom synchronous JavaScript function
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
  const { message } = input;

  return {
    message,
  };
};
