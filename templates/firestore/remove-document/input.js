const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    FIRESTORE_CONNECTION_KEY: $env.FIRESTORE_CONNECTION_KEY, // Required
    collection: "cities", // Required
    id: "DC", // Required
  };
};
