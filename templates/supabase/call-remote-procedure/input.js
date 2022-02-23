/**
 * ----------------------------------------------------------------------------------------------------
 * Call Remote Procedure [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/rpc
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
    SUPABASE_URL: $trigger.env.SUPABASE_URL, // Required
    SUPABASE_KEY: $trigger.env.SUPABASE_KEY, // Required

    functionName: "your-function-name", // Required - The name of the function to call
    functionParams: {}, // Required - Parameters to pass to the function

    __namedParameters: {
      returning: "representation", // Required - Set this to "minimal" if you don't need this value returned
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },
  };
};
