const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_STRIPE_SECRET_KEY: $env.BUILDABLE_STRIPE_SECRET_KEY, // Required

    // amount: "<integer>",
    // currency: "<string>",
    // customer: "<string>",
    // expand: ["string"],
    // flow: "<string>",
    // mandate: {
    //     acceptance: {
    //       date: 0,
    //       ip: "string",
    //       offline: { contact_email: "string" },
    //       online: { date: 0, ip: "string", user_agent: "string" },
    //       status: "accepted",
    //       type: "offline",
    //       user_agent: "string"
    //     },
    //     amount: 0,
    //     currency: "string",
    //     interval: "one_time",
    //     notification_method: "deprecated_none"
    //   },
    // metadata: { property1: "string", property2: "string" },
    // original_source: "<string>",
    // owner: {
    //     address: {
    //       city: "string",
    //       country: "string",
    //       line1: "string",
    //       line2: "string",
    //       postal_code: "string",
    //       state: "string"
    //     },
    //     email: "string",
    //     name: "string",
    //     phone: "string"
    //   },
    // receiver: { refund_attributes_method: "email" },
    // redirect: { return_url: "string" },
    // source_order: {
    //     items: [
    //       {
    //         amount: 0,
    //         currency: "string",
    //         description: "string",
    //         parent: "string",
    //         quantity: 0,
    //         type: "discount"
    //       }
    //     ],
    //     shipping: {
    //       address: {
    //         city: "string",
    //         country: "string",
    //         line1: "string",
    //         line2: "string",
    //         postal_code: "string",
    //         state: "string"
    //       },
    //       carrier: "string",
    //       name: "string",
    //       phone: "string",
    //       tracking_number: "string"
    //     }
    //   },
    // statement_descriptor: "<string>",
    // token: "<string>",
    // type: "<string>",
    // usage: "<string>",
    // expand0: "<string>",
    // expand1: "<string>",
    // mandateAcceptanceStatus: "<string>",
    // mandateAcceptanceDate: "<unix-time>",
    // mandateAcceptanceIp: "<string>",
    // mandateAcceptanceOfflineContact_email: "<string>",
    // mandateAcceptanceOnlineDate: "<unix-time>",
    // mandateAcceptanceOnlineIp: "<string>",
    // mandateAcceptanceOnlineUser_agent: "<string>",
    // mandateAcceptanceType: "<string>",
    // mandateAcceptanceUser_agent: "<string>",
    // mandateAmount: "<integer>",
    // mandateCurrency: "<string>",
    // mandateInterval: "<string>",
    // mandateNotification_method: "<string>",
    // ownerAddressCity: "<string>",
    // ownerAddressCountry: "<string>",
    // ownerAddressLine1: "<string>",
    // ownerAddressLine2: "<string>",
    // ownerAddressPostal_code: "<string>",
    // ownerAddressState: "<string>",
    // ownerEmail: "<string>",
    // ownerName: "<string>",
    // ownerPhone: "<string>",
    // receiverRefund_attributes_method: "<string>",
    // redirectReturn_url: "<string>",
    // source_orderItems0Amount: "<integer>",
    // source_orderItems0Currency: "<string>",
    // source_orderItems0Description: "<string>",
    // source_orderItems0Parent: "<string>",
    // source_orderItems0Quantity: "<integer>",
    // source_orderItems0Type: "<string>",
    // source_orderItems1Amount: "<integer>",
    // source_orderItems1Currency: "<string>",
    // source_orderItems1Description: "<string>",
    // source_orderItems1Parent: "<string>",
    // source_orderItems1Quantity: "<integer>",
    // source_orderItems1Type: "<string>",
    // source_orderShippingAddressLine1: "<string>",
    // source_orderShippingAddressCity: "<string>",
    // source_orderShippingAddressCountry: "<string>",
    // source_orderShippingAddressLine2: "<string>",
    // source_orderShippingAddressPostal_code: "<string>",
    // source_orderShippingAddressState: "<string>",
    // source_orderShippingCarrier: "<string>",
    // source_orderShippingName: "<string>",
    // source_orderShippingPhone: "<string>",
    // source_orderShippingTracking_number: "<string>",
  };
};
