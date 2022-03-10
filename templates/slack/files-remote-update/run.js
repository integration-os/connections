/**
 * ----------------------------------------------------------------------------------------------------
 * Updates an Existing Remote File. [Run]
 *
 * @description - Updates an existing remote file. using the Slack API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://api.slack.com/methods/files.remote.update
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    SLACK_ACCESS_TOKEN,
    external_id,
    external_url,
    file,
    filetype,
    indexable_file_contents,
    preview_image,
    title,
    token,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://slack.com/api/files.remote.update",
      headers: {
        Authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(external_id ? { external_id } : {}),
        ...(external_url ? { external_url } : {}),
        ...(file ? { file } : {}),
        ...(filetype ? { filetype } : {}),
        ...(indexable_file_contents ? { indexable_file_contents } : {}),
        ...(preview_image ? { preview_image } : {}),
        ...(title ? { title } : {}),
        ...(token ? { token } : {}),
      }),
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
const verifyInput = ({ SLACK_ACCESS_TOKEN }) => {
  const ERRORS = {
    INVALID_SLACK_ACCESS_TOKEN:
      "A valid SLACK_ACCESS_TOKEN field (string) was not provided in the input.",
  };

  if (typeof SLACK_ACCESS_TOKEN !== "string") throw new Error(ERRORS.INVALID_SLACK_ACCESS_TOKEN);
};
