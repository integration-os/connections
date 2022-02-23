/**
 * ----------------------------------------------------------------------------------------------------
 * Confirm a Payment Intent [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_intents/confirm
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

    // off_session: false,
    // payment_method: "pm_1KIzhFSGVSOWoR3QcZaXt3Tn",
    // receipt_email: "johndoe@gmail.com",
    // setup_future_usage: "",
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
    //   carrier: "",
    //     phone: "",
    //   tracking_number: ""
    // },
    // error_on_requires_action: false,
    // mandate: "",
    // mandate_data: {
    //     customer_acceptance: {
    //         type: "online",
    //         accepted_at: 1642414593, //unix-time,
    //         offline: {},
    //         online: {
    //             ip_address: "",
    //             user_agent: ""
    //         }
    //     }
    // },
    // on_behalf_of: "",
    // payment_method_types: ["card"],
    // payment_method_data: {
    //     type: "",
    //     acss_debit: {
    //         acount_number: "",
    //         institution_number: "",
    //         transit_number: ""
    //     },
    //     afterpay_clearpay: {},
    //     alipay: {},
    //     au_becs_debit: {
    //         account_number: "",
    //         bsb_number: ""
    //     },
    //     bacs_debit: {
    //         account_number: "",
    //         sort_code: ""
    //     },
    //     bancontact: {},
    //     billing_details: {
    //         address: {
    //             city: "San Francisco",
    //             country: "US",
    //             line1: "510 Townsend St",
    //             line2: null,
    //             postal_code: "98140",
    //             state: "CA"
    //         },
    //         email: "johndoe@gmail.com",
    //         name: "John Doe",
    //         phone: "" //including extension
    //     },
    //     boleto: {
    //         tax_id: "",
    //     },
    //     eps: {
    //         bank: ""
    //     },
    //     fpx: {
    //         bank: ""
    //     },
    //     giropay: {},
    //     grabpay: {},
    //     ideal: {
    //         bank: ""
    //     },
    //     interac_present: {},
    //     klarna: {
    //         dob: {
    //             day: 22,
    //             month: 10,
    //             year: 2022
    //         }
    //     },
    //     metadata: {},
    //     oxxo: {},
    //     p24: {
    //         bank: ""
    //     },
    //     sepa_debit: {
    //         iban: ""
    //     },
    //     sofort: {
    //         country: ""
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
    //                 count: 5,
    //                 interval: "",
    //                 type: ""
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
    //         client: "",
    //         app_id: ""
    //     }
    // },
    // return_url: "",
    // use_stripe_sdk: false,
  };
};
