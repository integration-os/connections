const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    ruleset: {
      id: "0e84de00-9511-4380-9f4f-a7b568bb49a0",
      name: "MySQL Clusters",
      type: "global",
      routing_keys: ["R0212P1QXGEIQE2NMTQ7L7WXD00DWHIN"],
      self: "https://api.pagerduty.com/rulesets/0e84de00-9511-4380-9f4f-a7b568bb49a0",
      created_at: "2019-12-24T21:18:52Z",
      creator: {
        type: "user_reference",
        self: "https://api.pagerduty.com/users/PABO808",
        id: "PABO808",
      },
      updated_at: "2019-12-25T14:54:23Z",
      updater: {
        type: "user_reference",
        self: "https://api.pagerduty.com/users/PABO808",
        id: "PABO808",
      },
      team: {
        type: "team_reference",
        self: "https://api.pagerduty.com/teams/P3ZQXDF",
        id: "P3ZQXDF",
      },
    }, // Required
  };
};
