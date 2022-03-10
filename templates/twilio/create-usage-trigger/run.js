/**
 * ----------------------------------------------------------------------------------------------------
 * Create Usage Trigger [Run]
 *
 * @description - Create a new usagetrigger
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.twilio.com/docs
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    callbackUrl,
    triggerValue,
    usageCategory,
    callbackMethod,
    friendlyName,
    recurring,
    triggerBy,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Usage/Triggers.json`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: { username: TWILIO_ACCOUNT_SID, password: TWILIO_AUTH_TOKEN },
      data: qs.stringify({
        CallbackUrl: callbackUrl,
        TriggerValue: triggerValue,
        UsageCategory: usageCategory,
        ...(callbackMethod ? { CallbackMethod: callbackMethod } : {}),
        ...(friendlyName ? { FriendlyName: friendlyName } : {}),
        ...(recurring ? { Recurring: recurring } : {}),
        ...(triggerBy ? { TriggerBy: triggerBy } : {}),
      }),
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
const verifyInput = ({
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  callbackUrl,
  triggerValue,
  usageCategory,
}) => {
  const ERRORS = {
    INVALID_TWILIO_ACCOUNT_SID:
      "A valid TWILIO_ACCOUNT_SID field (string) was not provided in the input.",
    INVALID_TWILIO_AUTH_TOKEN:
      "A valid TWILIO_AUTH_TOKEN field (string) was not provided in the input.",
    INVALID_CALLBACK_URL: "A valid callbackUrl field (string) was not provided in the input.",
    INVALID_TRIGGER_VALUE: "A valid triggerValue field (string) was not provided in the input.",
    INVALID_USAGE_CATEGORY: "A valid usageCategory field (string) was not provided in the input.",
  };

  if (typeof TWILIO_ACCOUNT_SID !== "string") throw new Error(ERRORS.INVALID_TWILIO_ACCOUNT_SID);
  if (typeof TWILIO_AUTH_TOKEN !== "string") throw new Error(ERRORS.INVALID_TWILIO_AUTH_TOKEN);
  if (typeof callbackUrl !== "string") throw new Error(ERRORS.INVALID_CALLBACK_URL);
  if (typeof triggerValue !== "string") throw new Error(ERRORS.INVALID_TRIGGER_VALUE);
  if (typeof usageCategory !== "string") throw new Error(ERRORS.INVALID_USAGE_CATEGORY);
};
