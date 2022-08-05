const axios = require("axios");

const run = async (input) => {
  const { COUNTRY_STATES_URL, query, page = 1, pageSize = 10 } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "POST",
      url: COUNTRY_STATES_URL,
      data: query,
    });

    return {
      ...paginate({
        data: data.data.states,
        page,
        pageSize,
      }),
    };
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error.response.data,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ COUNTRY_STATES_URL, query }) => {
  const ERRORS = {
    NO_COUNTRY_STATES_URL: "A valid COUNTRY_STATES_URL is required.",
    NO_QUERY: "A query is required.",
    NO_QUERY_COUNTRY: "A query.country is required.",
    INVALID_QUERY_COUNTRY: "The query.country must be a string.",
  };

  if (typeof COUNTRY_STATES_URL === "undefined") throw new Error(ERRORS.NO_COUNTRY_STATES_URL);
  if (typeof query === "undefined") throw new Error(ERRORS.NO_QUERY);
  if (typeof query.country === "undefined") throw new Error(ERRORS.NO_QUERY_COUNTRY);
  if (typeof query.country !== "string") throw new Error(ERRORS.INVALID_QUERY_COUNTRY);
};

/**
 * Paginates an array
 *
 * @param {Array} data - Data to paginate
 * @param {Number} page - Page number
 * @param {Number} pageSize - Page size
 *
 * @returns Paginated data
 */
const paginate = ({ data, page, pageSize }) => {
  const totalPages = Math.ceil(data.length / pageSize);

  if (page > totalPages) {
    throw new Error(`Requested page is out of scope. Last page number is ${totalPages}.`);
  }

  return {
    rows: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
    totalPages,
  };
};
