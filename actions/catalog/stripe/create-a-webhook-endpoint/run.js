const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    enabled_events,
    url,
    api_version,
    connect,
    description,
    expand,
    metadata,
    enabled_events0,
    enabled_events1,
    expand0,
    expand1,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/webhook_endpoints",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        enabled_events,
        url,
        ...(api_version ? { api_version } : {}),
        ...(connect ? { connect } : {}),
        ...(description ? { description } : {}),
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(enabled_events0 ? { "enabled_events[0]": enabled_events0 } : {}),
        ...(enabled_events1 ? { "enabled_events[1]": enabled_events1 } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, enabled_events, url }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_ENABLED_EVENTS: "A valid enabled_events field (object) was not provided in the input.",
    INVALID_URL: "A valid url field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof enabled_events !== "object") throw new Error(ERRORS.INVALID_ENABLED_EVENTS);
  if (typeof url !== "string") throw new Error(ERRORS.INVALID_URL);
};
