const nodeInput = ({ $body, $headers, $env, $data }) => {
  const {
    plainText = "Hello world!"
  } = $body;

  return {
    plainText
  };
};
