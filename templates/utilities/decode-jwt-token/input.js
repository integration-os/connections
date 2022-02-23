/**
 * ----------------------------------------------------------------------------------------------------
 * Decode JWT Token [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://github.com/auth0/node-jsonwebtoken#readme
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from the Nodes above
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    // Required
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGJ1aWxkYWJsZS5kZXYiLCJuYW1lIjoiSm9obiBEb2UiLCJkb21haW4iOiJodHRwczovL2J1aWxkYWJsZS5kZXYiLCJpYXQiOjE2NDM0MDYwOTYsImF1ZCI6ImRldi11c2VycyIsImlzcyI6IkJ1aWxkYWJsZS5kZXYifQ.fRcDRxDgehC1VWafTpgpskwKhuSdgAJVvO8UxQHChxc",
  };
};
