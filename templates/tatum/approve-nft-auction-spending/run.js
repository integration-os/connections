/**
 * ----------------------------------------------------------------------------------------------------
 * Approve NFT Token Spending for the Auction / Marketplace [Run]
 *
 * @description - Approve nft token spending for the auction / marketplace using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/ApproveNftAuctionSpending
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TATUM_API_KEY,
    TATUM_API_URL,
    chain,
    spender,
    isErc721,
    tokenId,
    contractAddress,
    fromPrivateKey,
    nonce,
    fee,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/blockchain/auction/approve`,
      headers: { "x-api-key": TATUM_API_KEY },
      data: {
        chain,
        spender,
        isErc721,
        tokenId,
        contractAddress,
        fromPrivateKey,
        ...(nonce ? { nonce } : {}),
        ...(fee ? { fee } : {}),
      },
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
const verifyInput = ({
  TATUM_API_KEY,
  TATUM_API_URL,
  chain,
  spender,
  isErc721,
  tokenId,
  contractAddress,
  fromPrivateKey,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY:
      "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL:
      "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_CHAIN:
      "A valid chain field (string) was not provided in the input.",
    INVALID_SPENDER:
      "A valid spender field (string) was not provided in the input.",
    INVALID_IS_ERC721:
      "A valid isErc721 field (boolean) was not provided in the input.",
    INVALID_TOKEN_ID:
      "A valid tokenId field (string) was not provided in the input.",
    INVALID_CONTRACT_ADDRESS:
      "A valid contractAddress field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof chain !== "string") throw new Error(ERRORS.INVALID_CHAIN);
  if (typeof spender !== "string") throw new Error(ERRORS.INVALID_SPENDER);
  if (typeof isErc721 !== "boolean") throw new Error(ERRORS.INVALID_IS_ERC721);
  if (typeof tokenId !== "string") throw new Error(ERRORS.INVALID_TOKEN_ID);
  if (typeof contractAddress !== "string")
    throw new Error(ERRORS.INVALID_CONTRACT_ADDRESS);
  if (typeof fromPrivateKey !== "string")
    throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
};
