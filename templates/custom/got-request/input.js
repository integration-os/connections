/**
 * ----------------------------------------------------------------------------------------------------
 * Got Request [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://www.npmjs.com/package/got
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
    method: "GET", // Required
    url: "https://api.example.com", // Required

    responseType: "json",

    // json: {
    //   title: "My First Post",
    //   body: "This is my first post!",
    //   category: "personal",
    // },
    // searchParams: {
    //   hello: "world",
    //   foo: 123
    // },
    // prefixUrl: "https://some-domain.com/api",
    // headers: {
    //   "Content-type": "application/json"
    // },
    // resolveBodyOnly: true,
    // isStream: false,
    // body: "Hello, world!"
    // form: {
    //   hello: "world"
    // },
    // parseJson: (text) => JSON.parse(text),
    // stringifyJson: (json) => JSON.stringify(json),
    // allowGetBody: false,
    // timeout: 5000,
    // encoding: "base64",
    // context: {},
    // ignoreInvalidCookies: false,
    // followRedirect: true,
    // maxRedirects: 10,
    // decompress: true,
    // http2: false,
    // agent: {},
    // username: "",
    // password: "",
    // pagination: {},
    // setHost: true,
  };
};
