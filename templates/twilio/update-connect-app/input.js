/**
 * ----------------------------------------------------------------------------------------------------
 * Update Connect App [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs
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
    TWILIO_ACCOUNT_SID: $trigger.env.TWILIO_ACCOUNT_SID, // Required
    TWILIO_AUTH_TOKEN: $trigger.env.TWILIO_AUTH_TOKEN, // Required
    sid: "stringstringstringstringstringstri", // Required

    // authorizeRedirectUrl: "http://example.com",
    // companyName: "string",
    // deauthorizeCallbackMethod: "HEAD",
    // deauthorizeCallbackUrl: "http://example.com",
    // description: "string",
    // friendlyName: "string",
    // homepageUrl: "http://example.com",
    // permissions: ["get-all"],
  };
};
