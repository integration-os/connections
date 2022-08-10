const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_CIRCLECI_PERSONAL_API_KEY: $env.BUILDABLE_CIRCLECI_PERSONAL_API_KEY, // Required
    scheduleId: "497f6eca-6276-4993-bfeb-53cbbbba6f08", // Required

    // description: "string",
    // name: "string",
    // timetable: {
    //     "per-hour": 0,
    //     "hours-of-day": [0],
    //     "days-of-week": ["TUE"],
    //     "days-of-month": [0],
    //     months: ["MAR"]
    //   },
    // attributionActor: "current",
    // parameters: { deploy_prod: true, branch: "feature/design-new-api" },
  };
};
