const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_FIRESTORE_CONNECTION_KEY: $env.BUILDABLE_FIRESTORE_CONNECTION_KEY, // Required
    collection: "cities", // Required

    // query: [["state", "==", "CA"], ["name", "==", "Los Angeles"]],
    // fields: ['id', 'name', 'country'],
    // pageSize: 10,
    // startAt: "Japan",
    // startAtField: "country",
    // sort: { country: -1 },
  };
};
