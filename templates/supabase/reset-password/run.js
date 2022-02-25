/**
 * ----------------------------------------------------------------------------------------------------
 * Reset Password [Run]
 *
 * @description - Reset a password using the Supabase Auth Service
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/auth-api-resetpasswordforemail
 *
 * ----------------------------------------------------------------------------------------------------
 */

const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) =>
  createClient(url, key, {
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
  const { SUPABASE_URL, SUPABASE_KEY, accessToken, password } = input;

  verifyInput(input);

  const supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_KEY);

  const { data, error } = await supabase.auth.api.updateUser(accessToken, {
    password,
  });

  if (error) {
    return {
      failed: true,
      message: error?.message,
      data: {
        ...error,
      },
    };
  }

  return data;
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ SUPABASE_URL, SUPABASE_KEY, accessToken, password }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key (string) is required.
            You can add one to your environment variables at 
            https://app.buildable.dev/settings/environment-variables.`;
  };

  const ERRORS = {
    INVALID_SUPABASE_URL: getEnvironmentVariableError("SUPABASE_URL"),
    INVALID_SUPABASE_KEY: getEnvironmentVariableError("SUPABASE_KEY"),
    INVALID_ACCESS_TOKEN: "A valid accessToken field (string) is required.",
    INVALID_PASSWORD: "A valid password field (string) is required.",
  };

  if (typeof SUPABASE_URL !== "string") throw new Error(ERRORS.INVALID_SUPABASE_URL);
  if (typeof SUPABASE_KEY !== "string") throw new Error(ERRORS.INVALID_SUPABASE_KEY);
  if (typeof accessToken !== "string") throw new Error(ERRORS.INVALID_ACCESS_TOKEN);
  if (typeof password !== "string") throw new Error(ERRORS.INVALID_PASSWORD);
};
