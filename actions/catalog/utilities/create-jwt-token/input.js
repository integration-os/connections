const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_JWT_SECRET: $env.BUILDABLE_JWT_SECRET, // Required
    BUILDABLE_JWT_ISSUER: $env.BUILDABLE_JWT_ISSUER, // Required
    audience: "users", // Required

    // Required - Data to be encoded in the JWT
    data: {
      email: "example@domain.com",
    },

    // expiresIn: "90d", // Eg: 60, "2 days", "10h", "7d"
    // notBefore: "2d", // Eg: 60, "2 days", "10h", "7d"
    // header: {},

    // algorithm: "HS256",
    // noTimestamp: false,
    // subject: "",
    // keyid: "",
    // mutatePayload: false
  };
};
