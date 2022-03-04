/**
 * ----------------------------------------------------------------------------------------------------
 * Send ADA From Tatum Ledger to Blockchain [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/AdaTransferOffchain
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
    amount: `0.001`, // Required
    address: `mpTwPdF8up9kidgcAStriUPwRdnE9MRAg7`, // Required
    senderAccountId: `5e68c66581f2ee32bc354087`, // Required

    // compliant: false,
    // fee: `0.5`,
    // keyPair: [{"address":"stringstringstringstringstring","privateKey":"7808a501e1bbc9926ac8ac6981e47cb0401288ae331a1f2333d1bed46c5b3051b5f875c39477b05bc3a43a3800b763f616ae3646f21df0ab5d95db944e71f5cfa8082d5c4e6241d49b17b2b6173f01bb3fd03be012cc8908ceea9e559e33e4fc"}],
    // attr: `string`,
    // mnemonic: `urge pulp usage sister evidence arrest palm math please chief egg abuse`,
    // signatureId: `26d3883e-4e17-48b3-a0ee-09a3e484ac83`,
    // xpub: `41253768cd7c5831988e580cfc7eeecaa78bf52a1ede2bd2f245406605adfbadd5911ab567bc3dc7713e29c2c14bb898b24bb1f01a4992605343ad14703037b9`,
    // paymentId: `1234`,
    // senderNote: `Sender note`,
  };
};
