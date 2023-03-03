# Create an order

Creates an order.

**Requirements**

- Requires access to protected customer data
- Requires `orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/order)

**Sample Payload**

```json
{
  "data": {
    "order": {
      "line_items": [
        {
          "title": "Big Brown Bear Boots",
          "price": 74.99,
          "grams": "1300",
          "quantity": 3,
          "tax_lines": [
            {
              "price": 13.5,
              "rate": 0.06,
              "title": "State tax"
            }
          ]
        }
      ],
      "transactions": [
        {
          "kind": "sale",
          "status": "success",
          "amount": 238.47
        }
      ],
      "total_tax": 13.5,
      "currency": "EUR"
    }
  }
}
```

**Sample Response**

```json
{
  "order": {
    "id": 450789469,
    "admin_graphql_api_id": "gid://shopify/Order/450789469",
    "app_id": null,
    "browser_ip": "0.0.0.0",
    "buyer_accepts_marketing": false,
    "cancel_reason": null,
    "cancelled_at": null,
    "cart_token": "68778783ad298f1c80c3bafcddeea02f",
    "checkout_id": 901414060,
    "checkout_token": "bd5a8aa1ecd019dd3520ff791ee3a24c",
    "client_details": {
      "accept_language": null,
      "browser_height": null,
      "browser_ip": "0.0.0.0",
      "browser_width": null,
      "session_hash": null,
      "user_agent": null
    },
    "closed_at": null,
    "confirmed": true,
    "contact_email": "bob.norman@mail.example.com",
    "created_at": "2008-01-10T11:00:00-05:00",
    "currency": "USD",
    "current_subtotal_price": "195.67",
    "current_subtotal_price_set": {
      "shop_money": {
        "amount": "195.67",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "195.67",
        "currency_code": "USD"
      }
    },
    "current_total_discounts": "3.33",
    "current_total_discounts_set": {
      "shop_money": {
        "amount": "3.33",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "3.33",
        "currency_code": "USD"
      }
    },
    "current_total_duties_set": null,
    "current_total_price": "199.65",
    "current_total_price_set": {
      "shop_money": {
        "amount": "199.65",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "199.65",
        "currency_code": "USD"
      }
    },
    "current_total_tax": "3.98",
    "current_total_tax_set": {
      "shop_money": {
        "amount": "3.98",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "3.98",
        "currency_code": "USD"
      }
    },
    "customer_locale": null,
    "device_id": null,
    "discount_codes": [
      {
        "code": "TENOFF",
        "amount": "10.00",
        "type": "fixed_amount"
      }
    ],
    "email": "bob.norman@mail.example.com",
    "estimated_taxes": false,
    "financial_status": "partially_refunded",
    "fulfillment_status": null,
    "gateway": "authorize_net",
    "landing_site": "http://www.example.com?source=abc",
    "landing_site_ref": "abc",
    "location_id": null,
    "name": "#1001",
    "note": null,
    "note_attributes": [
      {
        "name": "custom engraving",
        "value": "Happy Birthday"
      },
      {
        "name": "colour",
        "value": "green"
      }
    ],
    "number": 1,
    "order_number": 1001,
    "order_status_url": "https://jsmith.myshopify.com/548380009/orders/b1946ac92492d2347c6235b4d2611184/authenticate?key=imasecretipod",
    "original_total_duties_set": null,
    "payment_gateway_names": [
      "bogus"
    ],
    "phone": "+557734881234",
    "presentment_currency": "USD",
    "processed_at": "2008-01-10T11:00:00-05:00",
    "processing_method": "direct",
    "reference": "fhwdgads",
    "referring_site": "http://www.otherexample.com",
    "source_identifier": "fhwdgads",
    "source_name": "web",
    "source_url": null,
    "subtotal_price": "597.00",
    "subtotal_price_set": {
      "shop_money": {
        "amount": "597.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "597.00",
        "currency_code": "USD"
      }
    },
    "tags": "",
    "tax_lines": [
      {
        "price": "11.94",
        "rate": 0.06,
        "title": "State Tax",
        "price_set": {
          "shop_money": {
            "amount": "11.94",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "11.94",
            "currency_code": "USD"
          }
        },
        "channel_liable": null
      }
    ],
    "taxes_included": false,
    "test": false,
    "token": "b1946ac92492d2347c6235b4d2611184",
    "total_discounts": "10.00",
    "total_discounts_set": {
      "shop_money": {
        "amount": "10.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "10.00",
        "currency_code": "USD"
      }
    },
    "total_line_items_price": "597.00",
    "total_line_items_price_set": {
      "shop_money": {
        "amount": "597.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "597.00",
        "currency_code": "USD"
      }
    },
    "total_outstanding": "0.00",
    "total_price": "598.94",
    "total_price_set": {
      "shop_money": {
        "amount": "598.94",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "598.94",
        "currency_code": "USD"
      }
    },
    "total_price_usd": "598.94",
    "total_shipping_price_set": {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
    "total_tax": "11.94",
    "total_tax_set": {
      "shop_money": {
        "amount": "11.94",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "11.94",
        "currency_code": "USD"
      }
    },
    "total_tip_received": "0.00",
    "total_weight": 0,
    "updated_at": "2023-02-14T06:17:48-05:00",
    "user_id": null,
    "billing_address": {
      "first_name": "Bob",
      "address1": "Chestnut Street 92",
      "phone": "+1(502)-459-2181",
      "city": "Louisville",
      "zip": "40202",
      "province": "Kentucky",
      "country": "United States",
      "last_name": "Norman",
      "address2": "",
      "company": null,
      "latitude": 45.41634,
      "longitude": -75.6868,
      "name": "Bob Norman",
      "country_code": "US",
      "province_code": "KY"
    },
    "customer": {
      "id": 207119551,
      "email": "bob.norman@mail.example.com",
      "accepts_marketing": false,
      "created_at": "2023-02-14T06:14:36-05:00",
      "updated_at": "2023-02-14T06:14:36-05:00",
      "first_name": "Bob",
      "last_name": "Norman",
      "orders_count": 1,
      "state": "disabled",
      "total_spent": "199.65",
      "last_order_id": 450789469,
      "note": null,
      "verified_email": true,
      "multipass_identifier": null,
      "tax_exempt": false,
      "tags": "Léon, Noël",
      "last_order_name": "#1001",
      "currency": "USD",
      "phone": "+16136120707",
      "accepts_marketing_updated_at": "2005-06-12T11:57:11-04:00",
      "marketing_opt_in_level": null,
      "tax_exemptions": [],
      "admin_graphql_api_id": "gid://shopify/Customer/207119551",
      "default_address": {
        "id": 207119551,
        "customer_id": 207119551,
        "first_name": null,
        "last_name": null,
        "company": null,
        "address1": "Chestnut Street 92",
        "address2": "",
        "city": "Louisville",
        "province": "Kentucky",
        "country": "United States",
        "zip": "40202",
        "phone": "555-625-1199",
        "name": "",
        "province_code": "KY",
        "country_code": "US",
        "country_name": "United States",
        "default": true
      }
    },
    "discount_applications": [
      {
        "target_type": "line_item",
        "type": "discount_code",
        "value": "10.0",
        "value_type": "fixed_amount",
        "allocation_method": "across",
        "target_selection": "all",
        "code": "TENOFF"
      }
    ],
    "fulfillments": [
      {
        "id": 255858046,
        "admin_graphql_api_id": "gid://shopify/Fulfillment/255858046",
        "created_at": "2023-02-14T06:14:36-05:00",
        "location_id": 655441491,
        "name": "#1001.0",
        "order_id": 450789469,
        "receipt": {
          "testcase": true,
          "authorization": "123456"
        },
        "service": "manual",
        "shipment_status": null,
        "status": "failure",
        "tracking_company": "USPS",
        "tracking_number": "1Z2345",
        "tracking_numbers": [
          "1Z2345"
        ],
        "tracking_url": "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z2345",
        "tracking_urls": [
          "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=1Z2345"
        ],
        "updated_at": "2023-02-14T06:14:36-05:00",
        "line_items": [
          {
            "id": 466157049,
            "admin_graphql_api_id": "gid://shopify/LineItem/466157049",
            "fulfillable_quantity": 0,
            "fulfillment_service": "manual",
            "fulfillment_status": null,
            "gift_card": false,
            "grams": 200,
            "name": "IPod Nano - 8gb - green",
            "price": "199.00",
            "price_set": {
              "shop_money": {
                "amount": "199.00",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "199.00",
                "currency_code": "USD"
              }
            },
            "product_exists": true,
            "product_id": 632910392,
            "properties": [
              {
                "name": "Custom Engraving Front",
                "value": "Happy Birthday"
              },
              {
                "name": "Custom Engraving Back",
                "value": "Merry Christmas"
              }
            ],
            "quantity": 1,
            "requires_shipping": true,
            "sku": "IPOD2008GREEN",
            "taxable": true,
            "title": "IPod Nano - 8gb",
            "total_discount": "0.00",
            "total_discount_set": {
              "shop_money": {
                "amount": "0.00",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "0.00",
                "currency_code": "USD"
              }
            },
            "variant_id": 39072856,
            "variant_inventory_management": "shopify",
            "variant_title": "green",
            "vendor": null,
            "tax_lines": [
              {
                "channel_liable": null,
                "price": "3.98",
                "price_set": {
                  "shop_money": {
                    "amount": "3.98",
                    "currency_code": "USD"
                  },
                  "presentment_money": {
                    "amount": "3.98",
                    "currency_code": "USD"
                  }
                },
                "rate": 0.06,
                "title": "State Tax"
              }
            ],
            "duties": [],
            "discount_allocations": [
              {
                "amount": "3.34",
                "amount_set": {
                  "shop_money": {
                    "amount": "3.34",
                    "currency_code": "USD"
                  },
                  "presentment_money": {
                    "amount": "3.34",
                    "currency_code": "USD"
                  }
                },
                "discount_application_index": 0
              }
            ]
          }
        ]
      }
    ],
    "line_items": [
      {
        "id": 466157049,
        "admin_graphql_api_id": "gid://shopify/LineItem/466157049",
        "fulfillable_quantity": 0,
        "fulfillment_service": "manual",
        "fulfillment_status": null,
        "gift_card": false,
        "grams": 200,
        "name": "IPod Nano - 8gb - green",
        "price": "199.00",
        "price_set": {
          "shop_money": {
            "amount": "199.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "199.00",
            "currency_code": "USD"
          }
        },
        "product_exists": true,
        "product_id": 632910392,
        "properties": [
          {
            "name": "Custom Engraving Front",
            "value": "Happy Birthday"
          },
          {
            "name": "Custom Engraving Back",
            "value": "Merry Christmas"
          }
        ],
        "quantity": 1,
        "requires_shipping": true,
        "sku": "IPOD2008GREEN",
        "taxable": true,
        "title": "IPod Nano - 8gb",
        "total_discount": "0.00",
        "total_discount_set": {
          "shop_money": {
            "amount": "0.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "0.00",
            "currency_code": "USD"
          }
        },
        "variant_id": 39072856,
        "variant_inventory_management": "shopify",
        "variant_title": "green",
        "vendor": null,
        "tax_lines": [
          {
            "channel_liable": null,
            "price": "3.98",
            "price_set": {
              "shop_money": {
                "amount": "3.98",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.98",
                "currency_code": "USD"
              }
            },
            "rate": 0.06,
            "title": "State Tax"
          }
        ],
        "duties": [],
        "discount_allocations": [
          {
            "amount": "3.34",
            "amount_set": {
              "shop_money": {
                "amount": "3.34",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.34",
                "currency_code": "USD"
              }
            },
            "discount_application_index": 0
          }
        ]
      },
      {
        "id": 518995019,
        "admin_graphql_api_id": "gid://shopify/LineItem/518995019",
        "fulfillable_quantity": 1,
        "fulfillment_service": "manual",
        "fulfillment_status": null,
        "gift_card": false,
        "grams": 200,
        "name": "IPod Nano - 8gb - red",
        "price": "199.00",
        "price_set": {
          "shop_money": {
            "amount": "199.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "199.00",
            "currency_code": "USD"
          }
        },
        "product_exists": true,
        "product_id": 632910392,
        "properties": [],
        "quantity": 1,
        "requires_shipping": true,
        "sku": "IPOD2008RED",
        "taxable": true,
        "title": "IPod Nano - 8gb",
        "total_discount": "0.00",
        "total_discount_set": {
          "shop_money": {
            "amount": "0.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "0.00",
            "currency_code": "USD"
          }
        },
        "variant_id": 49148385,
        "variant_inventory_management": "shopify",
        "variant_title": "red",
        "vendor": null,
        "tax_lines": [
          {
            "channel_liable": null,
            "price": "3.98",
            "price_set": {
              "shop_money": {
                "amount": "3.98",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.98",
                "currency_code": "USD"
              }
            },
            "rate": 0.06,
            "title": "State Tax"
          }
        ],
        "duties": [],
        "discount_allocations": [
          {
            "amount": "3.33",
            "amount_set": {
              "shop_money": {
                "amount": "3.33",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.33",
                "currency_code": "USD"
              }
            },
            "discount_application_index": 0
          }
        ]
      },
      {
        "id": 703073504,
        "admin_graphql_api_id": "gid://shopify/LineItem/703073504",
        "fulfillable_quantity": 0,
        "fulfillment_service": "manual",
        "fulfillment_status": null,
        "gift_card": false,
        "grams": 200,
        "name": "IPod Nano - 8gb - black",
        "price": "199.00",
        "price_set": {
          "shop_money": {
            "amount": "199.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "199.00",
            "currency_code": "USD"
          }
        },
        "product_exists": true,
        "product_id": 632910392,
        "properties": [],
        "quantity": 1,
        "requires_shipping": true,
        "sku": "IPOD2008BLACK",
        "taxable": true,
        "title": "IPod Nano - 8gb",
        "total_discount": "0.00",
        "total_discount_set": {
          "shop_money": {
            "amount": "0.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "0.00",
            "currency_code": "USD"
          }
        },
        "variant_id": 457924702,
        "variant_inventory_management": "shopify",
        "variant_title": "black",
        "vendor": null,
        "tax_lines": [
          {
            "channel_liable": null,
            "price": "3.98",
            "price_set": {
              "shop_money": {
                "amount": "3.98",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.98",
                "currency_code": "USD"
              }
            },
            "rate": 0.06,
            "title": "State Tax"
          }
        ],
        "duties": [],
        "discount_allocations": [
          {
            "amount": "3.33",
            "amount_set": {
              "shop_money": {
                "amount": "3.33",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.33",
                "currency_code": "USD"
              }
            },
            "discount_application_index": 0
          }
        ]
      }
    ],
    "payment_details": {
      "credit_card_bin": null,
      "avs_result_code": null,
      "cvv_result_code": null,
      "credit_card_number": "•••• •••• •••• 4242",
      "credit_card_company": "Visa"
    },
    "refunds": [
      {
        "id": 509562969,
        "admin_graphql_api_id": "gid://shopify/Refund/509562969",
        "created_at": "2023-02-14T06:14:36-05:00",
        "note": "it broke during shipping",
        "order_id": 450789469,
        "processed_at": "2023-02-14T06:14:36-05:00",
        "restock": true,
        "total_duties_set": {
          "shop_money": {
            "amount": "0.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "0.00",
            "currency_code": "USD"
          }
        },
        "user_id": 548380009,
        "order_adjustments": [],
        "transactions": [
          {
            "id": 179259969,
            "admin_graphql_api_id": "gid://shopify/OrderTransaction/179259969",
            "amount": "209.00",
            "authorization": "authorization-key",
            "created_at": "2005-08-05T12:59:12-04:00",
            "currency": "USD",
            "device_id": null,
            "error_code": null,
            "gateway": "bogus",
            "kind": "refund",
            "location_id": null,
            "message": null,
            "order_id": 450789469,
            "parent_id": 801038806,
            "processed_at": "2005-08-05T12:59:12-04:00",
            "receipt": {},
            "source_name": "web",
            "status": "success",
            "test": false,
            "user_id": null
          }
        ],
        "refund_line_items": [
          {
            "id": 104689539,
            "line_item_id": 703073504,
            "location_id": 487838322,
            "quantity": 1,
            "restock_type": "legacy_restock",
            "subtotal": 195.66,
            "subtotal_set": {
              "shop_money": {
                "amount": "195.66",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "195.66",
                "currency_code": "USD"
              }
            },
            "total_tax": 3.98,
            "total_tax_set": {
              "shop_money": {
                "amount": "3.98",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.98",
                "currency_code": "USD"
              }
            },
            "line_item": {
              "id": 703073504,
              "admin_graphql_api_id": "gid://shopify/LineItem/703073504",
              "fulfillable_quantity": 0,
              "fulfillment_service": "manual",
              "fulfillment_status": null,
              "gift_card": false,
              "grams": 200,
              "name": "IPod Nano - 8gb - black",
              "price": "199.00",
              "price_set": {
                "shop_money": {
                  "amount": "199.00",
                  "currency_code": "USD"
                },
                "presentment_money": {
                  "amount": "199.00",
                  "currency_code": "USD"
                }
              },
              "product_exists": true,
              "product_id": 632910392,
              "properties": [],
              "quantity": 1,
              "requires_shipping": true,
              "sku": "IPOD2008BLACK",
              "taxable": true,
              "title": "IPod Nano - 8gb",
              "total_discount": "0.00",
              "total_discount_set": {
                "shop_money": {
                  "amount": "0.00",
                  "currency_code": "USD"
                },
                "presentment_money": {
                  "amount": "0.00",
                  "currency_code": "USD"
                }
              },
              "variant_id": 457924702,
              "variant_inventory_management": "shopify",
              "variant_title": "black",
              "vendor": null,
              "tax_lines": [
                {
                  "channel_liable": null,
                  "price": "3.98",
                  "price_set": {
                    "shop_money": {
                      "amount": "3.98",
                      "currency_code": "USD"
                    },
                    "presentment_money": {
                      "amount": "3.98",
                      "currency_code": "USD"
                    }
                  },
                  "rate": 0.06,
                  "title": "State Tax"
                }
              ],
              "duties": [],
              "discount_allocations": [
                {
                  "amount": "3.33",
                  "amount_set": {
                    "shop_money": {
                      "amount": "3.33",
                      "currency_code": "USD"
                    },
                    "presentment_money": {
                      "amount": "3.33",
                      "currency_code": "USD"
                    }
                  },
                  "discount_application_index": 0
                }
              ]
            }
          },
          {
            "id": 709875399,
            "line_item_id": 466157049,
            "location_id": 487838322,
            "quantity": 1,
            "restock_type": "legacy_restock",
            "subtotal": 195.67,
            "subtotal_set": {
              "shop_money": {
                "amount": "195.67",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "195.67",
                "currency_code": "USD"
              }
            },
            "total_tax": 3.98,
            "total_tax_set": {
              "shop_money": {
                "amount": "3.98",
                "currency_code": "USD"
              },
              "presentment_money": {
                "amount": "3.98",
                "currency_code": "USD"
              }
            },
            "line_item": {
              "id": 466157049,
              "admin_graphql_api_id": "gid://shopify/LineItem/466157049",
              "fulfillable_quantity": 0,
              "fulfillment_service": "manual",
              "fulfillment_status": null,
              "gift_card": false,
              "grams": 200,
              "name": "IPod Nano - 8gb - green",
              "price": "199.00",
              "price_set": {
                "shop_money": {
                  "amount": "199.00",
                  "currency_code": "USD"
                },
                "presentment_money": {
                  "amount": "199.00",
                  "currency_code": "USD"
                }
              },
              "product_exists": true,
              "product_id": 632910392,
              "properties": [
                {
                  "name": "Custom Engraving Front",
                  "value": "Happy Birthday"
                },
                {
                  "name": "Custom Engraving Back",
                  "value": "Merry Christmas"
                }
              ],
              "quantity": 1,
              "requires_shipping": true,
              "sku": "IPOD2008GREEN",
              "taxable": true,
              "title": "IPod Nano - 8gb",
              "total_discount": "0.00",
              "total_discount_set": {
                "shop_money": {
                  "amount": "0.00",
                  "currency_code": "USD"
                },
                "presentment_money": {
                  "amount": "0.00",
                  "currency_code": "USD"
                }
              },
              "variant_id": 39072856,
              "variant_inventory_management": "shopify",
              "variant_title": "green",
              "vendor": null,
              "tax_lines": [
                {
                  "channel_liable": null,
                  "price": "3.98",
                  "price_set": {
                    "shop_money": {
                      "amount": "3.98",
                      "currency_code": "USD"
                    },
                    "presentment_money": {
                      "amount": "3.98",
                      "currency_code": "USD"
                    }
                  },
                  "rate": 0.06,
                  "title": "State Tax"
                }
              ],
              "duties": [],
              "discount_allocations": [
                {
                  "amount": "3.34",
                  "amount_set": {
                    "shop_money": {
                      "amount": "3.34",
                      "currency_code": "USD"
                    },
                    "presentment_money": {
                      "amount": "3.34",
                      "currency_code": "USD"
                    }
                  },
                  "discount_application_index": 0
                }
              ]
            }
          }
        ],
        "duties": []
      }
    ],
    "shipping_address": {
      "first_name": "Bob",
      "address1": "Chestnut Street 92",
      "phone": "+1(502)-459-2181",
      "city": "Louisville",
      "zip": "40202",
      "province": "Kentucky",
      "country": "United States",
      "last_name": "Norman",
      "address2": "",
      "company": null,
      "latitude": 45.41634,
      "longitude": -75.6868,
      "name": "Bob Norman",
      "country_code": "US",
      "province_code": "KY"
    },
    "shipping_lines": [
      {
        "id": 369256396,
        "carrier_identifier": null,
        "code": "Free Shipping",
        "delivery_category": null,
        "discounted_price": "0.00",
        "discounted_price_set": {
          "shop_money": {
            "amount": "0.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "0.00",
            "currency_code": "USD"
          }
        },
        "phone": null,
        "price": "0.00",
        "price_set": {
          "shop_money": {
            "amount": "0.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "0.00",
            "currency_code": "USD"
          }
        },
        "requested_fulfillment_service_id": null,
        "source": "shopify",
        "title": "Free Shipping",
        "tax_lines": [],
        "discount_allocations": []
      }
    ]
  }
}
```
