const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    id: "string", // Required
    orchestration: {
      id: "b02e973d-9620-4e0a-9edc-00fedf7d4694",
      self: "https://api.pagerduty.com/event_orchestrations/b02e973d-9620-4e0a-9edc-00fedf7d4694",
      name: "Shopping Cart Orchestration",
      description: "Send shopping cart alerts to the right services",
      team: {
        type: "team_reference",
        self: "https://api.pagerduty.com/teams/P3ZQXDF",
        id: "P3ZQXDF",
      },
      integrations: [
        {
          id: "9c5ff030-12da-4204-a067-25ee61a8df6c",
          parameters: { routing_key: "R028DIE06SNKNO6V5ACSLRV7Y0TUVG7T", type: "global" },
        },
      ],
      routes: 0,
      created_at: "2019-12-24T21:18:52Z",
      created_by: {
        type: "user_reference",
        self: "https://api.pagerduty.com/users/PABO808",
        id: "PABO808",
      },
      updated_at: "2019-12-25T14:54:23Z",
      updated_by: {
        type: "user_reference",
        self: "https://api.pagerduty.com/users/PABO808",
        id: "PABO808",
      },
      version: "BrWLKQBLm8QO2ZYQ0GosHLxdbgWZ0ZR3",
    }, // Required
  };
};
