/**
 * ----------------------------------------------------------------------------------------------------
 * List Records [Run]
 *
 * @description - List records from a table using the Airtable API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://airtable.com/api
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node's executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    AIRTABLE_API_KEY,
    endpoint,
    AIRTABLE_BASE_ID,
    tableName,
    pageSize = 10,
    page = 1,
    fields,
    sort,
    filter,
  } = input;

  verifyInput(input);

  const url = getUrl({ endpoint, AIRTABLE_BASE_ID, tableName, pageSize, fields, sort, filter });

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const records = data?.records || [];

    return {
      ...paginate(records, page, pageSize),
    };
  } catch (error) {
    const code = getStatusCodeFromErrorMessage(error?.message);
    const messageData = getErrorMessageFromStatusCode(code);

    return {
      failed: true,
      message: messageData?.message || error?.message,
      data: {
        type: messageData?.type,
        statusCode: code || 500,
        ...error.config,
      },
    };
  }
};

const getSortParams = (sort) => {
  if (!sort) return "";

  const hasSign = sort[0] === "-";

  const sortField = hasSign ? sort.substr(1) : sort;
  const sortDirection = hasSign ? "desc" : "asc";

  const sortDirectionParam = `sort[0][direction]=${sortDirection}`;
  const sortFieldParam = `sort[0][field]=${sortField}`;

  return `${sortFieldParam}&${sortDirectionParam}`;
};

const getFieldsParams = (fields) => fields.reduce((acc, cur) => `${acc}fields[]=${cur}&`, "");

const getUrl = ({ endpoint, AIRTABLE_BASE_ID, tableName, pageSize, fields, sort, filter }) => {
  let url = `${endpoint}/${AIRTABLE_BASE_ID}/${tableName}`;

  const params = [];

  if (fields) {
    params.push(getFieldsParams(fields));
  }
  if (sort) {
    params.push(getSortParams(sort));
  }
  if (filter) {
    params.push(`filterByFormula=${filter}`);
  }
  if (params.length > 0) {
    url = `${url}?${params.join("&")}`;
  }

  return encodeURI(url);
};

const paginate = (data, page, pageSize) => {
  const totalPages = Math.ceil(data.length / pageSize);

  if (page > totalPages) throw new Error(`Requested page is out of scope. Last page number is ${totalPages}.`);

  return {
    rows: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
    totalPages,
  };
};

const verifyInput = ({ AIRTABLE_API_KEY, AIRTABLE_BASE_ID, endpoint, tableName }) => {
  const ERRORS = {
    INVALID_AIRTABLE_API_KEY: `A valid AIRTABLE_API_KEY field (string) was not provided in the input. 
                                   You can add one to your environment variables at 
                                   https://app.buildable.dev/settings/environment-variables.`,

    INVALID_ENDPOINT: "A valid endpoint field (string) was not provided in the input.",
    INVALID_AIRTABLE_BASE_ID:
      "A valid AIRTABLE_BASE_ID field (string) was not provided in the input.",
    INVALID_TABLE_NAME: "A valid tableName field (string) was not provided in the input.",
  };

  if (typeof AIRTABLE_API_KEY !== "string") throw new Error(ERRORS.INVALID_AIRTABLE_API_KEY);
  if (typeof AIRTABLE_BASE_ID !== "string") throw new Error(ERRORS.INVALID_AIRTABLE_BASE_ID);
  if (typeof tableName !== "string") throw new Error(ERRORS.INVALID_TABLE_NAME);
  if (typeof endpoint !== "string") throw new Error(ERRORS.INVALID_ENDPOINT);
};

const getStatusCodeFromErrorMessage = (message) => {
  const statusCodes = [400, 401, 402, 403, 404, 413, 422, 500, 502, 503];
  return statusCodes.find((code) => message.includes(code)) || "";
};

const getErrorMessageFromStatusCode = (statusCode) => {
  const errorMessages = {
    400: {
      message: "The request encoding is invalid; the request can't be parsed as a valid JSON.",
      type: "Bad Request",
    },
    401: {
      message: "Accessing a protected resource without authorization or with invalid credentials.",
      type: "Unauthorized",
    },
    402: {
      message:
        "The account associated with the API key making requests hits a quota that can be increased by upgrading the Airtable account plan.",
      type: "Payment Required",
    },
    403: {
      message:
        "Accessing a protected resource with API credentials that don't have access to that resource.",
      type: "Forbidden",
    },
    404: {
      message:
        "Route or resource is not found. This error is returned when the request hits an undefined route, or if the resource doesn't exist (e.g. has been deleted).",
      type: "Not Found",
    },
    413: {
      message:
        "The request exceeded the maximum allowed payload size. You shouldn't encounter this under normal use.",
      type: "Request Entity Too Large",
    },
    422: {
      message:
        "The request data is invalid. This includes most of the base-specific validations. You will receive a detailed error message and code pointing to the exact issue.",
      type: "Invalid Request",
    },
    500: {
      message: "The server encountered an unexpected condition.",
      type: "Internal Server Error",
    },
    502: {
      message:
        "Airtable's servers are restarting or an unexpected outage is in progress. You should generally not receive this error, and requests are safe to retry.",
      type: "Bad Gateway",
    },
    503: {
      message:
        "The server could not process your request in time. The server could be temporarily unavailable, or it could have timed out processing your request. You should retry the request with backoffs.",
      type: "Service Unavailable",
    },
  };

  if (errorMessages[statusCode]) {
    return errorMessages[statusCode];
  }
};
