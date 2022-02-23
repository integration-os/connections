/**
 * ----------------------------------------------------------------------------------------------------
 * Upsert Data [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/upsert
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
      onConflict: undefined, // Required - Set this to a parameter name to UPSERT columns with a UNIQUE constraint
      ignoreDuplicates: true, // Required - Set this to true to ignore duplicate rows
      count: "exact", // Required - Count algorithm to use to count rows in a table. (Ex: null, exact, planned, estimated)
    },

    // Required - Object or array of objects to insert
    values: {
      name: "John Doe",
      organization: "Buildable",
      organizationId: 23,
    },
  };
};
