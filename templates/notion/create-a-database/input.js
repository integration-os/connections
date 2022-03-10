/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Database [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developers.notion.com/reference/create-a-database
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
    parent: { type: "page_id", page_id: "{{PAGE_ID}}" }, // Required
    properties: {
      Name: { title: {} },
      Description: { rich_text: {} },
      "In stock": { checkbox: {} },
      "Food group": {
        select: {
          options: [
            { name: "🥦Vegetable", color: "green" },
            { name: "🍎Fruit", color: "red" },
            { name: "💪Protein", color: "yellow" },
          ],
        },
      },
      Price: { number: { format: "dollar" } },
      "Last ordered": { date: {} },
      "Store availability": {
        type: "multi_select",
        multi_select: {
          options: [
            { name: "Duc Loi Market", color: "blue" },
            { name: "Rainbow Grocery", color: "gray" },
            { name: "Nijiya Market", color: "purple" },
            { name: "Gus's Community Market", color: "yellow" },
          ],
        },
      },
      "+1": { people: {} },
      Photo: { files: {} },
    }, // Required

    // title: [{ type: "text", text: { content: "Grocery List", link: null } }],
  };
};
