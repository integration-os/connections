const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required

    accessToken: "", // Required - JWT access token from password reset email
    password: "new-password", // Required - New password
  };
};
