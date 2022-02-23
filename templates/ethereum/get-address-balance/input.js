/**
 * ----------------------------------------------------------------------------------------------------
 * Get Balance [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.ethers.io/v5/
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
    network: "mainnet", // Required - ex: rinkeby, mainnet
    address: "0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB", // Required
  };
};
