/**
 * ----------------------------------------------------------------------------------------------------
 * Create Customer [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/customers/create
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
    STRIPE_SECRET_KEY: $trigger.env.STRIPE_SECRET_KEY, // Required

    // name: "John Doe",
    // email: "johndoe@gmail.com",
    // address: {
    //   city: "San Francisco",
    //   country: "US",
    //   line1: "510 Townsend St",
    //   line2: "",
    //   postal_code: "98140",
    //   state: "CA",
    // },
    // metadata: {},
    // payment_method: "",
    // phone: null,
    // coupon: "",
    // balance: 0,
    // description: "My First Test Customer (created via Buildable's flow)",
    // invoice_prefix: "CD2D17F",
    // invoice_settings: {
    //     custom_fields: null,
    //     default_payment_method: null,
    //     footer: null,
    // },
    // next_invoice_sequence: 1,
    // preferred_locales: [],
    // promotion_code: "",
    // source: "",
    // tax: {
    //     ip_address: ""
    // },
    // shipping: {
    //   address: {
    //     city: "San Francisco",
    //     country: "US",
    //     line1: "510 Townsend St",
    //     line2: "",
    //     postal_code: "98140",
    //     state: "CA",
    //   },
    //   name: "John Doe",
    // },
    // tax_exempt: "none",
  };
};
