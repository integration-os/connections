const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    quorumEndpoint: "string", // Required
    BUILDABLE_TATUM_API_KEY: $env.BUILDABLE_TATUM_API_KEY, // Required
    BUILDABLE_TATUM_API_URL: $env.BUILDABLE_TATUM_API_URL, // Required
    hash: "6470657", // Required
  };
};
