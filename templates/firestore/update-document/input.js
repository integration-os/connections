const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_FIRESTORE_CONNECTION_KEY: $env.BUILDABLE_FIRESTORE_CONNECTION_KEY, // Required
    collection: "users", // Required
    id: "alovelace", // Required

    key: "updated1",
    // otherKeys: 10051164
  };
};
