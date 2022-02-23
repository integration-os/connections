/**
 * ----------------------------------------------------------------------------------------------------
 * Get Templates [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.sendgrid.com/api-reference/transactional-templates/retrieve-paged-transactional-templates
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
    SENDGRID_API_KEY: $trigger.env.SENDGRID_API_KEY, // Required
    page_size: 10, // Required

    // generation: "legacy,dynamic", // Generations of templates to return (i.e. "legacy", "dynamic", "legacy,dynamic")
    // page_token: "", // A token corresponding to a specific page of results, as provided by metadata
  };
};
