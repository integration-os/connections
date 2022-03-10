/**
 * ----------------------------------------------------------------------------------------------------
 * Create Address [Input]
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
    city: "string", // Required
    customerName: "string", // Required
    isoCountry: "string", // Required
    postalCode: "string", // Required
    region: "string", // Required
    street: "string", // Required

    // autoCorrectAddress: true,
    // emergencyEnabled: true,
    // friendlyName: "string",
  };
};
