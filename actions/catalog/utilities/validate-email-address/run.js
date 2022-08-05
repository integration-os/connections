const PASSED = "passed";
const FAILED = "failed";

const run = (input) => {
  const { email } = input;

  verifyInput(input);

  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = regExp.test(String(email).toLowerCase());

  return {
    valid: isValid,
    value: isValid ? PASSED : FAILED,
  };
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ email }) => {
  const ERRORS = {
    NO_EMAIL: "No email was provided in the input.",
  };

  if (typeof email === "undefined") throw new Error(ERRORS.NO_EMAIL);
};
