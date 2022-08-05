const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_SLACK_ACCESS_TOKEN,
    usergroup,
    channels,
    description,
    handle,
    include_count,
    name,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/usergroups.update",
      headers: {
        Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        usergroup,
        ...(channels ? { channels } : {}),
        ...(description ? { description } : {}),
        ...(handle ? { handle } : {}),
        ...(include_count ? { include_count } : {}),
        ...(name ? { name } : {}),
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN, usergroup }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_USERGROUP: "A valid usergroup field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
  if (typeof usergroup !== "string") throw new Error(ERRORS.INVALID_USERGROUP);
};
