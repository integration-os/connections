### Create Tax Rate

Create a tax rate (US Only)

[Documentation](https://developer.sage.com/accounting/reference/taxes/#tag/Tax-Rates/operation/postTaxRates)

**Types**
```ts
interface ActionPayload {
  id: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Payload**
```json
{
  "body": {
    "tax_rate": {
      "name": "string",
      "agency": "string",
      "is_visible": true,
      "component_tax_rate": [
        {
          "name": "string",
          "agency": "string",
          "percentage": 0
        }
      ]
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
  "agency": "string",
  "percentage": 0,
  "percentages": [
    {
      "percentage": 0,
      "from_date": "2019-08-24",
      "to_date": "2019-08-24"
    }
  ],
  "is_visible": true,
  "retailer": true,
  "editable": true,
  "deletable": true,
  "is_combined_rate": true,
  "component_tax_rates": [
    {
      "id": "string",
      "displayed_as": "string",
      "$path": "string",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z",
      "name": "string",
      "agency": "string",
      "percentage": 0,
      "percentages": [
        {
          "percentage": 0,
          "from_date": "2019-08-24",
          "to_date": "2019-08-24"
        }
      ],
      "is_visible": true,
      "retailer": true,
      "editable": true,
      "deletable": true,
      "is_combined_rate": true
    }
  ]
}
```
