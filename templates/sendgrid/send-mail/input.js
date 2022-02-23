/**
 * ----------------------------------------------------------------------------------------------------
 * Send Mail [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.sendgrid.com/api-reference/mail-send/mail-send
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
    SENDGRID_API_KEY: $trigger.env.SENDGRID_API_KEY, // Required

    to: {
      email: "example-recipient@domain.com", // Required
      name: "Recipient Name",
    },
    from: {
      email: "your-verified-email@domain.com", // Required
      name: "Your Name",
    },
    subject: "Example email sent from Buildable!", // Required
    content: [
      {
        type: "text/html", // Required

        // Required
        value: `
        <p>
        Hey there,
        <br /><br />
        This email was sent from a <strong><a href="https://docs.buildable.dev/core-products/flows">Buildable Flow</a></strong> 
        using <strong><a href="https://docs.sendgrid.com/api-reference/mail-send/mail-send">Sendgrid's v3 Web API</a></strong>!
        <br /><br />
        <i>Keep building ⚡️</i>
        </p>
      `,
      },
    ],

    // personalizations: [],
    // reply_to: {
    //   email: "your-verified-email@domain.com",
    //   name: "Your Name"
    // },
    // reply_to_list: [
    //     {
    //         email: "david@domain.com",
    //         name: "David Richter"
    //     },
    //     {
    //         email: "maria@domain.com",
    //         name: "Maria Shumate"
    //     }
    // ],
    // attachments: [
    //     {
    //         "content": "",
    //         "filename": "",
    //         "type": "",
    //         "disposition": ""
    //     }
    // ],
    // template_id: "",
    // dynamic_template_data: {},
    // headers: {
    //   "X-CustomHeader": "Custom header value",
    // },
    // categories: ["Transactional", "My Category"],
    // custom_args: "",
    // send_at: new Date().getTime(),
    // batch_id: "",
    // asm: {
    //     group_id: 1,
    //     groups_to_display: [1]
    // },
    // ip_pool_name: "",
    // mail_settings: {
    //     bypass_list_management: {
    //         enable: true
    //     },
    //     bypass_spam_management: {
    //         enable: true
    //     },
    //     bypass_bounce_management: {
    //         enable: true
    //     },
    //     bypass_unsubscribe_management: {
    //         enable: true
    //     }
    // },
    // footer: {
    //   enable: true,
    //   text: "Buildable Technologies Inc.",
    //   html: ""
    // },
    // sandbox_mode: {
    //     enable: true
    // },
    // tracking_settings: {
    //     click_tracking: {
    //         enable: true,
    //         enable_text: true
    //     },
    //     open_tracking: {
    //         enable: true,
    //         substitution_tag: ""
    //     },
    //     subscription_tracking: {
    //         enable: true,
    //         text: "",
    //         html: "",
    //         substitution_tag: ""
    //     },
    //     ganalytics: {
    //         enable: true,
    //         utm_source: "",
    //         utm_medium: "",
    //         utm_term: "",
    //         utm_content: "",
    //         utm_campaign: ""
    //     }
    // }
  };
};
