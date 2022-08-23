const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_CIRCLECI_PERSONAL_API_KEY, ownerId, ownerSlug, ownerType, pageToken } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "https://circleci.com/api/v2/context",
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      params: {
        ...(ownerId ? { "owner-id": ownerId } : {}),
        ...(ownerSlug ? { "owner-slug": ownerSlug } : {}),
        ...(ownerType ? { "owner-type": ownerType } : {}),
        ...(pageToken ? { "page-token": pageToken } : {}),
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
};
