const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY,
    projectSlug,
    name,
    timetable,
    attributionActor,
    parameters,
    description,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://circleci.com/api/v2/project/${projectSlug}/schedule`,
      auth: { username: BUILDABLE_CIRCLECI_PERSONAL_API_KEY },
      data: {
        name,
        timetable,
        "attribution-actor": attributionActor,
        parameters,
        ...(description ? { description } : {}),
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
const verifyInput = ({
  BUILDABLE_CIRCLECI_PERSONAL_API_KEY,
  projectSlug,
  name,
  timetable,
  attributionActor,
  parameters,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY:
      "A valid BUILDABLE_CIRCLECI_PERSONAL_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_PROJECT_SLUG: "A valid projectSlug field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
    INVALID_TIMETABLE: "A valid timetable field (object) was not provided in the input.",
    INVALID_ATTRIBUTION_ACTOR:
      "A valid attributionActor field (string) was not provided in the input.",
    INVALID_PARAMETERS: "A valid parameters field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_CIRCLECI_PERSONAL_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_CIRCLECI_PERSONAL_API_KEY);
  if (typeof projectSlug !== "string") throw new Error(ERRORS.INVALID_PROJECT_SLUG);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
  if (typeof timetable !== "object") throw new Error(ERRORS.INVALID_TIMETABLE);
  if (typeof attributionActor !== "string") throw new Error(ERRORS.INVALID_ATTRIBUTION_ACTOR);
  if (typeof parameters !== "object") throw new Error(ERRORS.INVALID_PARAMETERS);
};
