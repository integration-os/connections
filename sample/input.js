const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    API_KEY: $env.API_KEY, // Required
    name: "Mr. Bean", // Required

    // optional1: "",
    // optional2: {},
    // optional3: [],
  };
};
