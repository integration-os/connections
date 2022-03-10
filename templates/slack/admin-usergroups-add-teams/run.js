/**
 * ----------------------------------------------------------------------------------------------------
 * Associate One or More Default Workspaces with an Organization-Wide IDP Group. [Run]
 *
 * @description - Associate one or more default workspaces with an organization-wide idp group. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/admin.usergroups.addTeams
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { SLACK_ACCESS_TOKEN, team_ids, usergroup_id, auto_provision } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/admin.usergroups.addTeams",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ team_ids, usergroup_id, ...(auto_provision ? { auto_provision } : {}) }),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN, team_ids, usergroup_id }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_TEAM_IDS: "A valid team_ids field (string) was not provided in the input.",
    INVALID_USERGROUP_ID: "A valid usergroup_id field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
  if (typeof team_ids !== "string") throw new Error(ERRORS.INVALID_TEAM_IDS);
  if (typeof usergroup_id !== "string") throw new Error(ERRORS.INVALID_USERGROUP_ID);
};
