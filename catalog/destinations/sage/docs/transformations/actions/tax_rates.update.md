### Update Tax Rate 

Update a tax rate (US only)

[Documentation](https://developer.sage.com/accounting/reference/taxes/#tag/Tax-Rates/operation/putTaxRatesKey)

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
  "id": "string",
  "body": {
    "tax_rate": {
      "name": "string",
      "from_date": "2019-08-24T14:15:22Z",
      "agency": "string",
      "percentage": 0,
      "is_visible": true
    }
  }
}
```
