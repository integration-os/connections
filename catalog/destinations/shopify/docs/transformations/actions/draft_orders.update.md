# Modify an existing DraftOrder

Updates a draft order.

If a checkout has been started for a draft order, any update to the draft will unlink the checkout. Checkouts are
created but not immediately completed when opening the merchant credit card modal in the admin, and when a buyer opens
the invoice URL. This is usually fine, but there is an edge case where a checkout is in progress and the draft is
updated before the checkout completes. This will not interfere with the checkout and order creation, but if the link
from draft to checkout is broken the draft will remain open even after the order is created.

**Requirements**

- Requires access to protected customer data
- Requires `draft_orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/draftorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "draft_order":{
      "id":994118539,
      "applied_discount":{
        "description":"Custom discount",
        "value_type":"percentage",
        "value":"10.0",
        "amount":"19.90",
        "title":"Custom"
      }
    }
  }
}
```

**Note:** `primaryResourceId` represents the draft order ID

**Sample Response**

```json
{
  "draft_order": {
    "id": 994118539,
    "note": "rush order",
    "email": "bob.norman@mail.example.com",
    "taxes_included": false,
    "currency": "USD",
    "invoice_sent_at": null,
    "created_at": "2023-02-13T10:18:48-05:00",
    "updated_at": "2023-02-13T10:29:57-05:00",
    "tax_exempt": false,
    "completed_at": null,
    "name": "#D2",
    "status": "open",
    "line_items": [
      {
        "id": 994118539,
        "variant_id": 39072856,
        "product_id": 632910392,
        "title": "IPod Nano - 8gb",
        "variant_title": "green",
        "sku": "IPOD2008GREEN",
        "vendor": null,
        "quantity": 1,
        "requires_shipping": false,
        "taxable": true,
        "gift_card": false,
        "fulfillment_service": "manual",
        "grams": 567,
        "tax_lines": [],
        "applied_discount": null,
        "name": "IPod Nano - 8gb - green",
        "properties": [],
        "custom": false,
        "price": "199.00",
        "admin_graphql_api_id": "gid://shopify/DraftOrderLineItem/994118539"
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
    "invoice_url": "https://jsmith.myshopify.com/548380009/invoices/ba8dcf6c022ccad3d47e3909e378e33f",
    "applied_discount": {
      "description": "Custom discount",
      "value": "10.0",
      "title": "Custom",
      "amount": "19.90",
      "value_type": "percentage"
    },
    "order_id": null,
    "shipping_line": null,
    "tax_lines": [],
    "tags": "Wholesale",
    "note_attributes": [],
    "total_price": "179.10",
    "subtotal_price": "179.10",
    "total_tax": "0.00",
    "presentment_currency": "USD",
    "total_line_items_price_set": {
      "shop_money": {
        "amount": "199.00",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "199.00",
        "currency_code": "USD"
      }
    },
    "total_price_set": {
      "shop_money": {
        "amount": "179.10",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "179.10",
        "currency_code": "USD"
      }
    },
    "subtotal_price_set": {
      "shop_money": {
        "amount": "179.10",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "179.10",
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
        "amount": "19.90",
        "currency_code": "USD"
      },
      "presentment_money": {
        "amount": "19.90",
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
    "admin_graphql_api_id": "gid://shopify/DraftOrder/994118539",
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