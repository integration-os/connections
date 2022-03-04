/**
 * ----------------------------------------------------------------------------------------------------
 * Mint Multi Token [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/MintMultiToken
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
    amount: `100000`, // Required
    contractAddress: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required
    to: `0x687422eEA2cB73B5d3e242bA5456b782919AFc85`, // Required
    tokenId: `100000`, // Required
    chain: `ETH`, // Required

    // testnetType: `ethereum-ropsten`,
    // data: `0x1234`,
    // index: 0,
    // signatureId: `26d3883e-4e17-48b3-a0ee-09a3e484ac83`,
    // nonce: 0,
    // fee: {"gasLimit":"40000","gasPrice":"20"},
  };
};
