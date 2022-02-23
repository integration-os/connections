/**
 * ----------------------------------------------------------------------------------------------------
 * GraphQL Request [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.npmjs.com/package/graphql-request
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    endpoint: "https://api.example.com/movies/", // Required

    // Required
    query: ` {
      user(id: 2) {
        id
        name
      }
    }`,

    // variables: {},
    // requestHeaders: {},
  };
};
