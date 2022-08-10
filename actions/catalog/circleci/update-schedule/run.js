const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY,
    scheduleId,
    description,
    name,
    timetable,
    attributionActor,
    parameters,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://circleci.com/api/v2/schedule/${scheduleId}`,
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: {
        ...(description ? { description } : {}),
        ...(name ? { name } : {}),
        ...(timetable ? { timetable } : {}),
        ...(attributionActor ? { "attribution-actor": attributionActor } : {}),
        ...(parameters ? { parameters } : {}),
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
const verifyInput = ({ BUILDABLE_CIRCLECI_PERSONAL_API_KEY, scheduleId }) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_SCHEDULE_ID: "A valid scheduleId field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof scheduleId !== "string") throw new Error(ERRORS.INVALID_SCHEDULE_ID);
};
