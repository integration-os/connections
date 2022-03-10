/**
 * ----------------------------------------------------------------------------------------------------
 * Invite a User to a Workspace. [Run]
 *
 * @description - Invite a user to a workspace. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.users.invite
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
    SLACK_ACCESS_TOKEN,
    channel_ids,
    email,
    team_id,
    custom_message,
    guest_expiration_ts,
    is_restricted,
    is_ultra_restricted,
    real_name,
    resend,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.users.invite",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        channel_ids,
        email,
        team_id,
        ...(custom_message ? { custom_message } : {}),
        ...(guest_expiration_ts ? { guest_expiration_ts } : {}),
        ...(is_restricted ? { is_restricted } : {}),
        ...(is_ultra_restricted ? { is_ultra_restricted } : {}),
        ...(real_name ? { real_name } : {}),
        ...(resend ? { resend } : {}),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, channel_ids, email, team_id }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_CHANNEL_IDS: "A valid channel_ids field (string) was not provided in the input.",
    INVALID_EMAIL: "A valid email field (string) was not provided in the input.",
    INVALID_TEAM_ID: "A valid team_id field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof channel_ids !== "string") throw new Error(ERRORS.INVALID_CHANNEL_IDS);
  if (typeof email !== "string") throw new Error(ERRORS.INVALID_EMAIL);
  if (typeof team_id !== "string") throw new Error(ERRORS.INVALID_TEAM_ID);
};
