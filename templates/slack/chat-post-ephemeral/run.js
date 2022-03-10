/**
 * ----------------------------------------------------------------------------------------------------
 * Sends an Ephemeral Message to a User in a Channel. [Run]
 *
 * @description - Sends an ephemeral message to a user in a channel. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/chat.postEphemeral
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
    channel,
    user,
    as_user,
    attachments,
    blocks,
    icon_emoji,
    icon_url,
    link_names,
    parse,
    text,
    thread_ts,
    username,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/chat.postEphemeral",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        channel,
        user,
        ...(as_user ? { as_user } : {}),
        ...(attachments ? { attachments } : {}),
        ...(blocks ? { blocks } : {}),
        ...(icon_emoji ? { icon_emoji } : {}),
        ...(icon_url ? { icon_url } : {}),
        ...(link_names ? { link_names } : {}),
        ...(parse ? { parse } : {}),
        ...(text ? { text } : {}),
        ...(thread_ts ? { thread_ts } : {}),
        ...(username ? { username } : {}),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, channel, user }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_CHANNEL: "A valid channel field (string) was not provided in the input.",
    INVALID_USER: "A valid user field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof channel !== "string") throw new Error(ERRORS.INVALID_CHANNEL);
  if (typeof user !== "string") throw new Error(ERRORS.INVALID_USER);
};
