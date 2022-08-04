const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    // Required - Array of all arrays you want to merge
    arrays: [
      [1, 2, 3, 4, 5, 5],
      [2, 3, 4, 5, 6, 6],
      [100, 500, 6, 250],
    ],
  };
};
