/**
 * ----------------------------------------------------------------------------------------------------
 * Template Name [Input]
 * 
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      link-to-appropriate-documentation
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
    API_KEY: $trigger.env.API_KEY, // Required
    name: "Mr. Bean", // Required

    // optional1: "",
    // optional2: {},
    // optional3: [],
  };
}
