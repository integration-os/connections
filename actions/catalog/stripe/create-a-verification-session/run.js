const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    type,
    expand,
    metadata,
    options,
    return_url,
    expand0,
    expand1,
    optionsDocumentAllowed_types0,
    optionsDocumentAllowed_types1,
    optionsDocumentRequire_id_number,
    optionsDocumentRequire_live_capture,
    optionsDocumentRequire_matching_selfie,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/identity/verification_sessions",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        type,
        ...(expand ? { expand } : {}),
        ...(metadata ? { metadata } : {}),
        ...(options ? { options } : {}),
        ...(return_url ? { return_url } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(optionsDocumentAllowed_types0
          ? { "options[document][allowed_types][0]": optionsDocumentAllowed_types0 }
          : {}),
        ...(optionsDocumentAllowed_types1
          ? { "options[document][allowed_types][1]": optionsDocumentAllowed_types1 }
          : {}),
        ...(optionsDocumentRequire_id_number
          ? { "options[document][require_id_number]": optionsDocumentRequire_id_number }
          : {}),
        ...(optionsDocumentRequire_live_capture
          ? { "options[document][require_live_capture]": optionsDocumentRequire_live_capture }
          : {}),
        ...(optionsDocumentRequire_matching_selfie
          ? { "options[document][require_matching_selfie]": optionsDocumentRequire_matching_selfie }
          : {}),
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, type }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
};
