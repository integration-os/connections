# Cancels a fulfillment

Cancels a fulfillment.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/fulfillmentorder)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789
}
```

**Note:** `primaryResourceId` represents the fulfillment ID

**Sample Response**

```json
{
  "fulfillment": {
    "id": 1069019866,
    "order_id": 450789469,
    "status": "success",
    "created_at": "2023-02-02T09:11:28-05:00",
    "service": "manual",
    "updated_at": "2023-02-02T09:11:28-05:00",
    "tracking_company": "my-shipping-company",
    "shipment_status": null,
    "location_id": 24826418,
    "line_items": [
      {
        "id": 1071823177,
        "variant_id": 389013007,
        "title": "Crafty Shoes - Red",
        "quantity": 1,
        "sku": "crappy_shoes_red",
        "variant_title": "Small",
        "vendor": null,
        "fulfillment_service": "manual",
        "product_id": 910489600,
        "requires_shipping": true,
        "taxable": true,
        "gift_card": false,
        "name": "Crafty Shoes - Red - Small",
        "variant_inventory_management": null,
        "properties": [],
        "product_exists": true,
        "fulfillable_quantity": 0,
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
        "admin_graphql_api_id": "gid://shopify/LineItem/1071823177",
        "tax_lines": []
      }
    ],
    "tracking_number": "1562678",
    "tracking_numbers": [
      "1562678"
    ],
    "tracking_url": "https://www.my-shipping-company.com",
    "tracking_urls": [
      "https://www.my-shipping-company.com"
    ],
    "receipt": {},
    "name": "#1001.2",
    "admin_graphql_api_id": "gid://shopify/Fulfillment/1069019866"
  }
}
```
