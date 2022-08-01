const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    MONGODB_CONNECTION_KEY: $env.MONGODB_CONNECTION_KEY, // Required
    collection: "posts", // Required
    entities: [{}], // Required - An array of objects
  };
};
