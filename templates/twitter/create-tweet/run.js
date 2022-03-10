/**
 * ----------------------------------------------------------------------------------------------------
 * Creation of a Tweet [Run]
 *
 * @description - Creation of a tweet using the Twitter API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
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
    TWITTER_BEARER_TOKEN,
    text,
    direct_message_deep_link,
    quote_tweet_id,
    for_super_followers_only,
    reply,
    media,
    poll,
    reply_settings,
    geo,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.twitter.com/2/tweets",
      headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      data: {
        ...(text ? { text } : {}),
        ...(direct_message_deep_link ? { direct_message_deep_link } : {}),
        ...(quote_tweet_id ? { quote_tweet_id } : {}),
        ...(for_super_followers_only ? { for_super_followers_only } : {}),
        ...(reply ? { reply } : {}),
        ...(media ? { media } : {}),
        ...(poll ? { poll } : {}),
        ...(reply_settings ? { reply_settings } : {}),
        ...(geo ? { geo } : {}),
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
const verifyInput = ({ TWITTER_BEARER_TOKEN }) => {
  const ERRORS = {
    INVALID_TWITTER_BEARER_TOKEN:
      "A valid TWITTER_BEARER_TOKEN field (string) was not provided in the input.",
  };

  if (typeof TWITTER_BEARER_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_TWITTER_BEARER_TOKEN);
};
