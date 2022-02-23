/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Payment Method [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_methods/create
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
    type: "card", // Required
    card: {
      number: "4242424242424242",
      exp_month: 1,
      exp_year: 2023,
      cvc: "314",
    },

    // billing_details: {
    //   address: {
    //     city: "San Francisco",
    //     country: "US",
    //     line1: "510 Townsend St",
    //     line2: "",
    //     postal_code: "98140",
    //     state: "CA",
    //   },
    //   email: "johndoe@gmail.com",
    //   name: "John Doe",
    //   phone: "",
    // },
    // acss_debit: {
    //     account_number: "",
    //     institution_number: "",
    //     transit_number: ""
    // },
    // afterpay_clearpay: {},
    // alipay: {},
    // au_becs_debit: {
    //     account_number: "",
    //     bsb_number: ""
    // },
    // bacs_debit: {
    //     account_number: "",
    //     sort_code: ""
    // },
    // boleto: {
    //     tax_id: ""
    // },
    // bancontact: {},
    // eps: {
    //     bank: ""
    // },
    // fpx: {
    //     bank: ""
    // },
    // giropay: {},
    // grabpay: {},
    // ideal: {
    //     bank: ""
    // },
    // interac_present: {},
    // klarna: {
    //     dob: {
    //         day: 22,
    //         month: 01,
    //         year: 2022
    //     }
    // },
    // oxxo: {},
    // p24: {
    //     bank: ""
    // },
    // sepa_debit: {
    //     iban: ""
    // },
    // sofort: {
    //     country: ""
    // },
    // wechat_pay: {},
    // metadata: {
    //     order_id: "123456789"
    // }
  };
};
