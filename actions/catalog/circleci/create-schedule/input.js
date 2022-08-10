const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    projectSlug: "string", // Required
    name: "string", // Required
    timetable: {
      "per-hour": 0,
      "hours-of-day": [0],
      "days-of-week": ["TUE"],
      "days-of-month": [0],
      months: ["MAR"],
    }, // Required
    attributionActor: "current", // Required
    parameters: { deploy_prod: true, branch: "feature/design-new-api" }, // Required

    // description: "string",
  };
};
