# checkouts.payments.create

Creates a payment to a checkout

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/payment)
**Sample Payload**
```json
{
  "primaryResourceId": "checkout-token",
  "data": {
    "payment": {
      "request_details": {
        "ip_address": "123.1.1.1",
        "accept_language": "en-US,en;q=0.8,fr;q=0.6",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
      },
      "amount": "398.00",
      "session_id": "global-6adaf1d88ee57dab",
      "unique_token": "client-side-idempotency-token"
    }
  }
}
```

Note: `primaryResourceId` refers to the checkout token.

**Sample Response**
```json
{
  "payment": {
    "id": 1071573807,
    "unique_token": "client-side-idempotency-token",
    "payment_processing_error_message": null,
    "next_action": {
      "redirect_url": null
    },
    "fraudulent": false,
    "transaction": null,
    "credit_card": {
      "first_name": "Bob",
      "last_name": "Norman",
      "first_digits": "424242",
      "last_digits": "4242",
      "brand": "bogus",
      "expiry_month": 9,
      "expiry_year": 2024,
      "customer_id": 207119551
    },
    "checkout": {
      "completed_at": null,
      "created_at": "2012-10-12T07:05:27-04:00",
      "currency": "USD",
      "presentment_currency": "USD",
      "customer_id": 207119551,
      "customer_locale": "en",
      "device_id": null,
      "discount_code": null,
      "discount_codes": [],
      "email": "bob.norman@mail.example.com",
      "legal_notice_url": null,
      "location_id": null,
      "name": "#446514532",
      "note": "",
      "note_attributes": {
        "custom engraving": "Happy Birthday",
        "colour": "green"
      },
      "order_id": null,
      "order_status_url": null,
      "order": null,
      "payment_due": "398.00",
      "payment_url": "https://app.local/cardserver/sessions",
      "payments": [
        {
          "id": 25428999,
          "unique_token": "e01e661f4a99acd9dcdg6f1422d0d6f7",
          "payment_processing_error_message": null,
          "fraudulent": false,
          "transaction": {
            "amount": "598.94",
            "amount_in": null,
            "amount_out": null,
            "amount_rounding": null,
            "authorization": "authorization-key",
            "created_at": "2005-08-01T11:57:11-04:00",
            "currency": "USD",
            "error_code": null,
            "parent_id": null,
            "gateway": "bogus",
            "id": 389404469,
            "kind": "authorization",
            "message": null,
            "status": "success",
            "test": false,
            "receipt": {
              "testcase": true,
              "authorization": "123456"
            },
            "location_id": null,
            "user_id": null,
            "transaction_group_id": null,
            "device_id": null,
            "payment_details": {
              "credit_card_bin": null,
              "avs_result_code": null,
              "cvv_result_code": null,
              "credit_card_number": "•••• •••• •••• 4242",
              "credit_card_company": "Visa",
              "credit_card_name": null,
              "credit_card_wallet": null,
              "credit_card_expiration_month": null,
              "credit_card_expiration_year": null
            }
          },
          "credit_card": null
        },
        {
          "id": 1071573807,
          "unique_token": "client-side-idempotency-token",
          "payment_processing_error_message": null,
          "fraudulent": false,
          "transaction": null,
          "credit_card": {
            "first_name": "Bob",
            "last_name": "Norman",
            "first_digits": "424242",
            "last_digits": "4242",
            "brand": "bogus",
            "expiry_month": 9,
            "expiry_year": 2024,
            "customer_id": 207119551
          }
        }
      ],
      "phone": null,
      "shopify_payments_account_id": null,
      "privacy_policy_url": null,
      "refund_policy_url": null,
      "requires_shipping": true,
      "reservation_time_left": 0,
      "reservation_time": null,
      "source_identifier": null,
      "source_name": "web",
      "source_url": null,
      "subscription_policy_url": null,
      "subtotal_price": "398.00",
      "shipping_policy_url": null,
      "tax_exempt": false,
      "taxes_included": false,
      "terms_of_sale_url": null,
      "terms_of_service_url": null,
      "token": "7yjf4v2we7gamku6a6h7tvm8h3mmvs4x",
      "total_price": "398.00",
      "total_tax": "0.00",
      "total_tip_received": "0.00",
      "total_line_items_price": "398.00",
      "updated_at": "2023-02-02T09:59:28-05:00",
      "user_id": null,
      "web_url": "https://checkout.local/548380009/checkouts/7yjf4v2we7gamku6a6h7tvm8h3mmvs4x",
      "total_duties": null,
      "total_additional_fees": null,
      "line_items": [
        {
          "id": "c605d4769a8098d3",
          "key": "c605d4769a8098d3",
          "product_id": 632910392,
          "variant_id": 49148385,
          "sku": "IPOD2008RED",
          "vendor": "Apple",
          "title": "IPod Nano - 8GB",
          "variant_title": "Red",
          "image_url": "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano.png?v=1675349818",
          "taxable": true,
          "requires_shipping": true,
          "gift_card": false,
          "price": "199.00",
          "compare_at_price": null,
          "line_price": "199.00",
          "properties": {},
          "quantity": 1,
          "grams": 200,
          "fulfillment_service": "manual",
          "applied_discounts": [],
          "discount_allocations": [],
          "tax_lines": []
        },
        {
          "id": "bf2dcad0223a241d",
          "key": "bf2dcad0223a241d",
          "product_id": 632910392,
          "variant_id": 808950810,
          "sku": "IPOD2008PINK",
          "vendor": "Apple",
          "title": "IPod Nano - 8GB",
          "variant_title": "Pink",
          "image_url": "https://cdn.shopify.com/s/files/1/0005/4838/0009/products/ipod-nano-2.png?v=1675349818",
          "taxable": true,
          "requires_shipping": true,
          "gift_card": false,
          "price": "199.00",
          "compare_at_price": null,
          "line_price": "199.00",
          "properties": {},
          "quantity": 1,
          "grams": 200,
          "fulfillment_service": "manual",
          "applied_discounts": [],
          "discount_allocations": [],
          "tax_lines": []
        }
      ],
      "gift_cards": [],
      "tax_lines": [],
      "tax_manipulations": [],
      "shipping_line": {
        "handle": "shopify-Free%20Shipping-0.00",
        "price": "0.00",
        "title": "Free Shipping",
        "tax_lines": []
      },
      "shipping_rate": {
        "id": "shopify-Free%20Shipping-0.00",
        "price": "0.00",
        "title": "Free Shipping"
      },
      "shipping_address": {
        "id": 550558813,
        "first_name": "Bob",
        "last_name": "Norman",
        "phone": "+1(502)-459-2181",
        "company": null,
        "address1": "Chestnut Street 92",
        "address2": "",
        "city": "Louisville",
        "province": "Kentucky",
        "province_code": "KY",
        "country": "United States",
        "country_code": "US",
        "zip": "40202"
      },
      "credit_card": {
        "first_name": "Bob",
        "last_name": "Norman",
        "first_digits": "424242",
        "last_digits": "4242",
        "brand": "bogus",
        "expiry_month": 9,
        "expiry_year": 2024,
        "customer_id": 207119551
      },
      "billing_address": {
        "id": 550558813,
        "first_name": "Bob",
        "last_name": "Norman",
        "phone": "+1(502)-459-2181",
        "company": null,
        "address1": "Chestnut Street 92",
        "address2": "",
        "city": "Louisville",
        "province": "Kentucky",
        "province_code": "KY",
        "country": "United States",
        "country_code": "US",
        "zip": "40202"
      },
      "applied_discount": null,
      "applied_discounts": [],
      "discount_violations": []
    }
  }
}
```