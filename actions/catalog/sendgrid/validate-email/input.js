const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SENDGRID_API_KEY: $env.BUILDABLE_SENDGRID_API_KEY, // Required

    email: "example@domain.com", // Required
    source: "signup", // Required
  };
};
