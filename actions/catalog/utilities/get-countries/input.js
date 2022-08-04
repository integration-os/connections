const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    query: {
      term: "", // Optional search term
    },
  };
};
