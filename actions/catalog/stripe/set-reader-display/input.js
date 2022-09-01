const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required
    reader: "string", // Required
    type: "<string>", // Required

    // cart: {
    //     currency: "string",
    //     line_items: [{ amount: 0, description: "string", quantity: 0 }],
    //     tax: 0,
    //     total: 0
    //   },
    // expand: ["string"],
    // cartCurrency: "<string>",
    // cartLine_items0Amount: "<integer>",
    // cartLine_items0Description: "<string>",
    // cartLine_items0Quantity: "<integer>",
    // cartLine_items1Amount: "<integer>",
    // cartLine_items1Description: "<string>",
    // cartLine_items1Quantity: "<integer>",
    // cartTotal: "<integer>",
    // cartTax: "<integer>",
    // expand0: "<string>",
    // expand1: "<string>",
  };
};
