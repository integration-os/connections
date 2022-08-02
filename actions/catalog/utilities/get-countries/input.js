const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    query: {
      term: "", // Optional search term
    },
  };
};
