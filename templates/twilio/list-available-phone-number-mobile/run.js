/**
 * ----------------------------------------------------------------------------------------------------
 * List Available Phone Number Mobile [Run]
 *
 * @description -
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    countryCode,
    areaCode,
    contains,
    smsEnabled,
    mmsEnabled,
    voiceEnabled,
    excludeAllAddressRequired,
    excludeLocalAddressRequired,
    excludeForeignAddressRequired,
    beta,
    nearNumber,
    nearLatLong,
    distance,
    inPostalCode,
    inRegion,
    inRateCenter,
    inLata,
    inLocality,
    faxEnabled,
    pageSize,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/AvailablePhoneNumbers/${countryCode}/Mobile.json`,
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      params: {
        ...(areaCode ? { AreaCode: areaCode } : {}),
        ...(contains ? { Contains: contains } : {}),
        ...(smsEnabled ? { SmsEnabled: smsEnabled } : {}),
        ...(mmsEnabled ? { MmsEnabled: mmsEnabled } : {}),
        ...(voiceEnabled ? { VoiceEnabled: voiceEnabled } : {}),
        ...(excludeAllAddressRequired
          ? { ExcludeAllAddressRequired: excludeAllAddressRequired }
          : {}),
        ...(excludeLocalAddressRequired
          ? { ExcludeLocalAddressRequired: excludeLocalAddressRequired }
          : {}),
        ...(excludeForeignAddressRequired
          ? { ExcludeForeignAddressRequired: excludeForeignAddressRequired }
          : {}),
        ...(beta ? { Beta: beta } : {}),
        ...(nearNumber ? { NearNumber: nearNumber } : {}),
        ...(nearLatLong ? { NearLatLong: nearLatLong } : {}),
        ...(distance ? { Distance: distance } : {}),
        ...(inPostalCode ? { InPostalCode: inPostalCode } : {}),
        ...(inRegion ? { InRegion: inRegion } : {}),
        ...(inRateCenter ? { InRateCenter: inRateCenter } : {}),
        ...(inLata ? { InLata: inLata } : {}),
        ...(inLocality ? { InLocality: inLocality } : {}),
        ...(faxEnabled ? { FaxEnabled: faxEnabled } : {}),
        ...(pageSize ? { PageSize: pageSize } : {}),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, countryCode }) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_COUNTRY_CODE: "A valid countryCode field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof countryCode !== "string") throw new Error(ERRORS.INVALID_COUNTRY_CODE);
};
