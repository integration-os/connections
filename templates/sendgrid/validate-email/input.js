/**
 * ----------------------------------------------------------------------------------------------------
 * Validate Email [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.sendgrid.com/api-reference/e-mail-address-validation/validate-an-email
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

    email: "example@domain.com", // Required
    source: "signup", // Required
  };
};
