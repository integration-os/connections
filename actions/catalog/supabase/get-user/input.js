const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SUPABASE_URL: $env.BUILDABLE_SUPABASE_URL, // Required
    BUILDABLE_SUPABASE_KEY: $env.BUILDABLE_SUPABASE_KEY, // Required

    // Required
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQzNzU5OTM5LCJzdWIiOiI0YTVjMzZlMS02ZGE0LTQyYTYtYjEzNy1jZmIzZTcxNmVjNTMiLCJlbWFpbCI6ImhlbGxvQGJ1aWxkYWJsZS5kZXYiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7Im5hbWUiOiJKb2huIERvZXoiLCJvcmdhbml6YXRpb24iOiJCdWlsZGFibGUiLCJ1c2VybmFtZSI6InRoZWpkb2UifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.6-eCRoDOSDZ3GtXeIrUISbSsgaXmQFqR_z-JEdOQHio",
  };
};
