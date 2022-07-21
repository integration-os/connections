const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_FIRESTORE_CONNECTION_KEY: $env.BUILDABLE_FIRESTORE_CONNECTION_KEY, // Required
    collection: "collection-1", // Required

    // id: "DC2",
    // name: 'Washington, D.C.',
    // state: null,
    // country: 'USA',
    // capital: true,
    // population: 680000
  };
};
