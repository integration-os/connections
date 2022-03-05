/**
 * ----------------------------------------------------------------------------------------------------
 * Send XRP From Address to Address [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/XrpTransferBlockchain
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
    fromSecret: `snSFTHdvSYQKKkYntvEt8cnmZuPJB`, // Required
    amount: `10000`, // Required
    to: `rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV`, // Required
    fromAccount: `rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV`, // Required

    // fee: `10000`,
    // sourceTag: 12355,
    // destinationTag: 12355,
  };
};
