/**
 * ----------------------------------------------------------------------------------------------------
 * Update Data [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/update
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
    tableName: "your-table-name", // Required
    __namedParameters: {
      returning: "representation", // Required - Set this to "minimal" if you don't need this value returned
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },

    // Required - Object with updated values
    values: {
      status: "DO_NOT_DISTURB",
    },

    // Required - Object with match values
    match: {
      name: "John Doe",
    },
  };
};
