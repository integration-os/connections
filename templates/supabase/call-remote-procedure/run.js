/**
 * ----------------------------------------------------------------------------------------------------
 * Call Remote Procedure [Run]
 *
 * @description - Call a remote procedure function in a Supabase database
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://supabase.com/docs/reference/javascript/rpc
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
  const { SUPABASE_URL, SUPABASE_KEY, functionName, functionParams, __namedParameters } = input;

  verifyInput(input);

  const supabase = getSupabaseClient(SUPABASE_URL, SUPABASE_KEY);

  const { data, error, count } = await supabase.rpc(
    functionName,
    functionParams,
    __namedParameters,
  );

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
const verifyInput = ({
  SUPABASE_URL,
  SUPABASE_KEY,
  functionName,
  functionParams,
  __namedParameters,
}) => {
  const getEnvironmentVariableError = (key) => {
    return `A valid ${key} key (string) is required.
            You can add one to your environment variables at 
            https://app.buildable.dev/settings/environment-variables.`;
  };

  const ERRORS = {
    INVALID_SUPABASE_URL: getEnvironmentVariableError("SUPABASE_URL"),
    INVALID_SUPABASE_KEY: getEnvironmentVariableError("SUPABASE_KEY"),
    INVALID_FUNCTION_NAME: "A valid functionName field (string) is required.",
    INVALID_FUNCTION_PARAMS: "A valid functionParams field (object) is required.",
    INVALID_NAMED_PARAMETERS: "A valid __namedParameters field (Object) is required.",
  };

  if (typeof SUPABASE_URL !== "string") throw new Error(ERRORS.INVALID_SUPABASE_URL);
  if (typeof SUPABASE_KEY !== "string") throw new Error(ERRORS.INVALID_SUPABASE_KEY);
  if (typeof functionName !== "string") throw new Error(ERRORS.INVALID_FUNCTION_NAME);
  if (typeof functionParams !== "object") throw new Error(ERRORS.INVALID_FUNCTION_PARAMS);
  if (typeof __namedParameters !== "object") throw new Error(ERRORS.INVALID_NAMED_PARAMETERS);
};
