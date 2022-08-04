const nodeInput = ({ $body, $headers, $env, $actions }) => {
  const { plainText = "Hello world!" } = $body;

  return {
    plainText,
  };
};
