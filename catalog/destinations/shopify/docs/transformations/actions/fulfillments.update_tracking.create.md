# Updates the tracking information for a fulfillment

Updates the tracking information for a fulfillment.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789,
  "data": {
    "fulfillment": {
      "notify_customer": true,
      "tracking_info": {
        "number": "1111",
        "url": "http://www.my-url.com",
        "company": "my-company"
      }
    }
  }
}
```

**Note:** `primaryResourceId` represents the fulfillment ID

**Sample Response**

```json
{
  "fulfillment": {
    "tracking_company": "my-company",
    "location_id": 24826418,
    "id": 1069019862,
    "order_id": 450789469,
    "status": "success",
    "created_at": "2023-02-02T09:09:49-05:00",
    "service": "manual",
    "updated_at": "2023-02-02T09:11:20-05:00",
    "shipment_status": null,
    "line_items": [
      {
        "id": 1071823172,
        "variant_id": 43729076,
        "title": "Draft",
        "quantity": 1,
        "sku": "draft-151",
        "variant_title": "151cm",
        "vendor": null,
        "fulfillment_service": "manual",
        "product_id": 108828309,
        "requires_shipping": true,
        "taxable": true,
        "gift_card": false,
        "name": "Draft - 151cm",
        "variant_inventory_management": null,
        "properties": [],
        "product_exists": true,
        "fulfillable_quantity": 1,
        "grams": 0,
        "price": "10.00",
        "total_discount": "0.00",
        "fulfillment_status": "fulfilled",
        "price_set": {
          "shop_money": {
            "amount": "10.00",
            "currency_code": "USD"
          },
          "presentment_money": {
            "amount": "10.00",
            "currency_code": "USD"
          }
        },
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
        "discount_allocations": [],
        "duties": [],
        "admin_graphql_api_id": "gid://shopify/LineItem/1071823172",
        "tax_lines": []
      }
    ],
    "tracking_number": "1111",
    "tracking_numbers": [
      "1111"
    ],
    "tracking_url": "http://www.my-url.com",
    "tracking_urls": [
      "http://www.my-url.com"
    ],
    "receipt": {},
    "name": "#1001.1",
    "admin_graphql_api_id": "gid://shopify/Fulfillment/1069019862"
  }
}
```
