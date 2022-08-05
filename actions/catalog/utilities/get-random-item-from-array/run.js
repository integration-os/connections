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
