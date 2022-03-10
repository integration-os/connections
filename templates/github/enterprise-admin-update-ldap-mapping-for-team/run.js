/**
 * ----------------------------------------------------------------------------------------------------
 * Update LDAP Mapping for a Team [Run]
 *
 * @description - Update ldap mapping for a team using the Github API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#update-ldap-mapping-for-a-team
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
  const { GITHUB_API_TOKEN, GITHUB_API_USERNAME, team_id, ldap_dn } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: `https://api.github.com/admin/ldap/teams/${team_id}/mapping`,
      auth: { password: GITHUB_API_TOKEN, username: GITHUB_API_USERNAME },
      data: { ldap_dn },
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
  team_id,
  ldap_dn,
}) => {
  const ERRORS = {
    INVALID_GITHUB_API_TOKEN:
      "A valid GITHUB_API_TOKEN field (string) was not provided in the input.",
    INVALID_GITHUB_API_USERNAME:
      "A valid GITHUB_API_USERNAME field (string) was not provided in the input.",
    INVALID_TEAM_ID:
      "A valid team_id field (number) was not provided in the input.",
    INVALID_LDAP_DN:
      "A valid ldap_dn field (string) was not provided in the input.",
  };

  if (typeof GITHUB_API_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_TOKEN);
  if (typeof GITHUB_API_USERNAME !== "string")
    throw new Error(ERRORS.INVALID_GITHUB_API_USERNAME);
  if (typeof team_id !== "number") throw new Error(ERRORS.INVALID_TEAM_ID);
  if (typeof ldap_dn !== "string") throw new Error(ERRORS.INVALID_LDAP_DN);
};
