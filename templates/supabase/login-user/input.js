/**
 * ----------------------------------------------------------------------------------------------------
 * Login User [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/auth-signin
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

    email: "example@domain.com", // Required
    password: "+fY9-/YeHYPyPQG9ng$", // Required

    options: {
      scopes: "",
    },
  };
};
