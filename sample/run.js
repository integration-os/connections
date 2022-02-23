/**
 * ----------------------------------------------------------------------------------------------------
 * Template Name [Run]
 * 
 * @description - Description about your template
 * 
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      link-to-appropriate-documentation
 * 
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * The Node’s executable function
 * 
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    API_KEY,
    name,
    ...params
  } = input;

  verifyInput(input);

  try {
		
		// Main template logic goes here

    const data = {
      message: `Hello, ${name}`,
      ...params
    };

    return data;
  } catch (error) {
    return {
			failed: true,
			message: error.message,
      data: {}
		};
  }
}

/**
 * Verifies the input parameters
 */
const verifyInput = ({ API_KEY, name }) => {
  const ERRORS = {
	  NO_API_KEY: `A valid API_KEY is required. 
	              You can add one to your environment variables at 
	              https://app.buildable.dev/settings/environment-variables.`,
	  NO_NAME: "A valid name is required."
	};

  if (typeof API_KEY === "undefined") throw new Error(ERRORS.NO_API_KEY);
  if (typeof name === "undefined") throw new Error(ERRORS.NO_NAME);
};
