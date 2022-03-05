/**
 * ----------------------------------------------------------------------------------------------------
 * Send KCS or Erc20 From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/KcsTransfer
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
    senderAccountId: `5e68c66581f2ee32bc354087`, // Required
    fromPrivateKey: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required
    amount: `100000`, // Required
    address: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required

    // nonce: 0,
    // compliant: false,
    // paymentId: `1234`,
    // senderNote: `Sender note`,
    // gasLimit: `40000`,
    // gasPrice: `20`,
  };
};
