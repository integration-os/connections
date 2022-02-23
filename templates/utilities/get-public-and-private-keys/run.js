/**
 * ----------------------------------------------------------------------------------------------------
 * Get Public and Private Keys [Run]
 *
 * @description - Get an RSA public and private key pair in PEM format
 *                ⛔️ Never expose your private key to the public
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { generateKeyPairSync } = require("crypto");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = (input) => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });

  return {
    private: privateKey.export({
      type: "pkcs1",
      format: "pem",
    }),
    public: publicKey.export({
      type: "pkcs1",
      format: "pem",
    }),
  };
};
