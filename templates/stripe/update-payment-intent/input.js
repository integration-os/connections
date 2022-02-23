/**
 * ----------------------------------------------------------------------------------------------------
 * Update Payment Intent [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_intents/update
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
    paymentIntentId: "pi_3KJDnXSGVSOWoR3Q1JP8HUt7", // Required

    // amount: 1000,
    // currency: "usd",
    // customer: "",
    // description: "Update paymentIntent (updated via Buildable's flow)",
    // metadata: {},
    // payment_method: "",
    // payment_method_types: ["card"],
    // receipt_email: "",
    // setup_future_usage: "",
    // shipping: {
    //     address: { // Required
    //         city: "San Francisco",
    //         country: "US",
    //         line1: "510 Townsend St",
    //         line2: "",
    //         postal_code: "98140",
    //         state: "CA"
    //     },
    //     name: "John Doe", // Required
    //     carrier: "",
    //     phone: "",
    //     tracking_number: ""
    // },
    // statement_descriptor: "",
    // statement_descriptor_suffix: "",
    // application_fee_amount: 20,
    // payment_method_data: {
    //     type: "", // Required
    //     acss_debit: {
    //         acount_number: "", // Required
    //         institution_number: "", // Required
    //         transit_number: "" // Required
    //     },
    //     afterpay_clearpay: {},
    //     alipay: {},
    //     au_becs_debit: {
    //         account_number: "", // Required
    //         bsb_number: "" // Required
    //     },
    //     bacs_debit: {
    //         account_number: "",
    //         sort_code: ""
    //     },
    //     bancontact: {},
    //     billing_details: {
    //         address: {
    //             city: "New York",
    //             country: "US",
    //             line1: null,
    //             line2: null,
    //             postal_code: null,
    //             state: null
    //         },
    //         email: "johndoe@gmail.com",
    //         name: "John Doe",
    //         phone: "" //including extension
    //     },
    //     boleto: {
    //         tax_id: "", // Required
    //     },
    //     eps: {
    //         bank: ""
    //     },
    //     fpx: {
    //         bank: "" // Required
    //     },
    //     giropay: {},
    //     grabpay: {},
    //     ideal: {
    //         bank: ""
    //     },
    //     interac_present: {},
    //     klarna: {
    //         dob: {
    //             day: 22, // Required
    //             month: 10, // Required
    //             year: 2022 // Required
    //         }
    //     },
    //     metadata: {},
    //     oxxo: {},
    //     p24: {
    //         bank: ""
    //     },
    //     sepa_debit: {
    //         iban: "" // Required
    //     },
    //     sofort: {
    //         country: "" // Required
    //     },
    //     wechat_pay: {}
    // },
    // payment_method_options: {
    //     acss_debit: {
    //         mandate_options: {
    //             custom_mandate_url: "",
    //             interval_description: "",
    //             payment_schedule: "",
    //             transaction_type: ""
    //         },
    //         verification_method: ""
    //     },
    //     afterpay_clearpay: {
    //         reference: ""
    //     },
    //     alipay: {},
    //     au_becs_debit: {},
    //     bancontact: {
    //         preferred_language: ""
    //     },
    //     boleto: {
    //         expires_after_days: 2
    //     },
    //     card: {
    //         cvc_token: "",
    //         installments: {
    //             enabled: false,
    //             plan: {
    //                 count: 5, // Required
    //                 interval: "", // Required
    //                 type: "" // Required
    //             }
    //         },
    //         network: "",
    //         request_three_d_secure: "",
    //         setup_future_usage: ""
    //     },
    //     card_present: {},
    //     eps: {},
    //     fpx: {},
    //     giropay: {},
    //     grabpay: {},
    //     ideal: {},
    //     interac_present: {},
    //     klarna: {
    //         preferred_locale: ""
    //     },
    //     oxxo: {
    //         expires_after_days: 2
    //     },
    //     p24: {
    //         tos_shown_and_accepted: false
    //     },
    //     sepa_debit: {
    //         mandate_options: {},
    //     },
    //     sofort: {
    //         preferred_language: ""
    //     },
    //     wechat_pay: {
    //         client: "", // Required
    //         app_id: ""
    //     }
    // },
    // transfer_data: {
    //     amount: 20
    // },
    // transfer_group: ""
  };
};
