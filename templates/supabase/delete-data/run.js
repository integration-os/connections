/**
 * ----------------------------------------------------------------------------------------------------
 * Delete Data [Run]
 *
 * @description - Delete data from a table in a Supabase database
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/delete
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
  const { SUPABASE_URL, SUPABASE_KEY, tableName, __namedParameters, match } = input;

  verifyInput(input);

  const supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_KEY);

  const { data, error, count } = await supabase
    .from(tableName)
    .delete(__namedParameters)
    .match(match);

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
const verifyInput = ({ SUPABASE_URL, SUPABASE_KEY, tableName, __namedParameters, match }) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key (string) is required.
            You can add one to your environment variables at 
            https://app.buildable.dev/settings/environment-variables.`;
  };

  const ERRORS = {
    INVALID_SUPABASE_URL: getEnvironmentVariableError("SUPABASE_URL"),
    INVALID_SUPABASE_KEY: getEnvironmentVariableError("SUPABASE_KEY"),
    INVALID_NAMED_PARAMETERS: "A valid __namedParameters field (Object) is required.",
    INVALID_TABLE_NAME: "A valid table name field (string) is required.",
    INVALID_MATCH: "A valid match field (object) is required.",
  };

  if (typeof SUPABASE_URL !== "string") throw new Error(ERRORS.INVALID_SUPABASE_URL);
  if (typeof SUPABASE_KEY !== "string") throw new Error(ERRORS.INVALID_SUPABASE_KEY);
  if (typeof tableName !== "string") throw new Error(ERRORS.INVALID_TABLE_NAME);
  if (typeof __namedParameters !== "object") throw new Error(ERRORS.INVALID_NAMED_PARAMETERS);
  if (typeof match !== "object") throw new Error(ERRORS.INVALID_MATCH);
};
