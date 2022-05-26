/**
 * ----------------------------------------------------------------------------------------------------
 * EncodeBase64 [Run]
 *
 * @description - Encode a given string into Base64
 *
 * @author    Giosuè Sulipano
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
  const { plainText } = input;

  try {
    if (plainText === "") {
      throw new Error("Plain text cannot be empty")
    } else if (typeof plainText !== "string") {
      throw new Error("The input provided is not a string!");
    }
    const encoded = Buffer.from(plainText).toString('base64');
    return encoded;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    }
  }
};