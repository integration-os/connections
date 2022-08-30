const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    schedule: {
      name: "Daily Engineering Rotation",
      type: "schedule",
      time_zone: "America/New_York",
      description: "Rotation schedule for engineering",
      schedule_layers: [
        {
          name: "Night Shift",
          start: "2015-11-06T20:00:00-05:00",
          end: "2016-11-06T20:00:00-05:00",
          rotation_virtual_start: "2015-11-06T20:00:00-05:00",
          rotation_turn_length_seconds: 86400,
          users: [{ user: { id: "PXPGF42", type: "user_reference" } }],
          restrictions: [
            { type: "daily_restriction", start_time_of_day: "08:00:00", duration_seconds: 32400 },
          ],
        },
      ],
    }, // Required

    // overflow: false,
  };
};
