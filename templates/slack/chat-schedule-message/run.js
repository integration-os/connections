const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    as_user,
    attachments,
    blocks,
    channel,
    link_names,
    parse,
    post_at,
    reply_broadcast,
    text,
    thread_ts,
    unfurl_links,
    unfurl_media,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/chat.scheduleMessage",
      headers: {
        Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(as_user ? { as_user } : {}),
        ...(attachments ? { attachments } : {}),
        ...(blocks ? { blocks } : {}),
        ...(channel ? { channel } : {}),
        ...(link_names ? { link_names } : {}),
        ...(parse ? { parse } : {}),
        ...(post_at ? { post_at } : {}),
        ...(reply_broadcast ? { reply_broadcast } : {}),
        ...(text ? { text } : {}),
        ...(thread_ts ? { thread_ts } : {}),
        ...(unfurl_links ? { unfurl_links } : {}),
        ...(unfurl_media ? { unfurl_media } : {}),
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
};
