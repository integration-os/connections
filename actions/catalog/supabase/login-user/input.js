const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required

    email: "example@domain.com", // Required
    password: "+fY9-/YeHYPyPQG9ng$", // Required

    options: {
      scopes: "",
    },
  };
};
