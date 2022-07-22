const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_MONGODB_CONNECTION_KEY: $env.BUILDABLE_MONGODB_CONNECTION_KEY, // Required
    collection: "posts", // Required
    entities: [{}], // Required - An array of objects
  };
};
