/**
 * ----------------------------------------------------------------------------------------------------
 * Execute Raw Query [Input]
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
    MYSQL_CONNECTION_KEY: $trigger.env.MYSQL_CONNECTION_KEY, // Required
    query: "SELECT id FROM table_name LIMIT 10;",
    maxLimit: 100
  };
};
