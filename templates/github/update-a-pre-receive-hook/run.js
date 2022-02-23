/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Pre-Receive Hook [Run]
 *
 * @description - Update a Pre-Receive Hook using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#update-a-pre-receive-hook
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    GITHUB_API_USERNAME,
    GITHUB_API_TOKEN,
    pre_receive_hook_id,
    name,
    script,
    script_repository,
    environment,
    enforcement,
    allow_downstream_configuration,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/admin/pre-receive-hooks/${pre_receive_hook_id}`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        ...(name ? { name } : {}),
        ...(script ? { script } : {}),
        ...(script_repository ? { script_repository } : {}),
        ...(environment ? { environment } : {}),
        ...(enforcement ? { enforcement } : {}),
        ...(allow_downstream_configuration ? { allow_downstream_configuration } : {}),
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ pre_receive_hook_id }) => {
  const ERRORS = {
    INVALID_PRE_RECEIVE_HOOK_ID:
      "A valid pre_receive_hook_id field (number) was not provided in the input.",
  };

  if (typeof pre_receive_hook_id !== "number") throw new Error(ERRORS.INVALID_PRE_RECEIVE_HOOK_ID);
};
