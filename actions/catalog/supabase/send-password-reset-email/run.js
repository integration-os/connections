const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => createClient(url, key, {
  // schema: "public",
  // headers: { "x-my-custom-header": "my-app-name" },
  // autoRefreshToken: true,
  // persistSession: true,
  // detectSessionInUrl: true
});

const run = async (input) => {
  const { BUILDABLE_SUPABASE_URL, BUILDABLE_SUPABASE_KEY, email } = input;

  verifyInput(input);

  const supabase = getSupabaseClient(BUILDABLE_SUPABASE_URL, BUILDABLE_SUPABASE_KEY);

  const { data, error } = supabase.auth.api.resetPasswordForEmail(email);

  if (error) {
    return {
      failed: true,
      message: error?.message,
      data: {
        ...error,
      },
    };
  }

  return {
    success: true,
    message: `Pasword reset email sent to ${email}.`,
  };
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_SUPABASE_URL, BUILDABLE_SUPABASE_KEY, email }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key (string) is required. Create your appropriate Connection to automatically add it.`;
  };

  const ERRORS = {
    INVALID_BUILDABLE_SUPABASE_URL: getEnvironmentVariableError("BUILDABLE_SUPABASE_URL"),
    INVALID_BUILDABLE_SUPABASE_KEY: getEnvironmentVariableError("BUILDABLE_SUPABASE_KEY"),
    INVALID_EMAIL: "A valid email field (string) is required.",
  };

  if (typeof BUILDABLE_SUPABASE_URL !== "string") throw new Error(ERRORS.INVALID_BUILDABLE_SUPABASE_URL);
  if (typeof BUILDABLE_SUPABASE_KEY !== "string") throw new Error(ERRORS.INVALID_BUILDABLE_SUPABASE_KEY);
  if (typeof email !== "string") throw new Error(ERRORS.INVALID_EMAIL);
};
