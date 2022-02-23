/**
 * ----------------------------------------------------------------------------------------------------
 * Reset Password [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/auth-api-resetpasswordforemail
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

    accessToken: "", // Required - JWT access token from password reset email
    password: "new-password", // Required - New password
  };
};
