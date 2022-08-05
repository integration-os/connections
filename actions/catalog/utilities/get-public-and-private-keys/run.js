const { generateKeyPairSync } = require("crypto");

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
