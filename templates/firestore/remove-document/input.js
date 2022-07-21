const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_FIRESTORE_CONNECTION_KEY: $env.BUILDABLE_FIRESTORE_CONNECTION_KEY, // Required
    collection: "cities", // Required
    id: "DC", // Required
  };
};
