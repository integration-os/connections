/**
 * ----------------------------------------------------------------------------------------------------
 * Add a Self-Hosted Runner to a Group for an Enterprise [Run]
 *
 * @description - Add a self-hosted runner to a group for an enterprise using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#add-a-self-hosted-runner-to-a-group-for-an-enterprise
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
    GITHUB_API_TOKEN,
    GITHUB_API_USERNAME,
    enterprise,
    runner_group_id,
    runner_id,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/enterprises/${enterprise}/actions/runner-groups/${runner_group_id}/runners/${runner_id}`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
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
const verifyInput = ({
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  enterprise,
  runner_group_id,
  runner_id,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_ENTERPRISE:
      "A valid enterprise field (string) was not provided in the input.",
    INVALID_RUNNER_GROUP_ID:
      "A valid runner_group_id field (number) was not provided in the input.",
    INVALID_RUNNER_ID:
      "A valid runner_id field (number) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof enterprise !== "string")
    throw new Error(ERRORS.INVALID_ENTERPRISE);
  if (typeof runner_group_id !== "number")
    throw new Error(ERRORS.INVALID_RUNNER_GROUP_ID);
  if (typeof runner_id !== "number") throw new Error(ERRORS.INVALID_RUNNER_ID);
};
