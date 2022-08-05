const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const { BUILDABLE_SLACK_ACCESS_TOKEN, image_url, team_id, token } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.teams.settings.setIcon",
      headers: {
        Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ image_url, team_id, token }),
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN, image_url, team_id, token }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_IMAGE_URL: "A valid image_url field (string) was not provided in the input.",
    INVALID_TEAM_ID: "A valid team_id field (string) was not provided in the input.",
    INVALID_TOKEN: "A valid token field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
  if (typeof image_url !== "string") throw new Error(ERRORS.INVALID_IMAGE_URL);
  if (typeof team_id !== "string") throw new Error(ERRORS.INVALID_TEAM_ID);
  if (typeof token !== "string") throw new Error(ERRORS.INVALID_TOKEN);
};
