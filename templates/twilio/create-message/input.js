/**
 * ----------------------------------------------------------------------------------------------------
 * Create Message [Input]
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
    to: "string", // Required

    // addressRetention: "retain",
    // applicationSid: "string",
    // attempt: 0,
    // body: "string",
    // contentRetention: "retain",
    // forceDelivery: true,
    // from: "string",
    // maxPrice: 0,
    // mediaUrl: ["http://example.com"],
    // messagingServiceSid: "string",
    // persistentAction: ["string"],
    // provideFeedback: true,
    // scheduleType: "fixed",
    // sendAsMms: true,
    // sendAt: "2019-08-24T14:15:22Z",
    // smartEncoded: true,
    // statusCallback: "http://example.com",
    // validityPeriod: 0,
  };
};
