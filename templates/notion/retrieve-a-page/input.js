/**
 * ----------------------------------------------------------------------------------------------------
 * Retrieve a Page [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.notion.com/reference/intro
 *
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
    notionVersion: "2022-02-22", // Required
    NOTION_API_TOKEN: $trigger.env.NOTION_API_TOKEN, // Required
    id: "string", // Required
  };
};
