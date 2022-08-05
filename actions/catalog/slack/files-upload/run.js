const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    channels,
    content,
    file,
    filename,
    filetype,
    initial_comment,
    thread_ts,
    title,
    token,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/files.upload",
      headers: {
        Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(channels ? { channels } : {}),
        ...(content ? { content } : {}),
        ...(file ? { file } : {}),
        ...(filename ? { filename } : {}),
        ...(filetype ? { filetype } : {}),
        ...(initial_comment ? { initial_comment } : {}),
        ...(thread_ts ? { thread_ts } : {}),
        ...(title ? { title } : {}),
        ...(token ? { token } : {}),
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
