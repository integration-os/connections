/**
 * ----------------------------------------------------------------------------------------------------
 * Validate Password Strength [Run]
 *
 * @description - Password strength validator using Regular Expression
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 *
 * ----------------------------------------------------------------------------------------------------
 */

const PASSED = "passed";
const FAILED = "failed";
const NOT_APPLICABLE = "n/a";
const LENGTH_CHECK = "length-check";
const UPPER_CASE_CHECK = "upper-case-check";
const LOWER_CASE_CHECK = "lower-case-check";
const NUMBER_CHECK = "number-check";
const SPECIAL_CHAR_CHECK = "special-char-check";

const regExpTypes = {
  upperCase: /^(?=.*[A-Z])/,
  lowerCase: /(?=.*[a-z])/,
  specialChar: /(?=.*[@$!^%*()?&])/,
  number: /(?=.*[0-9])/,
};

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = (input) => {
  const {
    password,
    minLength,
    requireUpperCase,
    requireLowerCase,
    requireSpecialChar,
    requireNumber,
  } = input;

  verifyInput(input);

  const failedChecks = [];

  // Check length
  const lengthCheck = passesLengthCheck(password, minLength);
  if (!lengthCheck.valid) failedChecks.push(LENGTH_CHECK);

  // Check upper case
  const upperCaseCheck = checkCase(regExpTypes.upperCase, password, requireUpperCase);
  if (!upperCaseCheck.valid) failedChecks.push(UPPER_CASE_CHECK);

  // Check lower case
  const lowerCaseCheck = checkCase(regExpTypes.lowerCase, password, requireLowerCase);
  if (!lowerCaseCheck.valid) failedChecks.push(LOWER_CASE_CHECK);

  // Check special characters
  const specialCharCheck = checkCase(regExpTypes.specialChar, password, requireSpecialChar);
  if (!specialCharCheck.valid) failedChecks.push(SPECIAL_CHAR_CHECK);

  // Check numbers
  const numberCheck = checkCase(regExpTypes.number, password, requireNumber);
  if (!numberCheck.valid) failedChecks.push(NUMBER_CHECK);

  // Password is valid if there are no failed checks
  const valid =
    lengthCheck.valid &&
    upperCaseCheck.valid &&
    lowerCaseCheck.valid &&
    specialCharCheck.valid &&
    numberCheck.valid;

  const response = {
    lengthCheck,
    upperCaseCheck,
    lowerCaseCheck,
    specialCharCheck,
    numberCheck,
    valid,
  };

  if (!valid) response.failedChecks = failedChecks;

  return response;
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({
  password,
  minLength,
  requireUpperCase,
  requireLowerCase,
  requireSpecialChar,
  requireNumber,
}) => {
  const ERRORS = {
    NO_PASSWORD: "No password was provided in the input.",
    NO_MIN_LENGTH: "No value for minLength was provided in the input.",
    NO_REQUIRE_UPPER_CASE: "No value for requireUpperCase was provided in the input.",
    NO_REQUIRE_LOWER_CASE: "No value for requireLowerCase was provided in the input.",
    NO_REQUIRE_SPECIAL_CHAR: "No value for requireSpecialChar was provided in the input.",
    NO_REQUIRE_NUMBER: "No value for requireNumber was provided in the input.",
  };

  if (typeof password === "undefined") throw new Error(ERRORS.NO_PASSWORD);
  if (typeof minLength === "undefined") throw new Error(ERRORS.NO_MIN_LENGTH);
  if (typeof requireUpperCase === "undefined") throw new Error(ERRORS.NO_REQUIRE_UPPER_CASE);
  if (typeof requireLowerCase === "undefined") throw new Error(ERRORS.NO_REQUIRE_LOWER_CASE);
  if (typeof requireSpecialChar === "undefined") throw new Error(ERRORS.NO_REQUIRE_SPECIAL_CHAR);
  if (typeof requireNumber === "undefined") throw new Error(ERRORS.NO_REQUIRE_NUMBER);
};

/**
 * Regular expression checker
 *
 * @param {String} regExp - The regular expression to check against
 *
 * @returns {{ valid: boolean, value: string }} - Validity
 */
const regExpCheck = (regExp) => {
  return (password) => {
    const _regExp = new RegExp(regExp);
    const passed = _regExp.test(password);

    return {
      valid: passed,
      value: passed ? PASSED : FAILED,
    };
  };
};

/**
 * Check case
 *
 * @param {String} regExp - The regular expression to check against
 * @param {String} password - The password to check
 * @param {Boolean} shouldCheck - Should check the option
 *
 * @returns {{ valid: boolean, value: string }} - Validity
 */
const checkCase = (regExp, password, shouldCheck) => {
  if (!shouldCheck) {
    return {
      valid: true,
      value: NOT_APPLICABLE,
    };
  }

  return regExpCheck(regExp)(password);
};

/**
 * Verify a password length
 *
 * @param {String} password - Password to verify
 * @param {Number} length - Length of password
 *
 * @returns {{ valid: boolean, value: string }} - Password validity
 */
const passesLengthCheck = (password, length) => ({
  valid: password.length >= length,
  value: password.length >= length ? PASSED : FAILED,
});
