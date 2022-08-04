const run = (input) => {
  const { plainText } = input;

  try {
    if (typeof plainText !== "string") {
      throw new Error("The input provided is not a string");
    } else if (plainText === "") {
      throw new Error("Plain text cannot be empty");
    }
    const encoded = Buffer.from(plainText).toString("base64");
    return encoded;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    };
  }
};
