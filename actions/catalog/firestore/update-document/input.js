const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    FIRESTORE_CONNECTION_KEY: $env.FIRESTORE_CONNECTION_KEY, // Required
    collection: "users", // Required
    id: "alovelace", // Required

    key: "updated1",
    // otherKeys: 10051164
  };
};
