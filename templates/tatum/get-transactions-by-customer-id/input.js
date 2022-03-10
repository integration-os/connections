/**
 * ----------------------------------------------------------------------------------------------------
 * Find Transactions for a Customer Across All of the Customer's Accounts. [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/getTransactionsByCustomerId
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
    TATUM_API_KEY: $trigger.env.TATUM_API_KEY, // Required
    TATUM_API_URL: $trigger.env.TATUM_API_URL, // Required
    id: "5e6be8e9e6aa436299950c41", // Required

    // pageSize: 10,
    // offset: 0,
    // count: true,
    // account: "5e6be8e9e6aa436299950c41",
    // counterAccount: "5e6be8e9e6aa436299950c41",
    // currency: "BTC",
    // from: 1571833231000,
    // to: 1571833231000,
    // amount: [{ op: "gte", value: "1.5" }],
    // currencies: ["BTC"],
    // transactionType: "FAILED",
    // transactionTypes: ["CREDIT_PAYMENT"],
    // opType: "PAYMENT",
    // transactionCode: "1_01_EXTERNAL_CODE",
    // paymentId: "65426",
    // recipientNote: "65426",
    // senderNote: "65426",
  };
};
