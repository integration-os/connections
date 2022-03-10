/**
 * ----------------------------------------------------------------------------------------------------
 * Create Payments [Input]
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
    callSid: "stringstringstringstringstringstri", // Required
    idempotencyKey: "string", // Required
    statusCallback: "http://example.com", // Required

    // bankAccountType: "consumer-checking",
    // chargeAmount: 0,
    // currency: "string",
    // description: "string",
    // input: "string",
    // minPostalCodeLength: 0,
    // parameter: {},
    // paymentConnector: "string",
    // paymentMethod: "credit-card",
    // postalCode: true,
    // securityCode: true,
    // timeout: 0,
    // tokenType: "one-time",
    // validCardTypes: "string",
  };
};
