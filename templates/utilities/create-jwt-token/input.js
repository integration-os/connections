/**
 * ----------------------------------------------------------------------------------------------------
 * Create JWT Token [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://github.com/auth0/node-jsonwebtoken#readme
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from the Nodes above
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    JWT_SECRET: $trigger.env.JWT_SECRET, // Required
    JWT_ISSUER: $trigger.env.JWT_ISSUER, // Required
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
