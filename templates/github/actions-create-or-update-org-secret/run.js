/**
 * ----------------------------------------------------------------------------------------------------
 * Create or Update an Organization Secret [Run]
 *
 * @description - Create or update an organization secret using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#create-or-update-an-organization-secret
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
    org,
    secret_name,
    visibility,
    encrypted_value,
    key_id,
    selected_repository_ids,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/orgs/${org}/actions/secrets/${secret_name}`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: {
        visibility,
        ...(encrypted_value ? { encrypted_value } : {}),
        ...(key_id ? { key_id } : {}),
        ...(selected_repository_ids ? { selected_repository_ids } : {}),
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
const verifyInput = ({
  GITHUB_API_TOKEN,
  GITHUB_API_USERNAME,
  org,
  secret_name,
  visibility,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_SECRET_NAME:
      "A valid secret_name field (string) was not provided in the input.",
    INVALID_VISIBILITY:
      "A valid visibility field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof secret_name !== "string")
    throw new Error(ERRORS.INVALID_SECRET_NAME);
  if (typeof visibility !== "string")
    throw new Error(ERRORS.INVALID_VISIBILITY);
};
