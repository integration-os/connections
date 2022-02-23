/**
 * ----------------------------------------------------------------------------------------------------
 * Create Payment Intent [Input]
 *
 * It's recommended you create exactly one Payment Intent
 * for each order or customer session
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://stripe.com/docs/api/payment_intents/create
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
    amount: 1000, // Required
    currency: "usd", // Required

    confirm: true,
    customer: "cus_Kywq0LD855HPNr",
    payment_method: "pm_1KIzhFSGVSOWoR3QcZaXt3Tn",
    // description: "",
    // metadata: {
    //   order_id: "123456789"
    // },
    // off_session: false,
    // payment_method_types: ["card"],
    // receipt_email: "johndoe@gmail.com",
    // setup_future_usage: "",
    // shipping: {
    //   address: {
    //     city: "San Francisco",
    //     country: "US",
    //     line1: "510 Townsend St",
    //     line2: "",
    //     postal_code: "98140",
    //     state: "CA"
    //   },
    //   name: "John Doe",
    //   carrier: "",
    //   phone: "",
    //   tracking_number: ""
    // },
    // statement_descriptor: "",
    // statement_descriptor_suffix: "",
    // application_fee_amount: 50,
    // automatic_payment_methods: {
    //     enabled: false
    // },
    // capture_method: "",
    // confirmation_method: "automatic",
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
    // transfer_data: {
    //     destination: "",
    //     amount: 50
    // },
    // transfer_group: """,
    // use_stripe_sdk: false
  };
};
