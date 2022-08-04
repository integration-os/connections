const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    COUNTRY_STATES_URL: "https://countriesnow.space/api/v0.1/countries/states", // Required

    query: {
      country: "United States", // Required
    },
    page: 1,
    pageSize: 10,
  };
};
