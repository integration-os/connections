const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    currency,
    line_items,
    automatic_tax,
    billing_details,
    customer,
    description,
    discounts,
    expand,
    ip_address,
    metadata,
    payment,
    shipping_cost,
    shipping_details,
    tax_details,
    line_items0Description,
    line_items0Discounts0Coupon,
    line_items0Discounts0Discount,
    line_items0Discounts1Coupon,
    line_items0Discounts1Discount,
    line_items0Price,
    line_items0Price_dataCurrency,
    line_items0Price_dataProduct,
    line_items0Price_dataTax_behavior,
    line_items0Price_dataUnit_amount,
    line_items0Price_dataUnit_amount_decimal,
    line_items0Product,
    line_items0Product_dataId,
    line_items0Product_dataName,
    line_items0Product_dataDescription,
    line_items0Product_dataImages0,
    line_items0Product_dataImages1,
    line_items0Product_dataMetadata,
    line_items0Product_dataPackage_dimensionsHeight,
    line_items0Product_dataPackage_dimensionsLength,
    line_items0Product_dataPackage_dimensionsWeight,
    line_items0Product_dataPackage_dimensionsWidth,
    line_items0Product_dataShippable,
    line_items0Product_dataTax_code,
    line_items0Product_dataUrl,
    line_items0Quantity,
    line_items0Tax_rates0,
    line_items0Tax_rates1,
    line_items1Description,
    line_items1Discounts0Coupon,
    line_items1Discounts0Discount,
    line_items1Discounts1Coupon,
    line_items1Discounts1Discount,
    line_items1Price,
    line_items1Price_dataCurrency,
    line_items1Price_dataProduct,
    line_items1Price_dataTax_behavior,
    line_items1Price_dataUnit_amount,
    line_items1Price_dataUnit_amount_decimal,
    line_items1Product,
    line_items1Product_dataId,
    line_items1Product_dataName,
    line_items1Product_dataDescription,
    line_items1Product_dataImages0,
    line_items1Product_dataImages1,
    line_items1Product_dataMetadata,
    line_items1Product_dataPackage_dimensionsHeight,
    line_items1Product_dataPackage_dimensionsLength,
    line_items1Product_dataPackage_dimensionsWeight,
    line_items1Product_dataPackage_dimensionsWidth,
    line_items1Product_dataShippable,
    line_items1Product_dataTax_code,
    line_items1Product_dataUrl,
    line_items1Quantity,
    line_items1Tax_rates0,
    line_items1Tax_rates1,
    automatic_taxEnabled,
    billing_detailsAddressCity,
    billing_detailsAddressCountry,
    billing_detailsAddressLine1,
    billing_detailsAddressLine2,
    billing_detailsAddressPostal_code,
    billing_detailsAddressState,
    billing_detailsEmail,
    billing_detailsName,
    billing_detailsPhone,
    discounts0Coupon,
    discounts0Discount,
    discounts0Promotion_code,
    discounts1Coupon,
    discounts1Discount,
    discounts1Promotion_code,
    expand0,
    expand1,
    paymentSettingsApplication_fee_amount,
    paymentSettingsPayment_method_optionsAcss_debitMandate_optionsCustom_mandate_url,
    paymentSettingsPayment_method_optionsAcss_debitMandate_optionsInterval_description,
    paymentSettingsPayment_method_optionsAcss_debitMandate_optionsPayment_schedule,
    paymentSettingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type,
    paymentSettingsPayment_method_optionsAcss_debitSetup_future_usage,
    paymentSettingsPayment_method_optionsAcss_debitVerification_method,
    paymentSettingsPayment_method_optionsAfterpay_clearpayCapture_method,
    paymentSettingsPayment_method_optionsAfterpay_clearpayReference,
    paymentSettingsPayment_method_optionsAfterpay_clearpaySetup_future_usage,
    paymentSettingsPayment_method_optionsAlipaySetup_future_usage,
    paymentSettingsPayment_method_optionsBancontactPreferred_language,
    paymentSettingsPayment_method_optionsBancontactSetup_future_usage,
    paymentSettingsPayment_method_optionsCardCapture_method,
    paymentSettingsPayment_method_optionsCardSetup_future_usage,
    paymentSettingsPayment_method_optionsCustomer_balanceBank_transferType,
    paymentSettingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
    paymentSettingsPayment_method_optionsCustomer_balanceBank_transferRequested_address_types0,
    paymentSettingsPayment_method_optionsCustomer_balanceBank_transferRequested_address_types1,
    paymentSettingsPayment_method_optionsCustomer_balanceFunding_type,
    paymentSettingsPayment_method_optionsCustomer_balanceSetup_future_usage,
    paymentSettingsPayment_method_optionsIdealSetup_future_usage,
    paymentSettingsPayment_method_optionsKlarnaCapture_method,
    paymentSettingsPayment_method_optionsKlarnaPreferred_locale,
    paymentSettingsPayment_method_optionsKlarnaSetup_future_usage,
    paymentSettingsPayment_method_optionsLinkCapture_method,
    paymentSettingsPayment_method_optionsLinkPersistent_token,
    paymentSettingsPayment_method_optionsLinkSetup_future_usage,
    paymentSettingsPayment_method_optionsOxxoExpires_after_days,
    paymentSettingsPayment_method_optionsOxxoSetup_future_usage,
    paymentSettingsPayment_method_optionsP24Setup_future_usage,
    paymentSettingsPayment_method_optionsP24Tos_shown_and_accepted,
    paymentSettingsPayment_method_optionsSepa_debitSetup_future_usage,
    paymentSettingsPayment_method_optionsSofortPreferred_language,
    paymentSettingsPayment_method_optionsSofortSetup_future_usage,
    paymentSettingsPayment_method_optionsWechat_payClient,
    paymentSettingsPayment_method_optionsWechat_payApp_id,
    paymentSettingsPayment_method_optionsWechat_paySetup_future_usage,
    paymentSettingsPayment_method_types0,
    paymentSettingsPayment_method_types1,
    paymentSettingsReturn_url,
    paymentSettingsStatement_descriptor,
    paymentSettingsStatement_descriptor_suffix,
    paymentSettingsTransfer_dataDestination,
    paymentSettingsTransfer_dataAmount,
    shipping_costShipping_rate,
    shipping_costShipping_rate_dataDisplay_name,
    shipping_costShipping_rate_dataDelivery_estimateMaximumUnit,
    shipping_costShipping_rate_dataDelivery_estimateMaximumValue,
    shipping_costShipping_rate_dataDelivery_estimateMinimumUnit,
    shipping_costShipping_rate_dataDelivery_estimateMinimumValue,
    shipping_costShipping_rate_dataFixed_amountAmount,
    shipping_costShipping_rate_dataFixed_amountCurrency,
    shipping_costShipping_rate_dataFixed_amountCurrency_options,
    shipping_costShipping_rate_dataMetadata,
    shipping_costShipping_rate_dataTax_behavior,
    shipping_costShipping_rate_dataTax_code,
    shipping_costShipping_rate_dataType,
    shipping_detailsAddressCity,
    shipping_detailsAddressCountry,
    shipping_detailsAddressLine1,
    shipping_detailsAddressLine2,
    shipping_detailsAddressPostal_code,
    shipping_detailsAddressState,
    shipping_detailsName,
    shipping_detailsPhone,
    tax_detailsTax_exempt,
    tax_detailsTax_ids0Type,
    tax_detailsTax_ids0Value,
    tax_detailsTax_ids1Type,
    tax_detailsTax_ids1Value,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/orders",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        currency,
        line_items,
        ...(automatic_tax ? { automatic_tax } : {}),
        ...(billing_details ? { billing_details } : {}),
        ...(customer ? { customer } : {}),
        ...(description ? { description } : {}),
        ...(discounts ? { discounts } : {}),
        ...(expand ? { expand } : {}),
        ...(ip_address ? { ip_address } : {}),
        ...(metadata ? { metadata } : {}),
        ...(payment ? { payment } : {}),
        ...(shipping_cost ? { shipping_cost } : {}),
        ...(shipping_details ? { shipping_details } : {}),
        ...(tax_details ? { tax_details } : {}),
        ...(line_items0Description ? { "line_items[0][description]": line_items0Description } : {}),
        ...(line_items0Discounts0Coupon
          ? { "line_items[0][discounts][0][coupon]": line_items0Discounts0Coupon }
          : {}),
        ...(line_items0Discounts0Discount
          ? { "line_items[0][discounts][0][discount]": line_items0Discounts0Discount }
          : {}),
        ...(line_items0Discounts1Coupon
          ? { "line_items[0][discounts][1][coupon]": line_items0Discounts1Coupon }
          : {}),
        ...(line_items0Discounts1Discount
          ? { "line_items[0][discounts][1][discount]": line_items0Discounts1Discount }
          : {}),
        ...(line_items0Price ? { "line_items[0][price]": line_items0Price } : {}),
        ...(line_items0Price_dataCurrency
          ? { "line_items[0][price_data][currency]": line_items0Price_dataCurrency }
          : {}),
        ...(line_items0Price_dataProduct
          ? { "line_items[0][price_data][product]": line_items0Price_dataProduct }
          : {}),
        ...(line_items0Price_dataTax_behavior
          ? { "line_items[0][price_data][tax_behavior]": line_items0Price_dataTax_behavior }
          : {}),
        ...(line_items0Price_dataUnit_amount
          ? { "line_items[0][price_data][unit_amount]": line_items0Price_dataUnit_amount }
          : {}),
        ...(line_items0Price_dataUnit_amount_decimal
          ? {
              "line_items[0][price_data][unit_amount_decimal]":
                line_items0Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(line_items0Product ? { "line_items[0][product]": line_items0Product } : {}),
        ...(line_items0Product_dataId
          ? { "line_items[0][product_data][id]": line_items0Product_dataId }
          : {}),
        ...(line_items0Product_dataName
          ? { "line_items[0][product_data][name]": line_items0Product_dataName }
          : {}),
        ...(line_items0Product_dataDescription
          ? { "line_items[0][product_data][description]": line_items0Product_dataDescription }
          : {}),
        ...(line_items0Product_dataImages0
          ? { "line_items[0][product_data][images][0]": line_items0Product_dataImages0 }
          : {}),
        ...(line_items0Product_dataImages1
          ? { "line_items[0][product_data][images][1]": line_items0Product_dataImages1 }
          : {}),
        ...(line_items0Product_dataMetadata
          ? { "line_items[0][product_data][metadata]": line_items0Product_dataMetadata }
          : {}),
        ...(line_items0Product_dataPackage_dimensionsHeight
          ? {
              "line_items[0][product_data][package_dimensions][height]":
                line_items0Product_dataPackage_dimensionsHeight,
            }
          : {}),
        ...(line_items0Product_dataPackage_dimensionsLength
          ? {
              "line_items[0][product_data][package_dimensions][length]":
                line_items0Product_dataPackage_dimensionsLength,
            }
          : {}),
        ...(line_items0Product_dataPackage_dimensionsWeight
          ? {
              "line_items[0][product_data][package_dimensions][weight]":
                line_items0Product_dataPackage_dimensionsWeight,
            }
          : {}),
        ...(line_items0Product_dataPackage_dimensionsWidth
          ? {
              "line_items[0][product_data][package_dimensions][width]":
                line_items0Product_dataPackage_dimensionsWidth,
            }
          : {}),
        ...(line_items0Product_dataShippable
          ? { "line_items[0][product_data][shippable]": line_items0Product_dataShippable }
          : {}),
        ...(line_items0Product_dataTax_code
          ? { "line_items[0][product_data][tax_code]": line_items0Product_dataTax_code }
          : {}),
        ...(line_items0Product_dataUrl
          ? { "line_items[0][product_data][url]": line_items0Product_dataUrl }
          : {}),
        ...(line_items0Quantity ? { "line_items[0][quantity]": line_items0Quantity } : {}),
        ...(line_items0Tax_rates0 ? { "line_items[0][tax_rates][0]": line_items0Tax_rates0 } : {}),
        ...(line_items0Tax_rates1 ? { "line_items[0][tax_rates][1]": line_items0Tax_rates1 } : {}),
        ...(line_items1Description ? { "line_items[1][description]": line_items1Description } : {}),
        ...(line_items1Discounts0Coupon
          ? { "line_items[1][discounts][0][coupon]": line_items1Discounts0Coupon }
          : {}),
        ...(line_items1Discounts0Discount
          ? { "line_items[1][discounts][0][discount]": line_items1Discounts0Discount }
          : {}),
        ...(line_items1Discounts1Coupon
          ? { "line_items[1][discounts][1][coupon]": line_items1Discounts1Coupon }
          : {}),
        ...(line_items1Discounts1Discount
          ? { "line_items[1][discounts][1][discount]": line_items1Discounts1Discount }
          : {}),
        ...(line_items1Price ? { "line_items[1][price]": line_items1Price } : {}),
        ...(line_items1Price_dataCurrency
          ? { "line_items[1][price_data][currency]": line_items1Price_dataCurrency }
          : {}),
        ...(line_items1Price_dataProduct
          ? { "line_items[1][price_data][product]": line_items1Price_dataProduct }
          : {}),
        ...(line_items1Price_dataTax_behavior
          ? { "line_items[1][price_data][tax_behavior]": line_items1Price_dataTax_behavior }
          : {}),
        ...(line_items1Price_dataUnit_amount
          ? { "line_items[1][price_data][unit_amount]": line_items1Price_dataUnit_amount }
          : {}),
        ...(line_items1Price_dataUnit_amount_decimal
          ? {
              "line_items[1][price_data][unit_amount_decimal]":
                line_items1Price_dataUnit_amount_decimal,
            }
          : {}),
        ...(line_items1Product ? { "line_items[1][product]": line_items1Product } : {}),
        ...(line_items1Product_dataId
          ? { "line_items[1][product_data][id]": line_items1Product_dataId }
          : {}),
        ...(line_items1Product_dataName
          ? { "line_items[1][product_data][name]": line_items1Product_dataName }
          : {}),
        ...(line_items1Product_dataDescription
          ? { "line_items[1][product_data][description]": line_items1Product_dataDescription }
          : {}),
        ...(line_items1Product_dataImages0
          ? { "line_items[1][product_data][images][0]": line_items1Product_dataImages0 }
          : {}),
        ...(line_items1Product_dataImages1
          ? { "line_items[1][product_data][images][1]": line_items1Product_dataImages1 }
          : {}),
        ...(line_items1Product_dataMetadata
          ? { "line_items[1][product_data][metadata]": line_items1Product_dataMetadata }
          : {}),
        ...(line_items1Product_dataPackage_dimensionsHeight
          ? {
              "line_items[1][product_data][package_dimensions][height]":
                line_items1Product_dataPackage_dimensionsHeight,
            }
          : {}),
        ...(line_items1Product_dataPackage_dimensionsLength
          ? {
              "line_items[1][product_data][package_dimensions][length]":
                line_items1Product_dataPackage_dimensionsLength,
            }
          : {}),
        ...(line_items1Product_dataPackage_dimensionsWeight
          ? {
              "line_items[1][product_data][package_dimensions][weight]":
                line_items1Product_dataPackage_dimensionsWeight,
            }
          : {}),
        ...(line_items1Product_dataPackage_dimensionsWidth
          ? {
              "line_items[1][product_data][package_dimensions][width]":
                line_items1Product_dataPackage_dimensionsWidth,
            }
          : {}),
        ...(line_items1Product_dataShippable
          ? { "line_items[1][product_data][shippable]": line_items1Product_dataShippable }
          : {}),
        ...(line_items1Product_dataTax_code
          ? { "line_items[1][product_data][tax_code]": line_items1Product_dataTax_code }
          : {}),
        ...(line_items1Product_dataUrl
          ? { "line_items[1][product_data][url]": line_items1Product_dataUrl }
          : {}),
        ...(line_items1Quantity ? { "line_items[1][quantity]": line_items1Quantity } : {}),
        ...(line_items1Tax_rates0 ? { "line_items[1][tax_rates][0]": line_items1Tax_rates0 } : {}),
        ...(line_items1Tax_rates1 ? { "line_items[1][tax_rates][1]": line_items1Tax_rates1 } : {}),
        ...(automatic_taxEnabled ? { "automatic_tax[enabled]": automatic_taxEnabled } : {}),
        ...(billing_detailsAddressCity
          ? { "billing_details[address][city]": billing_detailsAddressCity }
          : {}),
        ...(billing_detailsAddressCountry
          ? { "billing_details[address][country]": billing_detailsAddressCountry }
          : {}),
        ...(billing_detailsAddressLine1
          ? { "billing_details[address][line1]": billing_detailsAddressLine1 }
          : {}),
        ...(billing_detailsAddressLine2
          ? { "billing_details[address][line2]": billing_detailsAddressLine2 }
          : {}),
        ...(billing_detailsAddressPostal_code
          ? { "billing_details[address][postal_code]": billing_detailsAddressPostal_code }
          : {}),
        ...(billing_detailsAddressState
          ? { "billing_details[address][state]": billing_detailsAddressState }
          : {}),
        ...(billing_detailsEmail ? { "billing_details[email]": billing_detailsEmail } : {}),
        ...(billing_detailsName ? { "billing_details[name]": billing_detailsName } : {}),
        ...(billing_detailsPhone ? { "billing_details[phone]": billing_detailsPhone } : {}),
        ...(discounts0Coupon ? { "discounts[0][coupon]": discounts0Coupon } : {}),
        ...(discounts0Discount ? { "discounts[0][discount]": discounts0Discount } : {}),
        ...(discounts0Promotion_code
          ? { "discounts[0][promotion_code]": discounts0Promotion_code }
          : {}),
        ...(discounts1Coupon ? { "discounts[1][coupon]": discounts1Coupon } : {}),
        ...(discounts1Discount ? { "discounts[1][discount]": discounts1Discount } : {}),
        ...(discounts1Promotion_code
          ? { "discounts[1][promotion_code]": discounts1Promotion_code }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(paymentSettingsApplication_fee_amount
          ? { "payment[settings][application_fee_amount]": paymentSettingsApplication_fee_amount }
          : {}),
        ...(paymentSettingsPayment_method_optionsAcss_debitMandate_optionsCustom_mandate_url
          ? {
              "payment[settings][payment_method_options][acss_debit][mandate_options][custom_mandate_url]":
                paymentSettingsPayment_method_optionsAcss_debitMandate_optionsCustom_mandate_url,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAcss_debitMandate_optionsInterval_description
          ? {
              "payment[settings][payment_method_options][acss_debit][mandate_options][interval_description]":
                paymentSettingsPayment_method_optionsAcss_debitMandate_optionsInterval_description,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAcss_debitMandate_optionsPayment_schedule
          ? {
              "payment[settings][payment_method_options][acss_debit][mandate_options][payment_schedule]":
                paymentSettingsPayment_method_optionsAcss_debitMandate_optionsPayment_schedule,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type
          ? {
              "payment[settings][payment_method_options][acss_debit][mandate_options][transaction_type]":
                paymentSettingsPayment_method_optionsAcss_debitMandate_optionsTransaction_type,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAcss_debitSetup_future_usage
          ? {
              "payment[settings][payment_method_options][acss_debit][setup_future_usage]":
                paymentSettingsPayment_method_optionsAcss_debitSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAcss_debitVerification_method
          ? {
              "payment[settings][payment_method_options][acss_debit][verification_method]":
                paymentSettingsPayment_method_optionsAcss_debitVerification_method,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAfterpay_clearpayCapture_method
          ? {
              "payment[settings][payment_method_options][afterpay_clearpay][capture_method]":
                paymentSettingsPayment_method_optionsAfterpay_clearpayCapture_method,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAfterpay_clearpayReference
          ? {
              "payment[settings][payment_method_options][afterpay_clearpay][reference]":
                paymentSettingsPayment_method_optionsAfterpay_clearpayReference,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAfterpay_clearpaySetup_future_usage
          ? {
              "payment[settings][payment_method_options][afterpay_clearpay][setup_future_usage]":
                paymentSettingsPayment_method_optionsAfterpay_clearpaySetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsAlipaySetup_future_usage
          ? {
              "payment[settings][payment_method_options][alipay][setup_future_usage]":
                paymentSettingsPayment_method_optionsAlipaySetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsBancontactPreferred_language
          ? {
              "payment[settings][payment_method_options][bancontact][preferred_language]":
                paymentSettingsPayment_method_optionsBancontactPreferred_language,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsBancontactSetup_future_usage
          ? {
              "payment[settings][payment_method_options][bancontact][setup_future_usage]":
                paymentSettingsPayment_method_optionsBancontactSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCardCapture_method
          ? {
              "payment[settings][payment_method_options][card][capture_method]":
                paymentSettingsPayment_method_optionsCardCapture_method,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCardSetup_future_usage
          ? {
              "payment[settings][payment_method_options][card][setup_future_usage]":
                paymentSettingsPayment_method_optionsCardSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCustomer_balanceBank_transferType
          ? {
              "payment[settings][payment_method_options][customer_balance][bank_transfer][type]":
                paymentSettingsPayment_method_optionsCustomer_balanceBank_transferType,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry
          ? {
              "payment[settings][payment_method_options][customer_balance][bank_transfer][eu_bank_transfer][country]":
                paymentSettingsPayment_method_optionsCustomer_balanceBank_transferEu_bank_transferCountry,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCustomer_balanceBank_transferRequested_address_types0
          ? {
              "payment[settings][payment_method_options][customer_balance][bank_transfer][requested_address_types][0]":
                paymentSettingsPayment_method_optionsCustomer_balanceBank_transferRequested_address_types0,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCustomer_balanceBank_transferRequested_address_types1
          ? {
              "payment[settings][payment_method_options][customer_balance][bank_transfer][requested_address_types][1]":
                paymentSettingsPayment_method_optionsCustomer_balanceBank_transferRequested_address_types1,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCustomer_balanceFunding_type
          ? {
              "payment[settings][payment_method_options][customer_balance][funding_type]":
                paymentSettingsPayment_method_optionsCustomer_balanceFunding_type,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsCustomer_balanceSetup_future_usage
          ? {
              "payment[settings][payment_method_options][customer_balance][setup_future_usage]":
                paymentSettingsPayment_method_optionsCustomer_balanceSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsIdealSetup_future_usage
          ? {
              "payment[settings][payment_method_options][ideal][setup_future_usage]":
                paymentSettingsPayment_method_optionsIdealSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsKlarnaCapture_method
          ? {
              "payment[settings][payment_method_options][klarna][capture_method]":
                paymentSettingsPayment_method_optionsKlarnaCapture_method,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsKlarnaPreferred_locale
          ? {
              "payment[settings][payment_method_options][klarna][preferred_locale]":
                paymentSettingsPayment_method_optionsKlarnaPreferred_locale,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsKlarnaSetup_future_usage
          ? {
              "payment[settings][payment_method_options][klarna][setup_future_usage]":
                paymentSettingsPayment_method_optionsKlarnaSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsLinkCapture_method
          ? {
              "payment[settings][payment_method_options][link][capture_method]":
                paymentSettingsPayment_method_optionsLinkCapture_method,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsLinkPersistent_token
          ? {
              "payment[settings][payment_method_options][link][persistent_token]":
                paymentSettingsPayment_method_optionsLinkPersistent_token,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsLinkSetup_future_usage
          ? {
              "payment[settings][payment_method_options][link][setup_future_usage]":
                paymentSettingsPayment_method_optionsLinkSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsOxxoExpires_after_days
          ? {
              "payment[settings][payment_method_options][oxxo][expires_after_days]":
                paymentSettingsPayment_method_optionsOxxoExpires_after_days,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsOxxoSetup_future_usage
          ? {
              "payment[settings][payment_method_options][oxxo][setup_future_usage]":
                paymentSettingsPayment_method_optionsOxxoSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsP24Setup_future_usage
          ? {
              "payment[settings][payment_method_options][p24][setup_future_usage]":
                paymentSettingsPayment_method_optionsP24Setup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsP24Tos_shown_and_accepted
          ? {
              "payment[settings][payment_method_options][p24][tos_shown_and_accepted]":
                paymentSettingsPayment_method_optionsP24Tos_shown_and_accepted,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsSepa_debitSetup_future_usage
          ? {
              "payment[settings][payment_method_options][sepa_debit][setup_future_usage]":
                paymentSettingsPayment_method_optionsSepa_debitSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsSofortPreferred_language
          ? {
              "payment[settings][payment_method_options][sofort][preferred_language]":
                paymentSettingsPayment_method_optionsSofortPreferred_language,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsSofortSetup_future_usage
          ? {
              "payment[settings][payment_method_options][sofort][setup_future_usage]":
                paymentSettingsPayment_method_optionsSofortSetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsWechat_payClient
          ? {
              "payment[settings][payment_method_options][wechat_pay][client]":
                paymentSettingsPayment_method_optionsWechat_payClient,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsWechat_payApp_id
          ? {
              "payment[settings][payment_method_options][wechat_pay][app_id]":
                paymentSettingsPayment_method_optionsWechat_payApp_id,
            }
          : {}),
        ...(paymentSettingsPayment_method_optionsWechat_paySetup_future_usage
          ? {
              "payment[settings][payment_method_options][wechat_pay][setup_future_usage]":
                paymentSettingsPayment_method_optionsWechat_paySetup_future_usage,
            }
          : {}),
        ...(paymentSettingsPayment_method_types0
          ? { "payment[settings][payment_method_types][0]": paymentSettingsPayment_method_types0 }
          : {}),
        ...(paymentSettingsPayment_method_types1
          ? { "payment[settings][payment_method_types][1]": paymentSettingsPayment_method_types1 }
          : {}),
        ...(paymentSettingsReturn_url
          ? { "payment[settings][return_url]": paymentSettingsReturn_url }
          : {}),
        ...(paymentSettingsStatement_descriptor
          ? { "payment[settings][statement_descriptor]": paymentSettingsStatement_descriptor }
          : {}),
        ...(paymentSettingsStatement_descriptor_suffix
          ? {
              "payment[settings][statement_descriptor_suffix]":
                paymentSettingsStatement_descriptor_suffix,
            }
          : {}),
        ...(paymentSettingsTransfer_dataDestination
          ? {
              "payment[settings][transfer_data][destination]":
                paymentSettingsTransfer_dataDestination,
            }
          : {}),
        ...(paymentSettingsTransfer_dataAmount
          ? { "payment[settings][transfer_data][amount]": paymentSettingsTransfer_dataAmount }
          : {}),
        ...(shipping_costShipping_rate
          ? { "shipping_cost[shipping_rate]": shipping_costShipping_rate }
          : {}),
        ...(shipping_costShipping_rate_dataDisplay_name
          ? {
              "shipping_cost[shipping_rate_data][display_name]":
                shipping_costShipping_rate_dataDisplay_name,
            }
          : {}),
        ...(shipping_costShipping_rate_dataDelivery_estimateMaximumUnit
          ? {
              "shipping_cost[shipping_rate_data][delivery_estimate][maximum][unit]":
                shipping_costShipping_rate_dataDelivery_estimateMaximumUnit,
            }
          : {}),
        ...(shipping_costShipping_rate_dataDelivery_estimateMaximumValue
          ? {
              "shipping_cost[shipping_rate_data][delivery_estimate][maximum][value]":
                shipping_costShipping_rate_dataDelivery_estimateMaximumValue,
            }
          : {}),
        ...(shipping_costShipping_rate_dataDelivery_estimateMinimumUnit
          ? {
              "shipping_cost[shipping_rate_data][delivery_estimate][minimum][unit]":
                shipping_costShipping_rate_dataDelivery_estimateMinimumUnit,
            }
          : {}),
        ...(shipping_costShipping_rate_dataDelivery_estimateMinimumValue
          ? {
              "shipping_cost[shipping_rate_data][delivery_estimate][minimum][value]":
                shipping_costShipping_rate_dataDelivery_estimateMinimumValue,
            }
          : {}),
        ...(shipping_costShipping_rate_dataFixed_amountAmount
          ? {
              "shipping_cost[shipping_rate_data][fixed_amount][amount]":
                shipping_costShipping_rate_dataFixed_amountAmount,
            }
          : {}),
        ...(shipping_costShipping_rate_dataFixed_amountCurrency
          ? {
              "shipping_cost[shipping_rate_data][fixed_amount][currency]":
                shipping_costShipping_rate_dataFixed_amountCurrency,
            }
          : {}),
        ...(shipping_costShipping_rate_dataFixed_amountCurrency_options
          ? {
              "shipping_cost[shipping_rate_data][fixed_amount][currency_options]":
                shipping_costShipping_rate_dataFixed_amountCurrency_options,
            }
          : {}),
        ...(shipping_costShipping_rate_dataMetadata
          ? {
              "shipping_cost[shipping_rate_data][metadata]":
                shipping_costShipping_rate_dataMetadata,
            }
          : {}),
        ...(shipping_costShipping_rate_dataTax_behavior
          ? {
              "shipping_cost[shipping_rate_data][tax_behavior]":
                shipping_costShipping_rate_dataTax_behavior,
            }
          : {}),
        ...(shipping_costShipping_rate_dataTax_code
          ? {
              "shipping_cost[shipping_rate_data][tax_code]":
                shipping_costShipping_rate_dataTax_code,
            }
          : {}),
        ...(shipping_costShipping_rate_dataType
          ? { "shipping_cost[shipping_rate_data][type]": shipping_costShipping_rate_dataType }
          : {}),
        ...(shipping_detailsAddressCity
          ? { "shipping_details[address][city]": shipping_detailsAddressCity }
          : {}),
        ...(shipping_detailsAddressCountry
          ? { "shipping_details[address][country]": shipping_detailsAddressCountry }
          : {}),
        ...(shipping_detailsAddressLine1
          ? { "shipping_details[address][line1]": shipping_detailsAddressLine1 }
          : {}),
        ...(shipping_detailsAddressLine2
          ? { "shipping_details[address][line2]": shipping_detailsAddressLine2 }
          : {}),
        ...(shipping_detailsAddressPostal_code
          ? { "shipping_details[address][postal_code]": shipping_detailsAddressPostal_code }
          : {}),
        ...(shipping_detailsAddressState
          ? { "shipping_details[address][state]": shipping_detailsAddressState }
          : {}),
        ...(shipping_detailsName ? { "shipping_details[name]": shipping_detailsName } : {}),
        ...(shipping_detailsPhone ? { "shipping_details[phone]": shipping_detailsPhone } : {}),
        ...(tax_detailsTax_exempt ? { "tax_details[tax_exempt]": tax_detailsTax_exempt } : {}),
        ...(tax_detailsTax_ids0Type
          ? { "tax_details[tax_ids][0][type]": tax_detailsTax_ids0Type }
          : {}),
        ...(tax_detailsTax_ids0Value
          ? { "tax_details[tax_ids][0][value]": tax_detailsTax_ids0Value }
          : {}),
        ...(tax_detailsTax_ids1Type
          ? { "tax_details[tax_ids][1][type]": tax_detailsTax_ids1Type }
          : {}),
        ...(tax_detailsTax_ids1Value
          ? { "tax_details[tax_ids][1][value]": tax_detailsTax_ids1Value }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, currency, line_items }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CURRENCY: "A valid currency field (string) was not provided in the input.",
    INVALID_LINE_ITEMS: "A valid line_items field (object) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof currency !== "string") throw new Error(ERRORS.INVALID_CURRENCY);
  if (typeof line_items !== "object") throw new Error(ERRORS.INVALID_LINE_ITEMS);
};
