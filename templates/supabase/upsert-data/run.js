const { createClient } = require("@supabase/supabase-js");

const getSupabaseClient = (url, key) => createClient(url, key, {
  // schema: "public",
  // headers: { "x-my-custom-header": "my-app-name" },
  // autoRefreshToken: true,
  // persistSession: true,
  // detectSessionInUrl: true
});

const run = async (input) => {
  const { BUILDABLE_SUPABASE_URL, BUILDABLE_SUPABASE_KEY, tableName, __namedParameters, values } = input;

  verifyInput(input);

  const supabase = getSupabaseClient(BUILDABLE_SUPABASE_URL, BUILDABLE_SUPABASE_KEY);

  const { data, error, count } = await supabase.from(tableName).upsert(values, __namedParameters);

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
    data,
    count,
  };
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_SUPABASE_URL, BUILDABLE_SUPABASE_KEY, tableName, __namedParameters, values }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key (string) is required. Create your appropriate Connection to automatically add it.`;
  };

  const ERRORS = {
    INVALID_BUILDABLE_SUPABASE_URL: getEnvironmentVariableError("BUILDABLE_SUPABASE_URL"),
    INVALID_BUILDABLE_SUPABASE_KEY: getEnvironmentVariableError("BUILDABLE_SUPABASE_KEY"),
    INVALID_NAMED_PARAMETERS: "A valid __namedParameters field (Object) is required.",
    INVALID_TABLE_NAME: "A valid table name field (string) is required.",
    INVALID_VALUES: "A valid values object or array of objects is required.",
  };

  if (typeof BUILDABLE_SUPABASE_URL !== "string") throw new Error(ERRORS.INVALID_BUILDABLE_SUPABASE_URL);
  if (typeof BUILDABLE_SUPABASE_KEY !== "string") throw new Error(ERRORS.INVALID_BUILDABLE_SUPABASE_KEY);
  if (typeof tableName !== "string") throw new Error(ERRORS.INVALID_TABLE_NAME);
  if (typeof __namedParameters !== "object") throw new Error(ERRORS.INVALID_NAMED_PARAMETERS);
  if (values && !Array.isArray(values) && typeof values !== "object")
    throw new Error(ERRORS.INVALID_VALUES);
};
