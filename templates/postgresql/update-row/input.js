/**
 * ----------------------------------------------------------------------------------------------------
 * Update Row [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://knexjs.org
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
    POSTGRESQL_CONNECTION_KEY: $trigger.env.POSTGRESQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required
    id: 1, // Required

    updateField1: "updatedValue",
    // updateField2: "updatedValue2"
  };
};
