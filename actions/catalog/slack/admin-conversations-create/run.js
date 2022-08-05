const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const { BUILDABLE_SLACK_ACCESS_TOKEN, is_private, name, description, org_wide, team_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.conversations.create",
      headers: {
        Authorization: `Bearer ${BUILDABLE_SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        is_private,
        name,
        ...(description ? { description } : {}),
        ...(org_wide ? { org_wide } : {}),
        ...(team_id ? { team_id } : {}),
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
const verifyInput = ({ BUILDABLE_SLACK_ACCESS_TOKEN, is_private, name }) => {
  const ERRORS = {
    INVALID_BUILDABLE_SLACK_ACCESS_TOKEN:
      "A valid BUILDABLE_SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_IS_PRIVATE: "A valid is_private field (boolean) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SLACK_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SLACK_ACCESS_TOKEN);
  if (typeof is_private !== "boolean") throw new Error(ERRORS.INVALID_IS_PRIVATE);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};
