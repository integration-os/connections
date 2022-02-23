/**
 * ----------------------------------------------------------------------------------------------------
 * Get User [Run]
 *
 * @description - Get a user using the Supabase Auth Service
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/auth-api-getuser
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => createClient(url, key, {
  // schema: "public",
  // headers: { "x-my-custom-header": "my-app-name" },
  // autoRefreshToken: true,
  // persistSession: true,
  // detectSessionInUrl: true
});

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SUPABASE_URL, SUPABASE_KEY, jwtToken } = input;

  verifyInput(input);

  const supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_KEY);

  const { user, error } = await supabase.auth.api.getUser(jwtToken);

  if (error) {
    return {
      failed: true,
      message: error?.message,
      data: {
        ...error,
      },
    };
  }

  return user;
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ SUPABASE_URL, SUPABASE_KEY, jwtToken }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key (string) is required.
            You can add one to your environment variables at 
            https://app.buildable.dev/settings/environment-variables.`;
  };

  const ERRORS = {
    INVALID_SUPABASE_URL: getEnvironmentVariableError("SUPABASE_URL"),
    INVALID_SUPABASE_KEY: getEnvironmentVariableError("SUPABASE_KEY"),
    INVALID_JWT_TOKEN: "A valid jwtToken field (string) is required.",
  };

  if (typeof SUPABASE_URL !== "string") throw new Error(ERRORS.INVALID_SUPABASE_URL);
  if (typeof SUPABASE_KEY !== "string") throw new Error(ERRORS.INVALID_SUPABASE_KEY);
  if (typeof jwtToken !== "string") throw new Error(ERRORS.INVALID_JWT_TOKEN);
};
