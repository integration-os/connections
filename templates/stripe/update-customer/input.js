/**
 * ----------------------------------------------------------------------------------------------------
 * Update Customer [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/customers/update
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
    customerId: "cus_Kxi8zNQqi0pDve", // Required

    // address: {
    //     city: "",
    //     country: "",
    //     line1: "",
    //     line2: "",
    //     postal_code: "",
    //     state: ""
    // },
    // description: "Update Customer (updated via Buildable's flow)",
    // email: "johndoe@gmail.com",
    // name: "John Doe",
    // phone: "",
    // shipping: {
    //     address: {
    //         city: "",
    //         country: "",
    //         line1: "",
    //         line2: "",
    //         postal_code: "",
    //         state: ""
    //     },
    //     name: "",
    //     phone: ""
    // },
    // metadata: {},
    // balance: 1000,
    // coupon: "",
    // default_source: "",
    // invoice_prefix: "",
    // invoice_settings: {
    // custom_fields: {
    //     name: "",
    //     value: ""
    // },
    // default_payment_method: "pm_1KHw6TSGVSOWoR3QiZXv225v",
    // footer: ""
    // },
    // next_invoice_sequence: 1,
    // preferred_locales: "",
    // promotion_code: "",
    // source: "",
    // tax: {
    //     ip_address: ""
    // },
    // tax_exempt: ""
  };
};
