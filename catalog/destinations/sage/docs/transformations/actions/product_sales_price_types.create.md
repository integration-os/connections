### Create Product Sales Price Types

Create a new product sales price type.

[Documentation](https://developer.sage.com/accounting/reference/products-services/#tag/Product-Sales-Price-Types/operation/postProductSalesPriceTypes)

**Types**

```ts
interface ActionPayload {
  id?: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Payload**

```json
{
  "body": {
    "product_sales_price_type": {
      "name": "string",
      "active": true
    }
  }
}
```

**Sample Response**

```json
{
  "id": "string",
  "displayed_as": "string",
  "$path": "string",
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z",
  "name": "string",
  "active": true
}
```
