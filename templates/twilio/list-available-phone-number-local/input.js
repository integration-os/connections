/**
 * ----------------------------------------------------------------------------------------------------
 * List Available Phone Number Local [Input]
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
    countryCode: "string", // Required

    // areaCode: 0,
    // contains: "string",
    // smsEnabled: true,
    // mmsEnabled: true,
    // voiceEnabled: true,
    // excludeAllAddressRequired: true,
    // excludeLocalAddressRequired: true,
    // excludeForeignAddressRequired: true,
    // beta: true,
    // nearNumber: "string",
    // nearLatLong: "string",
    // distance: 0,
    // inPostalCode: "string",
    // inRegion: "string",
    // inRateCenter: "string",
    // inLata: "string",
    // inLocality: "string",
    // faxEnabled: true,
    // pageSize: 1,
  };
};
