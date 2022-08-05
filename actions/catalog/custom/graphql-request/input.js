const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    endpoint: "https://api.example.com/movies/", // Required

    // Required
    query: ` {
      user(id: 2) {
        id
        name
      }
    }`,

    // variables: {},
    // requestHeaders: {},
  };
};
