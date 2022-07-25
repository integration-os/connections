const nodeInput = ({ $body, $headers, $env, $data }) => {
  const {
    plainText = "Hello world!"
  } = $trigger.body;

  return {
    plainText
  };
};
