# Creata a Checkout

Creates a new checkout

[Documentation]("https://shopify.dev/docs/api/admin-rest/2023-01/resources/checkout")

**Sample Payload**

```json
{
  "data": {
    "checkout":{
      "line_items":[
        {
          "variant_id":39072856,
          "quantity":5
        }
      ]
    }
  }
}
```

**Sample Response**

```json
{
  "checkout": {
    "completed_at": null,
    "created_at": "2023-02-02T09:35:54-05:00",
    "currency": "USD",
    "presentment_currency": "USD",
    "customer_id": null,
    "customer_locale": "en",
    "device_id": null,
    "discount_code": null,
    "discount_codes": [],
    "email": null,
    "legal_notice_url": null,
    "location_id": null,
    "name": "#1066348319",
    "note": "",
    "note_attributes": {},
    "order_id": null,
    "order_status_url": null,
    "order": null,
    "payment_due": "995.00",
    "payment_url": "https://app.local/cardserver/sessions",
    "payments": [],
    "phone": null,
    "shopify_payments_account_id": null,
    "privacy_policy_url": null,
    "refund_policy_url": null,
    "requires_shipping": true,
    "reservation_time_left": 0,
    "reservation_time": null,
    "source_identifier": null,
    "source_name": "755357713",
    "source_url": null,
    "subscription_policy_url": null,
    "subtotal_price": "995.00",
    "shipping_policy_url": null,
    "tax_exempt": false,
    "taxes_included": false,
    "terms_of_sale_url": null,
    "terms_of_service_url": null,
    "token": "95ab184245db6e26632d8e1e0dbd4c21",
    "total_price": "995.00",
    "total_tax": "0.00",
    "total_tip_received": "0.00",
    "total_line_items_price": "995.00",
    "updated_at": "2023-02-02T09:35:54-05:00",
    "user_id": null,
    "web_url": "https://jsmith.myshopify.com/548380009/checkouts/95ab184245db6e26632d8e1e0dbd4c21",
    "total_duties": null,
    "total_additional_fees": null,
    "line_items": [
      {
        "id": "6ccfe50c26fa5365f7da3a5c3c4c27ad",
        "key": "6ccfe50c26fa5365f7da3a5c3c4c27ad",
        "product_id": 632910392,
        "variant_id": 39072856,
        "sku": "IPOD2008GREEN",
        "vendor": "Apple",
        "title": "IPod Nano - 8GB",
        "variant_title": "Green",
        "image_url": "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1675346989",
        "taxable": true,
        "requires_shipping": true,
        "gift_card": false,
        "price": "199.00",
        "compare_at_price": null,
        "line_price": "995.00",
        "properties": {},
        "quantity": 5,
        "grams": 567,
        "fulfillment_service": "manual",
        "applied_discounts": [],
        "discount_allocations": [],
        "tax_lines": []
      }
    ],
    "gift_cards": [],
    "tax_lines": [],
    "tax_manipulations": [],
    "shipping_line": null,
    "shipping_rate": null,
    "shipping_address": null,
    "credit_card": null,
    "billing_address": null,
    "applied_discount": null,
    "applied_discounts": [],
    "discount_violations": []
  }
}
```