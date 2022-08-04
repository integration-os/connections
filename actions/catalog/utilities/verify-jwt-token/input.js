const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_JWT_SECRET: $env.BUILDABLE_JWT_SECRET, // Required
    BUILDABLE_JWT_ISSUER: $env.BUILDABLE_JWT_ISSUER, // Required

    // Required
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGJ1aWxkYWJsZS5kZXYiLCJuYW1lIjoiSm9obiBEb2UiLCJkb21haW4iOiJodHRwczovL2J1aWxkYWJsZS5kZXYiLCJpYXQiOjE2NDM0MDYwOTYsImF1ZCI6ImRldi11c2VycyIsImlzcyI6IkJ1aWxkYWJsZS5kZXYifQ.fRcDRxDgehC1VWafTpgpskwKhuSdgAJVvO8UxQHChxc",

    audience: "users",

    // complete: false,
    // algorithms: ["HS256"],
    // ignoreExpiration: false,
    // ignoreNotBefore: false,
    // subject: "",
    // clockTolerance: 0,
    // maxAge: "90d",
    // clockTimestamp: Date.now(),
    // nonce: false
  };
};
