# Create a draft order

Creates a draft order

**Requirements**

- Requires access to protected customer data
- Requires `draft_orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/draftorder)

**Sample Payload**

```json
{
  "data": {
    "draft_order": {
      "line_items": [
        {
          "title": "Custom Tee",
          "price": "20.00",
          "quantity": 2
        }
      ],
      "applied_discount": {
        "description": "Custom discount",
        "value_type": "fixed_amount",
        "value": "10.0",
        "amount": "10.00",
        "title": "Custom"
      },
      "customer": {
        "id": 207119551
      },
      "use_customer_default_address": true
    }
  }
}
```

**Sample Response**

```json
{
  "draft_order": {
    "id": 1069920494,
    "note": null,
    "email": "bob.norman@mail.example.com",
    "taxes_included": false,
    "currency": "USD",
    "invoice_sent_at": null,
    "created_at": "2023-02-13T10:30:01-05:00",
    "updated_at": "2023-02-13T10:30:01-05:00",
    "tax_exempt": false,
    "completed_at": null,
    "name": "#D5",
    "status": "open",
    "line_items": [
      {
        "id": 1066630407,
        "variant_id": null,
        "product_id": null,
        "title": "Custom Tee",
        "variant_title": null,
        "sku": null,
        "vendor": null,
        "quantity": 2,
        "requires_shipping": false,
        "taxable": true,
        "gift_card": false,
        "fulfillment_service": "manual",
        "grams": 0,
        "tax_lines": [],
        "applied_discount": null,
        "name": "Custom Tee",
        "properties": [],
        "custom": true,
        "price": "20.00",
        "admin_graphql_api_id": "gid://shopify/DraftOrderLineItem/1066630407"
      }
    ],
    "shipping_address": {
      "first_name": null,
      "address1": "Chestnut Street 92",
      "phone": "555-625-1199",
      "city": "Louisville",
      "zip": "40202",
      "province": "Kentucky",
      "country": "United States",
      "last_name": null,
      "address2": "",
      "company": null,
      "latitude": null,
      "longitude": null,
      "name": "",
      "country_code": "US",
      "province_code": "KY"
    },
    "billing_address": {
      "first_name": null,
      "address1": "Chestnut Street 92",
      "phone": "555-625-1199",
      "city": "Louisville",
      "zip": "40202",
      "province": "Kentucky",
      "country": "United States",
      "last_name": null,
      "address2": "",
      "company": null,
      "latitude": null,
      "longitude": null,
      "name": "",
      "country_code": "US",
      "province_code": "KY"
    },
    "invoice_url": "https://jsmith.myshopify.com/548380009/invoices/95146d7e1a37bb96b0d91e1ea4b0c744",
    "applied_discount": {
      "description": "Custom discount",
      "value": "10.0",
      "title": "Custom",
      "amount": "10.00",
      "value_type": "fixed_amount"
    },
    "order_id": null,
    "shipping_line": null,
    "tax_lines": [],
    "tags": "",
    "note_attributes": [],
    "total_price": "30.00",
    "subtotal_price": "30.00",
    "total_tax": "0.00",
    "presentment_currency": "USD",
    "total_line_items_price_set": {
      "shop_money": {
        "amount": "40.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "40.00",
        "currency_code": "USD"
      }
    },
    "total_price_set": {
      "shop_money": {
        "amount": "30.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "30.00",
        "currency_code": "USD"
      }
    },
    "subtotal_price_set": {
      "shop_money": {
        "amount": "30.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "30.00",
        "currency_code": "USD"
      }
    },
    "total_tax_set": {
      "shop_money": {
        "amount": "0.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "0.00",
        "currency_code": "USD"
      }
    },
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
    "payment_terms": null,
    "admin_graphql_api_id": "gid://shopify/DraftOrder/1069920494",
    "customer": {
      "id": 207119551,
      "email": "bob.norman@mail.example.com",
      "accepts_marketing": false,
      "created_at": "2023-02-13T10:18:48-05:00",
      "updated_at": "2023-02-13T10:18:48-05:00",
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
      "email_marketing_consent": {
        "state": "not_subscribed",
        "opt_in_level": null,
        "consent_updated_at": "2004-06-13T11:57:11-04:00"
      },
      "sms_marketing_consent": {
        "state": "not_subscribed",
        "opt_in_level": "single_opt_in",
        "consent_updated_at": "2023-02-13T10:18:48-05:00",
        "consent_collected_from": "OTHER"
      },
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
    }
  }
}
```
