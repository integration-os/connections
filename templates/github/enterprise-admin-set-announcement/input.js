/**
 * ----------------------------------------------------------------------------------------------------
 * Set the Global Announcement Banner [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/en/enterprise-server@3.3/rest/reference/enterprise-admin#set-the-global-announcement-banner
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    GITHUB_API_TOKEN: $trigger.env.GITHUB_API_TOKEN, // Required
    GITHUB_API_USERNAME: $trigger.env.GITHUB_API_USERNAME, // Required
    announcement: "Very **important** announcement about _nothing_.", // Required

    // expires_at: "2021-01-01T00:00:00.000-07:00",
  };
};
