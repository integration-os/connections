/**
 * ----------------------------------------------------------------------------------------------------
 * Get User [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/auth-api-getuser
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

    // Required
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQzNzU5OTM5LCJzdWIiOiI0YTVjMzZlMS02ZGE0LTQyYTYtYjEzNy1jZmIzZTcxNmVjNTMiLCJlbWFpbCI6ImhlbGxvQGJ1aWxkYWJsZS5kZXYiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7Im5hbWUiOiJKb2huIERvZXoiLCJvcmdhbml6YXRpb24iOiJCdWlsZGFibGUiLCJ1c2VybmFtZSI6InRoZWpkb2UifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.6-eCRoDOSDZ3GtXeIrUISbSsgaXmQFqR_z-JEdOQHio",
  };
};
