const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_PAGERDUTY_API_KEY: $env.BUILDABLE_PAGERDUTY_API_KEY, // Required
    from: "user@example.com", // Required
    contentType: "application/json", // Required
    accept: "application/vnd.pagerduty+json;version=2", // Required
    user: {
      type: "user",
      name: "Earline Greenholt",
      email: "125.greenholt.earline@graham.name",
      time_zone: "America/Lima",
      color: "green",
      role: "admin",
      job_title: "Director of Engineering",
      avatar_url:
        "https://secure.gravatar.com/avatar/1d1a39d4635208d5664082a6c654a73f.png?d=mm&r=PG",
      description: "I'm the boss",
    }, // Required
  };
};
