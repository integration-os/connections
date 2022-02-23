/**
 * ----------------------------------------------------------------------------------------------------
 * Get a Webhook Delivery for an Organization Webhook [Run]
 *
 * @description - Get a Webhook Delivery for an Organization Webhook using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/orgs#get-a-webhook-delivery-for-an-organization-webhook
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, org, hook_id, delivery_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/orgs/${org}/hooks/${hook_id}/deliveries/${delivery_id}`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
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
const verifyInput = ({ org, hook_id, delivery_id }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_HOOK_ID: "A valid hook_id field (number) was not provided in the input.",
    INVALID_DELIVERY_ID: "A valid delivery_id field (number) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof hook_id !== "number") throw new Error(ERRORS.INVALID_HOOK_ID);
  if (typeof delivery_id !== "number") throw new Error(ERRORS.INVALID_DELIVERY_ID);
};
