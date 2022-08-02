const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    FIRESTORE_CONNECTION_KEY: $env.FIRESTORE_CONNECTION_KEY, // Required
    collection: "collection-1", // Required

    // id: "DC2",
    // name: 'Washington, D.C.',
    // state: null,
    // country: 'USA',
    // capital: true,
    // population: 680000
  };
};
